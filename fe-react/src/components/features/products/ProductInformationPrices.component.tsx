import { ProductResponse } from "../../../models/dto/ProductApiResponse.model"
import { currencyFormatter } from "../../../utils/LocaleFormater.util"
import MetaDescription from "../../common/MetaDescription.component"

type Props = { productData?: ProductResponse }
const ProductInformationPrices = ({ productData }: Props) => {
  if (productData == null) return null
  return (
    <>
      <MetaDescription
        title="Price base"
        description={
          productData?.price && currencyFormatter(productData?.price, true)
        }
      />
      <MetaDescription
        title="Preço promocional"
        description={
          productData?.price_promotional &&
          currencyFormatter(productData?.price_promotional, true)
        }
      />
    </>
  )
}
export default ProductInformationPrices
