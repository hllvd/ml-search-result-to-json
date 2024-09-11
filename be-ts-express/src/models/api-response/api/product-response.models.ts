import { MlProductExtraFields } from "../../dto/ml-product-extra-fields.models"
import { MLProduct } from "../../dto/ml-product.models"

export type ProductVisitsApiResponse = MLProduct &
  MLProduct &
  MlProductExtraFields & { productId }
