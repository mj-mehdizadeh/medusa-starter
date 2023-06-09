import { TransactionBaseService } from "@medusajs/utils";
import {Logger} from "@medusajs/medusa";
import ThemeRepository from "../repositories/theme";
import {Theme} from "../models/theme";
import {AdminCreateThemeReq} from "../api/routes/theme/create-theme-handler";

type InjectedDependencies = {
    logger: Logger
    themeRepository: typeof ThemeRepository
}

export default class ThemeService extends TransactionBaseService {
    protected readonly logger_: Logger
    protected readonly themeRepository_: typeof ThemeRepository

    constructor(container: InjectedDependencies) {
        super(container)

        const {themeRepository, logger} =
            container
        this.themeRepository_ = themeRepository
        this.logger_ = logger
    }


    /**
     * Creates a product collection
     * @return created collection
     */
    async create(
        theme: AdminCreateThemeReq
    ): Promise<Theme> {
        return await this.atomicPhase_(async (manager) => {
            const cgRepo: typeof ThemeRepository = manager.withRepository(
                this.themeRepository_
            )
            const created = cgRepo.create(theme)
            return await cgRepo.save(created)
        })
    }

}
