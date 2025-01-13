export const removeProductDuplicates = (productList: any[]) => {
  const seen = new Set()
  return productList.filter((product) => {
    const duplicate = seen.has(product.id)
    seen.add(product.id)
    return !duplicate
  })
}
