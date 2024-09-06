export function extractEntityIdFromUrl(url: string): {
  entity: string
  id: string
} {
  const regexCatalog = /MLB\d+/
  const regexProduct = /MLB-\d+/
  const matchCatalog = url.match(regexCatalog)
  const matchProduct = url.match(regexProduct)
  if (matchCatalog) return { entity: "catalog", id: matchCatalog[0] }
  if (matchProduct)
    return {
      entity: "product",
      id: matchProduct[0].toString().replace("-", ""),
    }
  throw new Error("Invalid URL")
}
