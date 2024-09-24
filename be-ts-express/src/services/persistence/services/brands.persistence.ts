import dataSource from "../../../db/data-source"
import { BrandModel } from "../../../entities/sql/brand-model.entity"
import { MLProduct } from "../../../models/dto/ml-product.models"

export const brandModelFieldHandler = async ({
  brand,
  model,
  color,
}: {
  brand?: string
  model?: string
  color?: string
}) => {
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
  return existingBrandModel || brandModel
}

export const getBrandModel = (
  product: MLProduct
): {
  model: string
  brand: string
  color: string
  detailed_model: string
} | null => {
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
