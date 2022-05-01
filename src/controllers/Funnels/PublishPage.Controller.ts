import { Request, Response } from "express"
import { isValidObjectId } from "mongoose"
import { Pages, Funnels } from "../../models"
import { IPage } from "../../types"
import fs from "fs"
export default async (req: Request, res: Response) => {
  try {
    const { pageId, funnelId, html } = req.body
    if (!pageId) {
      return res.status(404).json({
        status: "Failure",
        errors: [
          {
            name: "pageId was not found",
            field: "pageId",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }

    if (!html) {
      return res.status(404).json({
        status: "Failure",
        errors: [
          {
            name: "html was not found",
            field: "html",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }
    if (!isValidObjectId(pageId)) {
      return res.status(400).json({
        status: "Failure",
        errors: [
          {
            name: "wrong pageId format",
            field: "pageId",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }
    if (!funnelId) {
      return res.status(404).json({
        status: "Failure",
        errors: [
          {
            name: "funnelId was not found",
            field: "funnelId",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }
    if (!isValidObjectId(funnelId)) {
      return res.status(400).json({
        status: "Failure",
        errors: [
          {
            name: "wrong funnelId format",
            field: "funnelId",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }
    const _verifyPage = await Pages.findById(pageId)
    if (!_verifyPage) {
      return res.status(404).json({
        status: "Failure",
        errors: [
          {
            name: "page was not found",
            field: "page",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }
    const _verifyFunnel = await Funnels.findById(funnelId).populate(
      "pages",
      "-__v"
    )

    if (!_verifyFunnel) {
      return res.status(404).json({
        status: "Failure",
        errors: [
          {
            name: "funnel was not found",
            field: "funnel",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }
    const toBePublished = await Pages.findByIdAndUpdate(
      pageId,
      {
        $set: {
          isPublished: true,
          publishedAt: new Date(),
          html: html,
        },
      },
      { new: true }
    )

    const isFound = _verifyFunnel.publish.pages.find(
      (page: IPage) => page._id == pageId
    )
    if (!isFound) {
      const _updatedFunnel = await Funnels.findByIdAndUpdate(
        funnelId,
        {
          $push: {
            "publish.pages": toBePublished,
          },
        },
        { new: true }
      )
        .populate("pages", "-__v")
        .select("-__v -owner")
      return res.status(200).json({
        status: "Success",
        message: "Page was published successfully",
        funnel: _updatedFunnel,
        requestTime: new Date().toISOString(),
      })
    } else {
      const _filteredPublishedPages = _verifyFunnel.publish.pages.filter(
        (page: IPage) => {
          return page._id != pageId
        }
      )
      const updatedFunnel = await Funnels.findByIdAndUpdate(
        funnelId,
        {
          $set: {
            publish: {
              pages: [..._filteredPublishedPages, toBePublished],
            },
          },
        },
        { new: true }
      ).populate("pages", "-__v")

      fs.writeFile(
        `${__dirname}/../../views/pages/${updatedFunnel?._id}/${toBePublished?.title}.ejs`,
        html,
        { flag: "a" },
        (error) => {
          if (error) {
            console.log(error)
          }
        }
      )

      return res.status(200).json({
        status: "Success",
        message: "Page was published successfully",
        funnel: updatedFunnel,
        requestTime: new Date().toISOString(),
      })
    }
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
