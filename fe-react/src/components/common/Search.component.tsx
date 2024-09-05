import React from "react"
import { Input } from "antd"
const { Search } = Input

type Props = { onSearchHandler: any; isLoading?: boolean }
export default function SearchComponent({ onSearchHandler, isLoading }: Props) {
  return (
    <Search
      placeholder="Entre com a url ou código do catálogo"
      enterButton="Buscar agora"
      size="large"
      onSearch={onSearchHandler}
      disabled={isLoading}
    />
  )
}
