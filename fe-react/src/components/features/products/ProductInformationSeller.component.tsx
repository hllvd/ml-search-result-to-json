import React from "react"
import { Rate } from "antd"
import { ProductResponse } from "../../../models/dto/ProductApiResponse.model"
import MetaDescription from "../../common/MetaDescription.component"
import Skeleton from "antd/es/skeleton"

type Props = { productData?: ProductResponse }
const ProductInformationSeller = ({ productData }: Props) => {
  if (productData == null) return <Skeleton />
  return (
    <>
      {productData?.user.seller_reputation?.level_id && (
        <Rate
          disabled
          defaultValue={Number.parseInt(
            productData?.user.seller_reputation?.level_id
          )}
        />
      )}
      <MetaDescription
        title="Vendedor"
        description={productData?.user?.nickname}
        link={productData?.user?.permalink}
      />
      <MetaDescription
        title="Estado vendedor"
        description={productData?.seller_address?.state?.id}
      />
      <MetaDescription
        title="Medalha"
        description={productData?.user.seller_reputation?.power_seller_status}
      />
      <MetaDescription
        title="Transações"
        description={productData?.user.seller_reputation?.transactions?.total?.toString()}
      />
    </>
  )
}
export default ProductInformationSeller
