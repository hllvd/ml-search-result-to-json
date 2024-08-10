import { Request, Response } from "express"
import { catalogSummary } from "../services/ml/catalog.service"

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

const catalog = async (req: Request, res: Response) => {
  const productId = req.query?.productId?.toString()
  const catalogId = req.query?.catalogId?.toString()
  const userId = req.query?.userId?.toString() ?? "1231084821"

  const { catalogReducerValues } = await catalogSummary({
    catalogId,
    userId,
  })

  res.status(200).json({
    productId,
    catalogId,
    ...catalogReducerValues,
  })
}

export default { catalog }
