import { NextFunction, Request, Response } from "express"
import { ScrapeType } from "../enums/scrap-type.enum"
import {
  PersistencyInfo,
  RequestExtended,
} from "../models/extends/params/request-custom.model"
import { getCatalogVisitsSummary } from "../services/ml/catalog-visits.service"
import { catalogSummary } from "../services/ml/catalog.service"
import { webScrapeCatalogToProductIdAndPricePredicate } from "../services/ml/scraper/predicate/catalog/catalog-productIds-price.predicate.service"
import { webScrapeMlPage } from "../services/ml/scraper/web.scraper.service"

/** Catalog info
 * - Densidade de Líder
 * - Densidade Mercado Gold
 * - Densidade Mercado Platinum
 * - Densidade Full
 * - Densidade coleta
 * - Dispersão preços
 * - Maior preço
 * - Menor preço
 * - Preço Média
 * - Quanto faturou
 * - catalog_old_post Anuncio mais antigo
 * - Categorias relacionadas (vasculhar em todos os anuncios )
 * - catalog_title
 * - catalog_brand
 * - product_id
 * -
 * - summary_created
 * - summary_userId
 * - summary_ttl
 */

const catalog = async (
  req: RequestExtended & { catalogResponse: any },
  res: Response,
  next: NextFunction
) => {
  const catalogId = req.query?.catalogId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const catalogSummaryResponse = await catalogSummary({
    catalogId,
    userId,
  })

  const response = {
    ...catalogSummaryResponse,
  }
  res.status(200).json(response)
  if (!req.persistency) {
    req.persistency = {} as PersistencyInfo
    req.persistency.catalogInfo = response
    next()
  }
}

const views = async (
  req: RequestExtended,
  res: Response,
  next: NextFunction
) => {
  const catalogId = req.query?.catalogId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"
  const productList: Array<{ productIdStr: string }> = await webScrapeMlPage(
    webScrapeCatalogToProductIdAndPricePredicate,
    {
      catalogId,
      scrapeType: ScrapeType.CatalogProductList,
      maxPage: 1,
    }
  )

  console.log("productList.length", productList.length)
  const catalogVisitsSummary = await getCatalogVisitsSummary({
    userId,
    productIds: productList,
  })

  res.status(200).json({
    ...catalogVisitsSummary,
    catalogId,
  })

  if (!req.persistency) {
    req.persistency = {} as PersistencyInfo
    req.persistency.catalogViewsInfo = { ...catalogVisitsSummary, catalogId }
    next()
  }
}

export default { catalog, views }
