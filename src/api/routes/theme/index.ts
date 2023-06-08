import { Router } from "express"
import createThemeHandler from "./create-theme-handler";

export function getThemeRouter(app: Router): Router {
  app.post(
    "/admin/theme",
      createThemeHandler
  )

  return app
}
