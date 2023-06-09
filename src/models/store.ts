import {BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm"
import {BaseEntity, generateEntityId} from "@medusajs/medusa"
import {Schemas} from "../types/schemas.dto";
import {Templates} from "../types/template.dto";

import {
    // alias the core entity to not cause a naming conflict
    Store as MedusaStore,
} from "@medusajs/medusa"

@Entity()
export class Store extends MedusaStore {
    @Column({ type: "varchar" })
    theme_id: string
}
