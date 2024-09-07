import React from "react"
import { Col, Rate, Row } from "antd"
import { ProductResponse } from "../../../models/dto/ProductApiResponse.model"
import {
  currencyFormatter,
  dateIsoFormatter,
} from "../../../utils/LocaleFormater.util"
import MetaDescription from "../../common/MetaDescription.component"
import MetaDescriptionBool from "../../common/MetaDescriptionBool.component"
import TaxCalculator from "../tax-calculator/TaxCalculator.component"
import ProductInformationVisits from "./ProductInformationVisits.component"

type Props = { productData?: ProductResponse; productId: string }
export default function ProductInformationContent({
  productData,
  productId,
}: Props) {
  console.log(productData, productId)
  return (
    <>
      <Row gutter={16} className="row-with-margin m-zoom">
        <Col span={8}>
          <a href={productData?.permalink} target="_blank" className="">
            <img src={productData?.thumbnail} alt={productData?.title} />
          </a>
        </Col>
        <Col span={12}>
          <h2>{productData?.title}</h2>
        </Col>
      </Row>

      <Row gutter={16} className="row-with-margin m-zoom">
        <Col span={6}>
          <h2> Anúncio</h2>
          <MetaDescription
            title="Qualidade anúncio"
            description={productData?.health}
          />
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
            description={
              productData?.pictures && productData?.pictures?.length > 9
            }
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
        </Col>

        <Col span={6}>
          <h2> Preço</h2>
          <MetaDescription
            title="Price"
            description={
              productData?.price && currencyFormatter(productData?.price, true)
            }
          />
          <section className="tax-box-simulator">
            {productData?.price != null && (
              <TaxCalculator price={productData?.price} />
            )}
          </section>
        </Col>
        <Col span={6}>
          <h2>Visitas últimos 30 dias</h2>
          {productId && <ProductInformationVisits productId={productId} />}
        </Col>
        <Col span={6}>
          <h2>Vendedor</h2>
          {productData?.mlSeller.seller_reputation?.level_id && (
            <Rate
              disabled
              defaultValue={Number.parseInt(
                productData?.mlSeller.seller_reputation?.level_id
              )}
            />
          )}
          <MetaDescription
            title="Vendedor"
            description={productData?.mlSeller?.nickname}
            link={productData?.mlSeller?.permalink}
          />
          <MetaDescription
            title="Estado vendedor"
            description={productData?.seller_address?.state?.id}
          />
          <MetaDescription
            title="Medalha"
            description={
              productData?.mlSeller.seller_reputation?.power_seller_status
            }
          />
          <MetaDescription
            title="Transações"
            description={productData?.mlSeller.seller_reputation?.transactions?.total?.toString()}
          />
        </Col>
      </Row>
    </>
  )
}
