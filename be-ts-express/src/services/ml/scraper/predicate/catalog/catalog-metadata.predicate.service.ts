import { AxiosResponse } from "axios"
import { JSDOM } from "jsdom"
import { sanitizeAmountSold } from "../../../../../utils/ml.utils"

const webScrapeCatalogToMetadataPredicate = async (
  response: AxiosResponse
): Promise<{ response: { amountInt: number; hasVideo: boolean } }> => {
  const dom = new JSDOM(await response.data)
  const document = dom.window.document
  const amountHtml = document.querySelector(".ui-pdp-subtitle")
  const amountStrInner = amountHtml.textContent
  const amountInt = sanitizeAmountSold(amountStrInner)
  const clipIconHtml = document.querySelector(
    ".ui-pdp-thumbnail--overlay .clip-picture-icon"
  )

  const hasVideo = !!clipIconHtml
  return { response: { amountInt, hasVideo } }
}

export { webScrapeCatalogToMetadataPredicate }
