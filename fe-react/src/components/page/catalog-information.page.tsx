import React from "react"
import { Col, Row } from "antd"
import { useQuery } from "react-query"
import Meta from "antd/es/card/Meta"
import { fetchCatalogInformation } from "../../services/api/ml-catalog.api.service"
import { CatalogInformationResponse } from "../../models/dto/catalog-api-response.model"

// const catalogData = {
//   catalogId: "MLB18580665",
//   title: "Taiff Black Ion Secador De Cabelo Profissional 2000w Cor Preto 110v",
//   ean: "7898588111590",
//   brandModel: {
//     brand: "Taiff",
//     model: "Black Ion",
//     color: "Preto",
//   },
//   revenue: 11950000,
//   dailyRevenue: 12672.322375397667,
// }

// const onFinish: CountdownProps["onFinish"] = () => {
//   console.log("finished!")
// }

// const onChange: CountdownProps["onChange"] = (val) => {
//   console.log("onchange")
// }

const CatalogInformationPage: React.FC = () => {
  const { data, status, error } = useQuery<CatalogInformationResponse>(
    [
      "catalogInformationFetcher",
      { userId: "1231084821", catalogId: "MLB25575176" },
    ],
    () =>
      fetchCatalogInformation({
        userId: "1231084821",
        catalogId: "MLB25575176",
      })
  )

  return (
    <div>
      {status === "error" && <p>Error fetching data</p>}
      {status === "loading" && <p>Fetching data...</p>}
      {status === "success" && (
        <Row gutter={16}>
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
