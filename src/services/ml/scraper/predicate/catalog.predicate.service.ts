import axios from "axios"
import { JSDOM } from "jsdom"
import { ProductId } from "../../../../models/dto/ml-product.models"

const webScrapeCatalogPredicate = async (url: string): Promise<ProductId[]> => {
  const response = await axios.get(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
    },
  })

  const regex = /\/p\/([^/]+)\//
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const buttonWithUrls = Array.from(
    document.querySelectorAll(".andes-button.ui-pdp-action--secondary")
  ).map((el: any) => el.getAttribute("formaction"))

  const productIds = buttonWithUrls.map((e) => e.match(regex)[1])
  if (productIds.length === 0) throw new Error("No products found")
  return productIds
}

export { webScrapeCatalogPredicate }
