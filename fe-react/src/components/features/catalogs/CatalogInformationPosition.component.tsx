import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"

type Props = { catalogData?: CatalogInformationResponse }

export default function CatalogInformationPosition({ catalogData }: Props) {
  return (
    <>
      {catalogData?.position.full && (
        <Meta
          title="Full"
          description={`${catalogData?.position.full}ª  posição`}
        />
      )}
      {catalogData?.position?.medalGold && (
        <Meta
          title="Gold"
          description={`${catalogData?.position.medalGold}ª  posição`}
        />
      )}
      {catalogData?.position?.medalPlatinum && (
        <Meta
          title="Platinum"
          description={`${catalogData?.position?.medalPlatinum}ª  posição`}
        />
      )}
      {catalogData?.position?.medalLider && (
        <Meta
          title="Lider"
          description={`${catalogData?.position.medalLider}ª  posição`}
        />
      )}
      {catalogData?.position?.officialStore && (
        <Meta
          title="Loja oficial"
          description={`${catalogData?.position.officialStore}ª  posição`}
        />
      )}
    </>
  )
}
