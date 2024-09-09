import React from "react"
import { Col, Row } from "antd"
import { ProductResponse } from "../../../models/dto/ProductApiResponse.model"
import TaxCalculator from "../tax-calculator/TaxCalculator.component"
import ProductInformationVisits from "./ProductInformationVisits.component"
import ProductInformationGeneral from "./ProductInformationGeneral.component"
import ProductInformationPrices from "./ProductInformationPrices.component"
import ProductInformationSeller from "./ProductInformationSeller.component"

type Props = { productData?: ProductResponse; productId: string }
export default function ProductInformationContent({
  productData,
  productId,
}: Props) {
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
          <ProductInformationGeneral productData={productData} />
        </Col>

        <Col span={6}>
          <h2> Preço</h2>
          <ProductInformationPrices productData={productData} />
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
          <ProductInformationSeller productData={productData} />
        </Col>
      </Row>
    </>
  )
}
