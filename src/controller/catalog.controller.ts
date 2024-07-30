import { Request, Response } from "express"

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
  console.log("here")
  const r = "ok"
  res.status(200).json({ r })
}

export default { catalog }
