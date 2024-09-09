import React from "react"
import { Rate } from "antd"
import { ProductResponse } from "../../../models/dto/ProductApiResponse.model"
import MetaDescription from "../../common/MetaDescription.component"

type Props = { productData?: ProductResponse }
const ProductInformationSeller = ({ productData }: Props) => {
  return (
    <>
      {productData?.mlSeller.seller_reputation?.level_id && (
        <Rate
          disabled
          defaultValue={Number.parseInt(
            productData?.mlSeller.seller_reputation?.level_id
          )}
        />
      )}
      <MetaDescription
        title="Vendedor"
        description={productData?.mlSeller?.nickname}
        link={productData?.mlSeller?.permalink}
      />
      <MetaDescription
        title="Estado vendedor"
        description={productData?.seller_address?.state?.id}
      />
      <MetaDescription
        title="Medalha"
        description={
          productData?.mlSeller.seller_reputation?.power_seller_status
        }
      />
      <MetaDescription
        title="Transações"
        description={productData?.mlSeller.seller_reputation?.transactions?.total?.toString()}
      />
    </>
  )
}
export default ProductInformationSeller
