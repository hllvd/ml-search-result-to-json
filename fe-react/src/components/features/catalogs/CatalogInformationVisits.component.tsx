import Meta from "antd/es/card/Meta"
import React from "react"
import useFetchCatalogVisitsInformation from "../../../hooks/useFetchCatalogVisitsInformation"
import { CatalogVisitsResponse } from "../../../models/dto/CatalogApiVisitResponse.model"

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
    refetch()
  }, [catalogId])
  return (
    <>
      <Meta title="Total" description={catalogVisitData?.totalVisits} />
      <Meta title="Diário" description={catalogVisitData?.dailyAvg} />
    </>
  )
}
