import dataSource from "../../../db/data-source"
import { ProductViewsSummary } from "../../../entities/sql/views-summary.entity"

const upsert = async (viewsInfo: ProductViewsSummary) => {
  const viewsRepository = dataSource.getRepository(ProductViewsSummary)
  let views = await viewsRepository.findOne({
    where: { id: viewsInfo.id },
  })
  if (!views) views = new ProductViewsSummary()
  views = viewsRepository.merge(views, {
    ...viewsInfo,
  })
  return await dataSource.manager.upsert(ProductViewsSummary, [views], ["id"])
}
export default { upsert }
