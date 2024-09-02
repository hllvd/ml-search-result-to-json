import React from "react"
import { Input } from "antd"
const { Search } = Input

type Props = { onSearchHandler: any }
export default function SearchCatalogComponent({ onSearchHandler }: Props) {
  return (
    <Search
      placeholder="Entre com a url ou código do catálogo"
      enterButton="Buscar catálogo"
      size="large"
      onSearch={onSearchHandler}
    />
  )
}
