import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"
import { currencyFormatter } from "../../../utils/LocaleFormater.util"

type Props = { catalogData?: CatalogInformationResponse }

export default function CatalogInformationPosition({ catalogData }: Props) {
  return (
    <>
      <Meta
        title="Full"
        description={`${
          catalogData?.position.full && catalogData?.position.full
        }ª  posição`}
      />
      <Meta
        title="Gold"
        description={
          catalogData?.position?.medalGold &&
          `${catalogData?.position.medalGold}ª  posição`
        }
      />
      <Meta
        title="Platinum"
        description={
          catalogData?.position?.medalPlatinum &&
          `${catalogData?.position?.medalPlatinum}ª  posição`
        }
      />
      <Meta
        title="Lider"
        description={
          catalogData?.position?.medalLider &&
          `${catalogData?.position.medalLider}ª  posição`
        }
      />
      <Meta
        title="Loja oficial"
        description={
          catalogData?.position?.officialStore &&
          `${catalogData?.position.officialStore}ª  posição`
        }
      />
    </>
  )
}
