import React from "react"
import { Space, Table, Tag } from "antd"
import type { TableProps } from "antd"
import { capitalizeFirstLetter } from "../../utils/StringHandler.util"
import {
  getMappedColumn,
  getTableContentWithSateSums,
} from "../../services/shipment-table-array.service"

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

export default function CrossoverTable({ data }: Props) {
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
