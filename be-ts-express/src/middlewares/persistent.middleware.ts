import {
  convertMLUserFromApiResponseToSellerEntity,
  convertProductApiResponseToProductCatalogEntity,
} from "../convertors/ml.convert"
import dataSource from "../db/data-source"
import { BrandModel } from "../entities/sql/brand-model.entity"
import { ProductsCatalogs } from "../entities/sql/products-catalogs.entity"
import { Seller } from "../entities/sql/seller.entity"
import { MLProduct } from "../models/dto/ml-product.models"
import { RequestExtended } from "../models/extends/params/request-custom.model"

const persistentMiddleware = async (req: RequestExtended) => {
  const { productInfo } = req.persistency
  const { user } = productInfo
  try {
    let seller = new Seller()
    const existingUser = await dataSource.manager
      .getRepository(Seller)
      .findOne({ where: { id: user.id } })

    if (!existingUser) {
      seller = convertMLUserFromApiResponseToSellerEntity(user)
      await dataSource.manager.getRepository(Seller).save(seller)
    }

    let product = new ProductsCatalogs()
    product = convertProductApiResponseToProductCatalogEntity(productInfo)
    product.seller = existingUser || seller

    const { brand, model, color } = _getBrandModel(productInfo)
    const existingBrandModel = await dataSource.manager
      .getRepository(BrandModel)
      .findOne({ where: { brand, model, color } })

    const brandModel = new BrandModel()
    if (!existingBrandModel) {
      console.log("new brand model created")
      brandModel.brand = brand
      brandModel.model = model
      brandModel.color = color
      await dataSource.manager.getRepository(BrandModel).save(brandModel)
    }
    product.brandModel = existingBrandModel || brandModel

    await dataSource.manager.save(product)
    console.log("saved to db")
  } catch (e) {
    console.log(e)
  }
}

const _getBrandModel = (
  product: MLProduct
): {
  model: string
  brand: string
  color: string
  detailed_model: string
} | null => {
  console.log("product", product)
  if (!product?.attributes) return null
  const attributeList = ["COLOR", "MODEL", "BRAND", "DETAILED_MODEL"]
  const selectedAttributes = product.attributes.filter((e) =>
    attributeList?.includes(e.id)
  )
  return selectedAttributes?.length > 0
    ? selectedAttributes.reduce((acc, e) => {
        acc[e.id.toLowerCase()] = e.value_name
        return acc
      }, {})
    : null
}

export { persistentMiddleware }
