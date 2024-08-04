import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"

export const catalogReducer = (catalog: Array<MLProduct>) => {
  return catalog.reduce(
    (acc, curr, i) => {
      const isFull = curr.shipping?.logistic_type == LogisticType.full
      acc.firstPlace = i == 0 ? curr.price : acc.firstPlace

      acc.sumPrice += curr.price

      acc.bestPrice =
        acc.bestPrice === null
          ? curr.price
          : Math.min(acc.bestPrice, curr.price)

      acc.secondBestPrice =
        acc.secondBestPrice === null && curr.price > acc.bestPrice
          ? curr.price
          : acc.secondBestPrice
      acc.secondBestPrice =
        curr.price > acc.bestPrice
          ? Math.min(acc.secondBestPrice, curr.price)
          : acc.secondBestPrice

      acc.bestPriceFull =
        isFull && acc.bestPriceFull === null ? curr.price : acc.bestPriceFull
      acc.bestPriceFull = isFull
        ? Math.min(acc.bestPriceFull, curr.price)
        : acc.bestPriceFull

      acc.fullBestPosition =
        isFull && acc.fullBestPosition == null ? i : acc.fullBestPosition

      acc.length += 1
      return acc
    },
    {
      sumPrice: 0,
      bestPrice: null,
      secondBestPrice: null,
      firstPlace: 0,
      bestPriceFull: null,
      fullBestPosition: null,
      length: 0,
    }
  )
}
