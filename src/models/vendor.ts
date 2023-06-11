import {BeforeInsert, Column, Entity, Generated, Index, OneToMany} from "typeorm"
import {BaseEntity, generateEntityId} from "@medusajs/medusa"
import {Subscription} from "./subscription";
import {VendorStatus} from "../types/vendor";

@Entity()
export class Vendor extends BaseEntity {
    @Index()
    @Column()
    @Generated("increment")
    display_id: number

    @Column()
    title: string

    @Column({nullable: true})
    domain: string

    @Column({unique: true})
    subdomain: string

    @OneToMany(() => Subscription, (sub) => sub.vendor, {
        cascade: ["insert", "remove"],
    })
    subscriptions: Subscription[]

    @Column('enum', {enum: VendorStatus, default: VendorStatus.ACTIVE})
    status: VendorStatus

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "ven")
    }
}
