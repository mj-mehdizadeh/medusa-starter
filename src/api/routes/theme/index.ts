import { Router } from "express"

import
  middlewares
  from "@medusajs/medusa/dist/api/middlewares"

import createThemeHandler from "./create-theme-handler";
import updateThemeHandler from "./update-theme-handler";
import getThemeHandler from "./get-theme-handler";
import ActiveThemeHandler from "./active-theme-handler";
import getActiveThemeHandler from "./get-active-theme-handler";

const route = Router()

export function getThemeRouter(app: Router): Router {

  app.use("/admin/theme", route)

  route.get("/", middlewares.wrap(getActiveThemeHandler))
  route.post("/", middlewares.wrap(createThemeHandler))
  route.get("/:id", middlewares.wrap(getThemeHandler))
  route.post("/:id", middlewares.wrap(updateThemeHandler))
  route.post("/:id/active", middlewares.wrap(ActiveThemeHandler))

  return app
}
