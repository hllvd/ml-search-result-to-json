import { ProductResponse } from "../../../models/dto/ProductApiResponse.model"
import { dateIsoFormatter } from "../../../utils/LocaleFormatter.util"
import MetaDescription from "../../common/MetaDescription.component"
import MetaDescriptionBool from "../../common/MetaDescriptionBool.component"
import Skeleton from "antd/es/skeleton"

type Props = { productData?: ProductResponse }
const ProductInformationGeneral = ({ productData }: Props) => {
  if (productData == null) return <Skeleton />
  return (
    <>
      <MetaDescription
        title="Qualidade anúncio"
        description={productData?.health}
      />
      <MetaDescription title="Ean" description={productData?.ean?.split(",")} />
      <MetaDescription
        title="Data de criação"
        description={dateIsoFormatter(productData?.date_created ?? "")}
      />
      <MetaDescriptionBool title="Catálogo" description={false} />
      <MetaDescriptionBool
        title="Loja oficial"
        description={!!productData?.official_store_id}
      />
      <MetaDescriptionBool
        title="Mais de 10 imagens"
        description={productData?.pictures && productData?.pictures?.length > 9}
      />
      <MetaDescriptionBool
        title="Imagem HQ"
        description={
          productData?.tags &&
          productData?.tags.includes("good_quality_thumbnail")
        }
      />
      <MetaDescriptionBool
        title="Envío Full"
        description={productData?.shipping?.logistic_type == "fulfillment"}
      />
      <MetaDescriptionBool
        title="Vídeo"
        description={!!productData?.video_id}
      />
      <MetaDescriptionBool
        title="Compra internacional"
        description={productData?.international_delivery_mode != "none"}
      />
    </>
  )
}

export default ProductInformationGeneral
