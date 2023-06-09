import { Request, Response } from 'express'
import ThemeService from "../../../services/theme";
import {EntityManager} from "typeorm";

export default async (req: Request, res: Response) => {
  const { id } = req.params

  const themeService: ThemeService = req.scope.resolve(
      "themeService"
  )
  const manager: EntityManager = req.scope.resolve("manager")
  const theme = await manager.transaction(async (transactionManager) => {
    return await themeService
        .withTransaction(transactionManager)
        .retrieve(id)
  })

  res.status(200).json({ theme })
}