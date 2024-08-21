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
      value="https://www.mercadolivre.com.br/serum-vitamina-c-para-os-olhos-payot-14ml/p/MLB19564320#searchVariation%3DMLB19564320%26"
      onSearch={onSearchHandler}
    />
  )
}
