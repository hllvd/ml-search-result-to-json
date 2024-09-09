import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"
import { currencyFormatter } from "../../../utils/LocaleFormatter.util"

type Props = { catalogData?: CatalogInformationResponse }

export default function CatalogInformationPricing({ catalogData }: Props) {
  return (
    <>
      <Meta
        title="Melhor preço"
        description={
          catalogData?.price.best &&
          currencyFormatter(catalogData?.price.best, true)
        }
        className="highlighted-description"
      />
      <Meta
        title="Top5 preço médio"
        description={
          catalogData?.price.top5Avg &&
          currencyFormatter(catalogData?.price.top5Avg, true)
        }
      />
      <Meta
        title="Segundo melhor preço"
        description={
          catalogData?.price.secondBest &&
          currencyFormatter(catalogData?.price.secondBest, true)
        }
      />
      <Meta
        title="Melhor preço full"
        description={
          catalogData?.price.full &&
          currencyFormatter(catalogData?.price.full, true)
        }
      />
    </>
  )
}
