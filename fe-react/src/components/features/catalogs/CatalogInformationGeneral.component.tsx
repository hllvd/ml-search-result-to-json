import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"
import { daysFromNow } from "../../../utils/DateFormatter.util"
import MetaDescription from "../../common/MetaDescription.component"
import MetaDescriptionBool from "../../common/MetaDescriptionBool.component"
type Props = { catalogData?: CatalogInformationResponse; productId: string }
export default function CatalogInformationGeneral({
  catalogData,
  productId,
}: Props) {
  return (
    <>
      <MetaDescription title="EAN" description={catalogData?.ean?.split(",")} />
      <Meta
        title="Criação do catálogo"
        description={
          catalogData?.dateCreated && daysFromNow(catalogData?.dateCreated)
        }
      />
      <Meta title="Quantidade de anúncios" description={catalogData?.length} />
      <MetaDescriptionBool
        title="Mercado Livre no catálogo"
        description={!!catalogData?.mlOwner}
      />
      <Meta title="Id do produto" description={productId ?? ""}></Meta>
    </>
  )
}
