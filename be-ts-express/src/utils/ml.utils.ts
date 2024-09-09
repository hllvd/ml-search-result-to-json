export const convertCatalogIdToProductId = (catalogId: string) =>
  `MLB-${catalogId.split("MLB")[1]}`
