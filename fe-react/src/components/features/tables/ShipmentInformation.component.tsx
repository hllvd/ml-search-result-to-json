import React from "react"
import { Table } from "antd"
import type { TableProps } from "antd"
import {
  getMappedColumn,
  getTableContentWithSateSums,
} from "../../../services/ShipmentTableArray.service"

type Props = {
  data?: any[]
}
type AlphaNumeric = string | number
interface DataType {
  key: string
  coleta: AlphaNumeric | null
  estado: string
  full: AlphaNumeric | null
  correios: AlphaNumeric | null
  totalEstado: AlphaNumeric | null
}

export default function ShipmentInformationTable({ data }: Props) {
  const mappedCol = (data && getMappedColumn(data)) ?? []

  mappedCol.unshift({
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
    render: (text: string) => {
      switch (text) {
        case "BR-SC":
          return <i className="highlighted">{text}</i>
        case "Tipos de envio / total":
          return <strong>{text}</strong>
        default:
          return <span>{text}</span>
      }
    },
  })

  mappedCol.push({
    title: "Total por estado",
    dataIndex: "estadoTotal",
    key: "estadoTotal",
    render: (text: any) => <strong>{text}</strong>,
  })

  const structuredRowStateSums =
    (data && getTableContentWithSateSums(data)) ?? []
  const columns: TableProps<DataType>["columns"] = mappedCol
  return (
    <div>
      <Table
        columns={columns}
        dataSource={structuredRowStateSums}
        pagination={{ hideOnSinglePage: true }}
        className={"m-zoom"}
      />
    </div>
  )
}
