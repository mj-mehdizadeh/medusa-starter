import { Subscription } from "./models/subscription";

export declare module "@medusajs/medusa/dist/models/order" {
    declare interface Order {
        subscription_id: string;
        subscriptions: Subscription;
    }
}