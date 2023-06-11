import {Column, Entity, Index, JoinColumn, ManyToOne} from "typeorm"
import {
    // alias the core entity to not cause a naming conflict
    Order as MedusaOrder,
} from "@medusajs/medusa"
import {Subscription} from "./subscription";

@Entity()
export class Order extends MedusaOrder {
    @Index()
    @Column({ type: "text", nullable: true })
    subscription_id: string | null

    @ManyToOne(() => Subscription)
    @JoinColumn({ name: "subscription_id" })
    subscription: Subscription
}
