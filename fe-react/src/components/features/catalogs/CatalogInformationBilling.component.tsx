import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"
import { currencyFormatter } from "../../../utils/LocaleFormatter.util"

type Props = { catalogData?: CatalogInformationResponse }

export default function CatalogInformationBilling({ catalogData }: Props) {
  return (
    <>
      <Meta
        title="Faturamento total"
        description={
          catalogData?.revenue && currencyFormatter(catalogData?.revenue, true)
        }
      />
      <Meta
        title="Média faturamento diario"
        description={
          catalogData?.dailyRevenue &&
          currencyFormatter(catalogData?.dailyRevenue, true)
        }
      />
    </>
  )
}
