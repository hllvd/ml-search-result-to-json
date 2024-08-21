import React from "react"
import { Col, Row } from "antd"
import Meta from "antd/es/card/Meta"
import { CatalogInformationResponse } from "../../../models/dto/CatalogApiResponse.model"
import "./CatalogInformationContent.css"
import {
  currencyFormatter,
  dateIsoFormatter,
} from "../../../utils/LocaleFormater.util"
import { daysFromNow } from "../../../utils/DateFormatter.util"
import CrossoverTable from "../../common/CrossoverTableCommon.component"
import { FlatThat } from "../../../utils/ArrayFlat"

type Props = { catalogData?: CatalogInformationResponse; productId: string }
export default function CatalogInformationContent({
  catalogData,
  productId,
}: Props) {
  return (
    <>
      <Row gutter={16} className="row-with-margin m-zoom">
        <Col span={8}>
          <a href={catalogData?.permalink} target="_blank">
            <img src={catalogData?.thumbnail} alt={catalogData?.title} />
          </a>
        </Col>
        <Col span={12}>
          <h2>{catalogData?.title}</h2>
        </Col>
      </Row>
      <Row gutter={16} className="row-with-margin m-zoom">
        <Col span={6}>
          <Meta title="EAN" description={catalogData?.ean} />
          <Meta
            title="Criação do catálogo"
            description={
              catalogData?.dateCreated && daysFromNow(catalogData?.dateCreated)
            }
          />
          <Meta
            title="Quantidade de anúncios"
            description={catalogData?.length}
          />
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
        </Col>
        <Col span={6}>
          <Meta
            title="Faturamento total"
            description={
              catalogData?.revenue &&
              currencyFormatter(catalogData?.revenue, true)
            }
          />
          <Meta
            title="Média faturamento diario"
            description={
              catalogData?.dailyRevenue &&
              currencyFormatter(catalogData?.dailyRevenue, true)
            }
          />
        </Col>
        <Col span={6}>
          <Meta
            title="Melhor preço"
            description={
              catalogData?.price.best &&
              currencyFormatter(catalogData?.price.best, true)
            }
            className="highlighted-description"
          />
          <Meta
            title="Top5 preço médio"
            description={
              catalogData?.price.top5Avg &&
              currencyFormatter(catalogData?.price.top5Avg, true)
            }
          />
          <Meta
            title="Segundo melhor preço"
            description={
              catalogData?.price.secondBest &&
              currencyFormatter(catalogData?.price.secondBest, true)
            }
          />
          <Meta
            title="Melhor preço full"
            description={
              catalogData?.price.full &&
              currencyFormatter(catalogData?.price.full, true)
            }
          />
        </Col>
        <Col span={6}>
          <Meta
            title="Full"
            description={`${
              catalogData?.position.full && catalogData?.position.full
            }ª  posição`}
          />
          <Meta
            title="Gold"
            description={
              catalogData?.position?.medalGold &&
              `${catalogData?.position.medalGold}ª  posição`
            }
          />
          <Meta
            title="Platinum"
            description={
              catalogData?.position?.medalPlatinum &&
              `${catalogData?.position?.medalPlatinum}ª  posição`
            }
          />
          <Meta
            title="Lider"
            description={
              catalogData?.position?.medalLider &&
              `${catalogData?.position.medalLider}ª  posição`
            }
          />
          <Meta
            title="Loja oficial"
            description={
              catalogData?.position?.officialStore &&
              `${catalogData?.position.officialStore}ª  posição`
            }
          />
        </Col>
      </Row>

      <Row gutter={16} className="row-with-margin">
        <Col span={14}>
          <h2> Tipos de envio / quantidade</h2>
          <CrossoverTable data={FlatThat(catalogData?.shipmentByState)} />
        </Col>
      </Row>
    </>
  )
}
