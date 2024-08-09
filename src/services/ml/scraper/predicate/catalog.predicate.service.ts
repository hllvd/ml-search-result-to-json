import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { ProductId } from "../../../../models/dto/ml-product.models"

/**
 *
 * @param response
 * @returns list of product ids and a boolean indicating if there is a next page
 */
const webScrapeCatalogToProductStrsPredicate = async (
  response: AxiosResponse
): Promise<{ nextPage: boolean; response: ProductId[] }> => {
  const regex = /\/p\/([^/]+)\//
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const buttonWithUrls = Array.from(
    document.querySelectorAll(".andes-button.ui-pdp-action--secondary")
  ).map((el: any) => el.getAttribute("formaction"))
  const nextPage =
    Array.from(
      document.querySelectorAll(
        ".li.andes-pagination__button.andes-pagination__button--next.andes-pagination__button--disabled"
      )
    ).length === 0
  const productIds = buttonWithUrls.map((e) => e.match(regex)[1])
  if (productIds.length === 0) throw new Error("No products found")
  return { nextPage, response: productIds }
}

const webScrapeCatalogToMetadata = async (
  response: AxiosResponse
): Promise<{ response: ProductId[] }> => {
  const regex = /\/p\/([^/]+)\//
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const buttonWithUrls = Array.from(
    document.querySelectorAll(".andes-button.ui-pdp-action--secondary")
  ).map((el: any) => el.getAttribute("formaction"))

  const productIds = buttonWithUrls.map((e) => e.match(regex)[1])
  if (productIds.length === 0) throw new Error("No products found")
  return { response: productIds }
}

export { webScrapeCatalogToProductStrsPredicate, webScrapeCatalogToMetadata }
