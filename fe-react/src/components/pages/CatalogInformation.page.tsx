import React from "react"
import { Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import { LoadingOutlined } from "@ant-design/icons"
import useFetchCatalogInformation from "../../hooks/useFetchCatalogInformation"
import { statusChecker } from "../../utils/StatusChecker.util"
import { CatalogInformationResponse } from "../../models/dto/CatalogApiResponse.model"

const CatalogInformationPage: React.FC = () => {
  const { status, data, error } = useFetchCatalogInformation("MLB25575176")
  const { isError, isLoading, isSuccess } = statusChecker(status)
  return (
    <div>
      {isError && <p>Error fetching data</p>}
      {isLoading && <LoadingOutlined />}
      {status === "success" && (
        <Row gutter={16}>
          <Col span={12}>
            <img src={data?.thumbnail} alt={data?.title} />
          </Col>
          <Col span={12}>
            <h2>{data?.title}</h2>
          </Col>
          <Col span={12}>
            <Meta title="EAN" description={data?.ean} />
          </Col>
          <Col span={24} style={{ marginTop: 32, marginBottom: 12 }}>
            <Meta title="Faturamento total" description={data?.revenue} />
          </Col>
          <Col span={12}>
            <Meta
              title="Média faturamento diario"
              description={data?.dailyRevenue}
            />
          </Col>
        </Row>
      )}
    </div>
  )
}

export default CatalogInformationPage
