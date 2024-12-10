import dataSource from "../../../db/data-source"
import { ProductsCatalogs } from "../../../entities/sql/products-catalogs.entity"
import { ProductViewsSummary } from "../../../entities/sql/views-summary.entity"

const upsert = async (viewsInfo: ProductViewsSummary) => {
  const { id } = viewsInfo
  const viewsRepository = dataSource.getRepository(ProductViewsSummary)
  let views = await viewsRepository.findOne({
    where: { id: viewsInfo.id },
  })
  if (!views) views = new ProductViewsSummary()
  views = viewsRepository.merge(views, {
    ...viewsInfo,
  })
  let result
  try {
    result = await dataSource.manager.upsert(
      ProductViewsSummary,
      [views],
      ["id"]
    )
    console.log("views result", result)
    await dataSource
      .createQueryBuilder()
      .update(ProductsCatalogs)
      .set({ views: views })
      .where("id = :id", { id: id })
      .execute()
  } catch {
    console.log("Product does not exist yet")
  } finally {
    return result
  }
}

const link = async (productId: string) => {
  const viewsRepository = dataSource.getRepository(ProductViewsSummary)
  try {
    let views = await viewsRepository.findOne({
      where: { id: productId },
    })
    await dataSource
      .createQueryBuilder()
      .update(ProductsCatalogs)
      .set({ views: views })
      .where("id = :id", { id: productId })
      .execute()
  } catch {}
}
export default { upsert, link }
