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
    render: (text: any) => <a>{text}</a>,
  })

  const columns2: TableProps<DataType>["columns"] = mappedCol
  return (
    <div>
      <Table
        columns={columns2}
        dataSource={structuredRows}
        pagination={{ hideOnSinglePage: true }}
      />
    </div>
  )
}
