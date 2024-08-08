import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"

export const catalogReducer = (catalog: Array<MLProduct>) => {
  return catalog.reduce(
    (acc, curr, i) => {
      const isFull = curr.shipping?.logistic_type == LogisticType.full
      const isColeta =
        curr.shipping?.logistic_type == LogisticType.coleta ||
        curr.shipping?.logistic_type == LogisticType.coleta2
      const isCorreios = curr.shipping?.logistic_type == LogisticType.correios

      acc.firstPlacePrice = i === 0 ? curr.price : acc.firstPlacePrice

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
        isFull && acc.fullBestPosition === null ? i : acc.fullBestPosition

      acc.length += 1

      acc.shipment.full = isFull ? ++acc.shipment.full : acc.shipment.full
      acc.shipment.coleta = isColeta
        ? ++acc.shipment.coleta
        : acc.shipment.coleta
      acc.shipment.correios = isCorreios
        ? ++acc.shipment.correios
        : acc.shipment.correios

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
      shipment: {
        full: 0,
        correios: 0,
        coleta: 0,
      },
    }
  )
}
