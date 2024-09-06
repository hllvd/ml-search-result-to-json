import React from "react"
import { LoadingOutlined } from "@ant-design/icons"
import SearchComponent from "../../components/common/Search.component"
import { useParams } from "react-router-dom"
import useFetchProductInformation from "../../hooks/useFetchProductInformation"
import ProductInformationContent from "../../components/features/products/ProductInformation.component"

const ProductInformationPage: React.FC = () => {
  const { id } = useParams()

  const searchTerm = id ?? ""

  const { isLoading, isFetched, isError, data, error, refetch } =
    useFetchProductInformation(searchTerm)

  React.useEffect(() => {
    refetch()
  }, [searchTerm])

  return (
    <div>
      <SearchComponent isLoading={isLoading} />
      {isError && <p>Error fetching data</p>}
      {isLoading && searchTerm && <LoadingOutlined className="page-loading" />}
      {isFetched && searchTerm && (
        <ProductInformationContent productData={data} productId={searchTerm} />
      )}
    </div>
  )
}

export default ProductInformationPage
