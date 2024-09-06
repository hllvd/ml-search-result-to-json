import React from "react"
import { Col, Row } from "antd"

import TaxCalculator from "../tax-calculator/TaxCalculator.component"
import { ProductResponse } from "../../../models/dto/ProductApiResponse.model"

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
        <Col span={6}></Col>
        <Col span={6}>
          <section className="tax-box-simulator"></section>
        </Col>
        <Col span={6}>sdfds</Col>
        <Col span={6}>sdf</Col>
      </Row>

      <Row gutter={20} className="row-with-margin">
        <Col span={14}>
          <h2> Tipos de envio / quantidade</h2>
          fsd
        </Col>
        <Col span={6}>
          <h2> Visitas últimos 30 dias</h2>
          fds
        </Col>
      </Row>
    </>
  )
}
