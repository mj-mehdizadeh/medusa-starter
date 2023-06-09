import {BeforeInsert, Column, Entity, PrimaryColumn} from "typeorm"
import {BaseEntity, generateEntityId} from "@medusajs/medusa"
import {Schemas} from "../types/schemas.dto";
import {Templates} from "../types/template.dto";

@Entity()
export class Theme extends BaseEntity {
    @Column({ type: "varchar" })
    title: string | null

    @Column({ type: "json" })
    scheme: Schemas

    @Column({ type: "json" })
    templates: Templates

    @Column({ type: "boolean", default: false })
    active: boolean

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "theme")
    }
}
