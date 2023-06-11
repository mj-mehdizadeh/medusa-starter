import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import {Subscription} from "../models/subscription";

export const SubscriptionRepository = dataSource
    .getRepository(Subscription)

export default SubscriptionRepository
