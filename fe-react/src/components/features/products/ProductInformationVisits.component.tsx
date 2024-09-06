import { LoadingOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import React from "react"
import useFetchCatalogVisitsInformation from "../../../hooks/useFetchCatalogVisitsInformation"
import useFetchProductVisitsInformation from "../../../hooks/useFetchProductVisitsInformation"
import { convertToInt } from "../../../utils/Number.util"

type Props = { productId: string }

export default function ProductInformationVisits({ productId }: Props) {
  const {
    isLoading,
    isFetched,
    isError,
    data: productVisitData,
    error,
    refetch,
  } = useFetchProductVisitsInformation(productId)

  React.useEffect(() => {
    if (productId) {
      refetch()
    }
  }, [productId, refetch])
  return (
    <>
      {isError && <p>Error fetching data</p>}
      {isLoading && <LoadingOutlined />}
      {isFetched && (
        <div>
          <Meta title="Total" description={productVisitData?.totalVisits} />
          <Meta
            title="Diário"
            description={convertToInt(productVisitData?.dailyAvg)}
            className={
              convertToInt(productVisitData?.dailyAvg) > 100
                ? "highlighted"
                : ""
            }
          />
        </div>
      )}
    </>
  )
}
