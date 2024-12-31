import dataSource from "../db/data-source"
import { Seller } from "../entities/sql/seller.entity"

const upsert = async (seller: Seller): Promise<Seller> => {
  return await dataSource.manager.getRepository(Seller).save(seller)
}

export default { upsert }
