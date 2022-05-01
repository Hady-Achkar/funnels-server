import { Funnels, Pages, Users } from "../../models"
import { Request, Response } from "express"
import { AddFunnel, AuthUserBody, Store } from "../../types"
import fs from "fs"
import InitialPage from "../../data/initialPage.json"
import path from "path"

// const headData = `<head>
//   <meta charset="UTF-8" />
//   <meta http-equiv="X-UA-Compatible" content="IE=edge" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//   <script src="https://cdn.tailwindcss.com"></script>
//   <title><%= title %></title>
// </head>`

export default async (req: Request, res: Response) => {
  try {
    const { userId: UserId } = req.query
    console.log(UserId)

    const { category, title } = req.body
    if (!category || category === "") {
      return res.status(400).json({
        status: "Failure",
        errors: [
          {
            name: "missing category",
            field: "category",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }

    if (!title || title === "") {
      return res.status(400).json({
        status: "Failure",
        errors: [
          {
            name: "missing title",
            field: "title",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }

    const _page = await Pages.create({
      title: "index",
      data: JSON.stringify(InitialPage),
    })
    const _user = await Users.findById(UserId)
    if (!_user) {
      return res.status(404).json({
        status: "Failure",
        message: "User was not found",
        requestTime: new Date().toISOString(),
      })
    }
    const _verify = await Funnels.findOne({
      title,
    })
    if (_verify) {
      return res.status(400).json({
        status: "Failure",
        message: "Bad request, funnel title already in use",
        requestTime: new Date().toISOString(),
      })
    }
    const funnel = await Funnels.create({
      category,
      title,
      owner: UserId,
      pages: [_page?._id],
      contactEmail: _user.email,
    })

    if (!funnel) {
      throw new Error("Internal Server Error")
    }

    const newFunnel = await Funnels.findById(funnel?._id).populate(
      "pages",
      "-__v"
    )

    if (!newFunnel) {
      throw new Error("Internal Server Error")
    }

    fs.mkdir(path.join(__dirname, `../../views/pages/${funnel._id}`), (err) => {
      if (err) {
        return console.error(err)
      }

      fs.mkdir(
        path.join(__dirname, `../../views/pages/${funnel._id}/partials`),
        (error) => {
          if (error) {
            return console.error(error)
          }
          console.log("Directory created successfully!")
        }
      )
    })

    fs.readFile(
      path.join(__dirname, `../../data/partials/head.html`),
      (err, data) => {
        if (err) {
          console.log(err)
        }
        fs.writeFile(
          path.join(
            __dirname,
            `../../views/pages/${funnel?._id}/partials/head.ejs`
          ),
          data,
          (error) => {
            console.error(error)
            console.log("successfully copied")
          }
        )
      }
    )

    return res.status(200).json({
      status: "Success",
      message: "Funnel was created successfully",
      funnel: {
        ...newFunnel,
        pages: [
          {
            ..._page.toObject(),
          },
        ],
      },
    })
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        requestTime: new Date().toISOString(),
      })
    }
  }
}
