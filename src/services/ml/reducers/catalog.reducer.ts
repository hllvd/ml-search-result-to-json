import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"

export const catalogReducer = (catalog: Array<MLProduct>) => {
  catalog.reduce(
    (acc, curr, i) => {
      const isFull = curr.shipping?.logistic_type == LogisticType.full
      acc.firstPlace = i == 0 ? curr.price : acc.firstPlace
      acc.sumPrice += curr.price
      acc.bestPrice = Math.min(acc.bestPrice, curr.price)
      acc.secondBestPrice =
        curr.price <= acc.bestPrice
          ? Math.min(acc.secondBestPrice, curr.price)
          : acc.secondBestPrice
      acc.bestPriceFull = isFull
        ? Math.min(acc.secondBestPrice, curr.price)
        : acc.bestPriceFull
      acc.fullBestPosition =
        isFull && acc.fullBestPosition == null ? i : acc.fullBestPosition
      acc.length += 1
      return acc
    },
    {
      sumPrice: 0,
      bestPrice: 0,
      secondBestPrice: 0,
      firstPlace: 0,
      bestPriceFull: 0,
      fullBestPosition: null,
      length: 0,
    }
  )
}
