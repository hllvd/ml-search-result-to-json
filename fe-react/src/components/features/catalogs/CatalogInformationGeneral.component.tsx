import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"
import { daysFromNow } from "../../../utils/DateFormatter.util"
import MetaDescriptionBool from "../../common/MetaDescriptionBool.component"
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
      <Meta title="Id do produto" description={productId ?? ""}></Meta>
      <MetaDescriptionBool
        title={`Mercado Livre${
          !!catalogData?.mlOwner ? "" : " não "
        }está no catálogo`}
        description={!!catalogData?.mlOwner}
      />
      <MetaDescriptionBool
        title={`Este produto${
          !!catalogData?.supermarketEligible ? "" : " não "
        }está no supermercado`}
        description={!!catalogData?.supermarketEligible}
      />
    </>
  )
}
