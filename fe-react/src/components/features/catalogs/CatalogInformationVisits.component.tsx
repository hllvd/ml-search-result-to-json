import { LoadingOutlined } from "@ant-design/icons"
import Meta from "antd/es/card/Meta"
import React from "react"
import useFetchCatalogVisitsInformation from "../../../hooks/useFetchCatalogVisitsInformation"
import { convertToInt } from "../../../utils/Number.util"
import MetaDescription from "../../common/MetaDescription.component"

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
          <MetaDescription
            title="Coeficiente de variação"
            description={
              catalogVisitData?.cv && catalogVisitData?.cv?.toFixed(0)
            }
          />
          <p>
            Quanto maior o coeficiente, maior a dispersão. O que significa que
            as vendas não estão bem distribuidas entre os vendedores. Uma boa
            dispersão está próxima ao <i>100</i>
          </p>
        </div>
      )}
    </>
  )
}
