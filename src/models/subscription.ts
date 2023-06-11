import {BeforeInsert, Column, Entity, Generated, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm"
import {BaseEntity, Customer, generateEntityId, ProductVariant} from "@medusajs/medusa"
import {SubscriptionStatus} from "../types/subscription";
import {Order} from "./order";

@Entity()
export class Subscription extends BaseEntity {

    @Index()
    @Column()
    customer_id: string

    @ManyToOne(() => Customer)
    @JoinColumn({ name: "customer_id" })
    customer: Customer

    @Index()
    @Column({ type: "text" })
    variant_id: string | null

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
