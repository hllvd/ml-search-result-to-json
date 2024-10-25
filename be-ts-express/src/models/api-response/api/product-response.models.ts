import { MlProductExtraFields } from "../../dto/ml-product-extra-fields.models"
import { MLProduct } from "../../dto/ml-product.models"
import { CategoriesApiResponse } from "./categories-response.model"

export type ProductApiResponse = MLProduct &
  MLProduct &
  MlProductExtraFields & { productId; category?: CategoriesApiResponse }
