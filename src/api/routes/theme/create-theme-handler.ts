import { IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator"
import { Request, Response } from 'express'
import ThemeService from "../../../services/theme";
import {EntityManager} from "typeorm";
import {Schemas} from "../../../types/schemas.dto";
import {Templates} from "../../../types/template.dto";

export default async (req: Request, res: Response) => {
  const { body } = req
  console.log("req", req.body)

  const themeService: ThemeService = req.scope.resolve(
      "themeService"
  )
  const manager: EntityManager = req.scope.resolve("manager")
  const theme = await manager.transaction(async (transactionManager) => {
    return await themeService
        .withTransaction(transactionManager)
        .create(body)
  })

  res.status(201).json({ theme })
}

export class AdminCreateThemeReq {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  scheme: Schemas

  @IsString()
  @IsOptional()
  templates: Templates
}
