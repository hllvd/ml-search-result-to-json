import { capitalizeFirstLetter } from "../utils/StringHandler.util"

export const getMappedColumn = (data: any[]) => {
  const columns = Array.from(
    new Set(data?.map(([firstElement]) => firstElement))
  )

  return columns.map((key) => ({
    title: capitalizeFirstLetter(key),
    dataIndex: key,
    key: key,
    render: (value: any) => value,
  }))
}

export const getTableContentWithSateSums = (data: any[]) => {
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
  return structuredRowsStateSums
}
