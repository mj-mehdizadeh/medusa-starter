import {Column, Entity, Index, JoinColumn, ManyToOne} from "typeorm"
import {
    // alias the core entity to not cause a naming conflict
    Customer as MedusaCustomer,
} from "@medusajs/medusa"
import {Vendor} from "./vendor";

@Entity()
export class Customer extends MedusaCustomer {
    @Index()
    @Column({ type: "text", nullable: true })
    vendor_id: string | null

    @ManyToOne(() => Vendor)
    @JoinColumn({ name: "vendor_id" })
    vendor: Vendor
}
