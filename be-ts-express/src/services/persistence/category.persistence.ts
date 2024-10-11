import dataSource from "../../db/data-source"
import { Categories } from "../../entities/sql/categories.entity"

const get = async (categoryId: string): Promise<Categories> => {
  const existingCategory = await dataSource.manager
    .getRepository(Categories)
    .findOne({ where: { id: categoryId } })
  return existingCategory
}

const upsert = async (category: Categories): Promise<boolean> => {
  try {
    await dataSource.manager.getRepository(Categories).save(category)
    return true
  } catch (e) {
    console.log("Category already exist")
    return false
  }
}

export default { get, upsert }
