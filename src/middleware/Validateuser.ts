import { NextFunction, Request, Response } from "express"
import * as jwt from "jsonwebtoken"
export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // let token = req.headers["authorization"]

    // if (!token) {
    //   return res.status(401).json({
    //     status: "Failure",
    //     message: "Not authorized",
    //     requestTime: new Date().toISOString(),
    //   })
    // }

    // if (token.startsWith("Bearer")) {
    //   // Splice token and remove the word bearer and get the whole token
    //   token = token.slice(7, token.length).trimLeft()
    // }
    // // Verify that the passed token is valid with the system JWT Secret
    // if (!process.env.ACCESS_TOKEN_SECRET_V2) {
    //   throw new Error("Internal Server Error")
    // }
    // const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_V2)
    //@ts-ignore
    // req.user = decodedToken
    req.user = {
      email:'hado.ashkar@gmail.com ',
	    fullName:'Hady Achkar',
	    _id:'61bbefe705889e4601db9160',
    };

    next()
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
