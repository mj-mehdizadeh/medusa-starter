import {Column, Entity, Index, JoinColumn, ManyToOne} from "typeorm"
import {
    // alias the core entity to not cause a naming conflict
    Order as MedusaOrder,
} from "@medusajs/medusa"
import {Subscription} from "./subscription";

@Entity()
export class Order extends MedusaOrder {
    @Index()
    @Column({ type: "text" })
    subscription_id: string

    @ManyToOne(() => Subscription)
    @JoinColumn({ name: "subscription_id" })
    subscription: Subscription
}