import {BeforeInsert, Column, Entity, Generated, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm"
import {BaseEntity, Customer, generateEntityId, ProductVariant} from "@medusajs/medusa"
import {SubscriptionStatus} from "../types/subscription";
import {Order} from "./order";
import {Vendor} from "./vendor";

@Entity()
export class Subscription extends BaseEntity {

    @Index()
    @Column()
    vendor_id: string

    @ManyToOne(() => Vendor)
    @JoinColumn({ name: "vendor_id" })
    vendor: Vendor

    @Column({ type: "text" })
    variant_id: string

    @ManyToOne(() => ProductVariant)
    @JoinColumn({ name: "variant_id" })
    variant: ProductVariant

    @OneToMany(() => Order, (order) => order.subscription, {
        cascade: ["insert", "remove"],
    })
    orders: Order[]

    @Column('enum', {enum: SubscriptionStatus})
    status: SubscriptionStatus

    @Column('boolean')
    trialing: boolean

    @Column()
    next_billing_date: Date

    @BeforeInsert()
    private beforeInsert(): void {
        this.id = generateEntityId(this.id, "sub")
    }
}
