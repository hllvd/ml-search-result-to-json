import { LoadingOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import React from "react"
import useFetchCatalogVisitsInformation from "../../../hooks/useFetchCatalogVisitsInformation"
import { convertToInt } from "../../../utils/Number.util"

type Props = { catalogId: string }

export default function CatalogInformationVisits({ catalogId }: Props) {
  const {
    isLoading,
    isFetched,
    isError,
    data: catalogVisitData,
    error,
    refetch,
  } = useFetchCatalogVisitsInformation(catalogId)

  React.useEffect(() => {
    if (catalogId) {
      refetch()
    }
  }, [catalogId, refetch])
  return (
    <>
      {isError && <p>Error fetching data</p>}
      {isLoading && <LoadingOutlined />}
      {isFetched && (
        <div>
          <Meta title="Total" description={catalogVisitData?.totalVisits} />
          <Meta
            title="Diário"
            description={convertToInt(catalogVisitData?.dailyAvg)}
            className={
              convertToInt(catalogVisitData?.dailyAvg) > 100
                ? "highlighted"
                : ""
            }
          />
        </div>
      )}
    </>
  )
}
