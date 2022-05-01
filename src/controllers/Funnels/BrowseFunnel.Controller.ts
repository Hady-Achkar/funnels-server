import { Request, Response } from "express"
import path from "path"
import { Funnels } from "../../models"
// import { IPage } from "../../types"
// import ejs from "ejs"

type QueyFunnelHost = {
  baseDomain? :String,
  proDomain? :String
}


export default async (req: Request, res: Response) => {
  try {
    const pageKey = req.params.page || "home"
    const host = req.headers.host
    // const host = "test1.funnelshero-website.com"
    if (!host) {
      return res.status(400).json({
        status: "Failure",
        errors: [
          {
            name: "Wrong/missing host",
            field: "host",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }

    const domainRegex = /^(?:[a-zA-Z0-9\-]*[a-zA-Z0-9]\.)*([a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9])(?:\.[a-zA-Z]{2,})+$/
    const hostRegex = domainRegex.exec(host)
    
    if(!hostRegex){
      return res.status(400).json({
        status: "Failure",
        errors: [
          {
            name: "Wrong/Invalid host",
            field: "host",
          },
        ],
        requestTime: new Date().toISOString(),
      })
    }
    const domainHost = hostRegex[1]
    const query : QueyFunnelHost={}

    if(domainHost==='funnelshero-website') {
      query.baseDomain = `${host.split(".")[0]}.funnelshero-website.com`
    } else {
      query.proDomain = host
    }

    const funnel = await Funnels.findOne(query).populate("pages")

    if (!funnel) {
      return res.status(404).json({
        status: "Failure",
        message: "Funnel was not found",
        requestTime: new Date().toISOString(),
      })
    }

    const filePath = path.join(__dirname, `../../../views/pages`)
    // page.isPublished
    // if req.params.page =="" or / ==> index homeage
    const page = funnel.pages.find(page => page.title === pageKey);

    if(!page) {
      // render 404 ejs page
      return res.render(`${filePath}/404.ejs`, { title: "OPPSS!"})
    }

    const headerMenue = funnel.menus.find(menu => menu.title === "Header") || [];
    const footerMenue = funnel.menus.find(menu => menu.title === "Footer") || [];

    return res.render(`${filePath}/index.ejs`, {
      html: page.html,
      headerMenue,
      footerMenue,
      title: page.title,
    })

  } catch (err) {
    console.log(err)

    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
        requestTime: new Date().toISOString(),
      })
    }
  }
}