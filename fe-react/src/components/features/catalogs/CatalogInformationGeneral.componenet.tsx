import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"
import { daysFromNow } from "../../../utils/DateFormatter.util"
type Props = { catalogData?: CatalogInformationResponse; productId: string }
export default function CatalogInformationGeneral({
  catalogData,
  productId,
}: Props) {
  return (
    <>
      <Meta title="EAN" description={catalogData?.ean} />
      <Meta
        title="Criação do catálogo"
        description={
          catalogData?.dateCreated && daysFromNow(catalogData?.dateCreated)
        }
      />
      <Meta title="Quantidade de anúncios" description={catalogData?.length} />
      <Meta
        title="Mercado Livre no catálogo"
        description={catalogData?.mlOwner ? "Sim" : "Não"}
        className={
          catalogData?.mlOwner
            ? "red-highlighted-description"
            : "highlighted-description"
        }
      />
      <Meta title="Id do produto" description={productId ?? ""}></Meta>
    </>
  )
}
