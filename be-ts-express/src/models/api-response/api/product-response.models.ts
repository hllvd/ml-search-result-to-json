import { MlProductExtraFields } from "../../dto/ml-product-extra-fields.models"
import { MLProduct } from "../../dto/ml-product.models"

export type ProductApiResponse = MLProduct &
  MLProduct &
  MlProductExtraFields & { productId }
