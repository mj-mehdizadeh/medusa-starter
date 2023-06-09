import {
    dataSource,
} from "@medusajs/medusa/dist/loaders/database"
import {
    // alias the core repository to not cause a naming conflict
    StoreRepository as MedusaStoreRepository,
} from "@medusajs/medusa/dist/repositories/store"
import {Store} from "../models/store";

export const StoreRepository = dataSource
    .getRepository(Store)
    .extend({
        ...Object.assign(
            MedusaStoreRepository,
            { target: Store }
        ),

        // you can add other customizations as well...
    })

export default StoreRepository
