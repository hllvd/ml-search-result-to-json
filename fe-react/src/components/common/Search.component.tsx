import React, { useState } from "react"
import { Input } from "antd"
import { extractEntityIdFromUrl } from "../../utils/Regex.util"
import { useNavigate } from "react-router-dom"
const { Search } = Input

type Props = { isLoading?: boolean }
export default function SearchComponent({ isLoading }: Props) {
  const navigate = useNavigate()
  const onSearchHandler = (searchTerm: string) => {
    const entity = extractEntityIdFromUrl(searchTerm)
    navigate(`/${entity.entity}/${entity.id}`)
  }
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
