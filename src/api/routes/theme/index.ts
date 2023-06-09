import { Router } from "express"

import
  middlewares
  from "@medusajs/medusa/dist/api/middlewares"

import createThemeHandler from "./create-theme-handler";

const route = Router()

export function getThemeRouter(app: Router): Router {

  app.use("/admin/theme", route)

  route.get("/", middlewares.wrap( async (req, res) => {
    res.status(200).json({response: "okay"})
  }))
  route.post("/", middlewares.wrap( createThemeHandler))

  return app
}
