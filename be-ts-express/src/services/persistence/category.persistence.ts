import dataSource from "../../db/data-source"
import { Categories } from "../../entities/sql/categories.entity"

const getCategoryFromDb = async (categoryId: string): Promise<Categories> => {
  const existingCategory = await dataSource.manager
    .getRepository(Categories)
    .findOne({ where: { id: categoryId } })
  return existingCategory
}

export { getCategoryFromDb }
