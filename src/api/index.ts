import { Router } from "express"
import configLoader from "@medusajs/medusa/dist/loaders/config"
import
  authenticate
  from "@medusajs/medusa/dist/api/middlewares/authenticate"

import * as cors from "cors"
import * as bodyParser from "body-parser"
import {getThemeRouter} from "./routes/theme";

export default (rootDirectory: string): Router | Router[] => {

  const router = Router()
  const config = configLoader(rootDirectory)

  const adminCors = {
    origin: config.projectConfig.admin_cors.split(","),
    credentials: true,
  }

  router.use(
      "/admin/theme",
      cors(adminCors),
      authenticate(),
      bodyParser.json()
  )

  getThemeRouter(router)

  return [router]
}
