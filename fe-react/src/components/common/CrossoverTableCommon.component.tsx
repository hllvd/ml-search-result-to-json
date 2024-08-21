import React from "react"
import { Space, Table, Tag } from "antd"
import type { TableProps } from "antd"

type Props1 = {
  data?: { [key: string]: { [key: string]: { [key: string]: number } } }
}
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

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default function CrossoverTable({ data }: Props) {
  const columns = Array.from(
    new Set(data?.map(([firstElement]) => firstElement))
  )

  const mappedCol = columns.map((key) => ({
    title: capitalizeFirstLetter(key),
    dataIndex: key,
    key: key,
    render: (value: any) => value,
  }))

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

  const statesKeys = Array.from(
    new Set(data?.map(([_firstEl, secondEl]) => secondEl))
  ).map((el) => ({ estado: el }))

  const structuredRows = [...statesKeys].map((el: any) => {
    data?.forEach(([firstEl, secondEl, thirdEl]: [string, string, string]) => {
      if (secondEl === el.estado) {
        el[firstEl] = thirdEl
      }
    })
    return { ...el }
  })
  const structuredRowsStateSums = structuredRows.map((el) => {
    const total = Object.values(el).reduce((acc: any, curr: any) => {
      if (typeof curr === "number") return acc + (curr || 0)
      return acc
    }, 0)
    return { ...el, estadoTotal: total }
  })
  const structuredRowsWithSumsByShipment = structuredRows.reduce(
    (acc: any, curr: any) => {
      acc.full += curr.full || 0
      acc.coleta += curr.coleta || 0
      acc.correios += curr.correios || 0
      return acc
    },
    { estado: "Tipos de envio / total", full: 0, coleta: 0, correios: 0 }
  )
  structuredRowsStateSums.push(structuredRowsWithSumsByShipment)

  console.log("structuredRows", structuredRows)

  const columns2: TableProps<DataType>["columns"] = mappedCol
  return (
    <div>
      <Table
        columns={columns2}
        dataSource={structuredRowsStateSums}
        pagination={{ hideOnSinglePage: true }}
        className={"m-zoom"}
      />
    </div>
  )
}
