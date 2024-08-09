import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"

export const catalogReducer = (
  catalog: Array<MLProduct>
): CatalogReducerResponse => {
  return (catalog.reduce(
    (acc, curr, i) => {
      const isFull = curr.shipping?.logistic_type == LogisticType.full
      const isColeta =
        curr.shipping?.logistic_type == LogisticType.coleta ||
        curr.shipping?.logistic_type == LogisticType.coleta2
      const isCorreios = curr.shipping?.logistic_type == LogisticType.correios

      const price = curr.price
      acc.firstPlacePrice = i === 0 ? price : acc.firstPlacePrice
      acc.length += 1

      const state = curr.seller_address?.state?.id

      acc.priceList.push(price)
      acc.priceList.sort((a, b) => a - b)

      acc.sumPrice += price

      acc.bestPrice =
        acc.bestPrice === null ? price : Math.min(acc.bestPrice, price)

      acc.secondBestPrice = acc.priceList[1] ?? null

      acc.bestPriceFull =
        isFull && acc.bestPriceFull === null ? price : acc.bestPriceFull

      acc.bestPriceFull = isFull
        ? Math.min(acc.bestPriceFull, price)
        : acc.bestPriceFull

      acc.fullBestPosition =
        isFull && acc.fullBestPosition === null ? i : acc.fullBestPosition

      const shipmentKey = _getShipmentKeyByLogisticType(
        curr.shipping?.logistic_type as LogisticType
      )
      console.log("shipmentKey", shipmentKey, "state", state)
      acc.shipmentByState[shipmentKey][state] =
        acc.shipmentByState[shipmentKey][state] === undefined
          ? 1
          : ++acc.shipmentByState[shipmentKey][state]

      const currentDateCreated = new Date(curr.date_created)

      acc.dateCreated =
        !acc.dateCreated || currentDateCreated < new Date(acc.dateCreated)
          ? currentDateCreated.toISOString()
          : acc.dateCreated
      return acc
    },
    {
      sumPrice: 0,
      bestPrice: null,
      secondBestPrice: null,
      firstPlacePrice: 0,
      bestPriceFull: null,
      fullBestPosition: null,
      length: 0,
      priceList: [],
      dateCreated: "",
      shipmentByState: {
        full: {},
        correios: {},
        coleta: {},
        others: {},
      },
    }
  ).priceList = null)
}

const _getShipmentKeyByLogisticType = (logisticType: LogisticType | string) => {
  switch (logisticType) {
    case LogisticType.full:
      return "full"
    case LogisticType.coleta:
    case LogisticType.coleta2:
      return "coleta"
    case LogisticType.correios:
      return "correios"
    default:
      return "others"
  }
}

interface CatalogReducerResponse {
  sumPrice: number
  bestPrice: number | null
  secondBestPrice: number | null
  firstPlacePrice: number
  bestPriceFull: number | null
  fullBestPosition: number | null
  length: number
  priceList: Array<number>
  dateCreated: string
  shipmentByState: {
    full: { [state: string]: number }
    correios: { [state: string]: number }
    coleta: { [state: string]: number }
    others: { [state: string]: number }
  }
}
