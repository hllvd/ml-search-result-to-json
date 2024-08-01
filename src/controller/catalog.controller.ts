import { Request, Response } from "express"
import { ScrapeType } from "../enums/scrap-type.enum"
import { webScrapeCatalogPredicate } from "../services/ml/scraper/predicate/catalog.predicate.service"
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
 *
 * - summary_created
 * - summary_userId
 * - summary_ttl
 */

const catalog = async (req: Request, res: Response) => {
  const productId = req.query?.productId?.toString()
  const catalogId = req.query?.catalogId?.toString()
  const result = await webScrapeMlPage(webScrapeCatalogPredicate, {
    productId,
    catalogId,
    scrapeType: ScrapeType.Catalog,
  })
  console.log(result)
  res.status(200).json({ productId, catalogId })
}

export default { catalog }
