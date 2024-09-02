import Meta from "antd/es/card/Meta"
import { CatalogVisitsResponse } from "../../../models/dto/CatalogApiVisitResponse.model"

type Props = { catalogVisitData?: CatalogVisitsResponse }

export default function CatalogInformationVisits({ catalogVisitData }: Props) {
  return (
    <>
      <Meta
        title="Visitas últimos 30 dias"
        description={catalogVisitData?.totalVisits}
      />
      <Meta
        title="Média diária últimos 30 dias"
        description={catalogVisitData?.dailyAvg}
      />
    </>
  )
}
