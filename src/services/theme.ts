import {TransactionBaseService} from "@medusajs/utils";
import {buildQuery, Logger} from "@medusajs/medusa";
import {isDefined, MedusaError} from "medusa-core-utils"
import ThemeRepository from "../repositories/theme";
import {Theme} from "../models/theme";
import {AdminCreateThemeReq} from "../api/routes/theme/create-theme-handler";
import {AdminUpdateThemeReq} from "../api/routes/theme/update-theme-handler";

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


    async retrieve(themeId: string, config = {}): Promise<Theme> {
        if (!isDefined(themeId)) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `"themeId" must be defined`
            )
        }

        const cgRepo = this.activeManager_.withRepository(
            this.themeRepository_
        )

        const query = buildQuery({id: themeId}, config)

        const customerGroup = await cgRepo.findOne(query)
        if (!customerGroup) {
            throw new MedusaError(
                MedusaError.Types.NOT_FOUND,
                `CustomerGroup with id ${themeId} was not found`
            )
        }

        return customerGroup
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


    /**
     * Update a theme data.
     *
     * @param themeId - id of the customer group
     * @param update - customer group partial data
     * @returns resulting customer group
     */
    async update(
        themeId: string,
        update: AdminUpdateThemeReq
    ) {
        return await this.atomicPhase_(async (manager) => {
            const {templates} = update

            const cgRepo: typeof ThemeRepository = manager.withRepository(
                this.themeRepository_
            )

            const theme = await this.retrieve(themeId)
            theme.templates = templates;

            return await cgRepo.save(theme)
        })
    }
}
