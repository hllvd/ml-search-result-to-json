import { Any, PrimaryColumnCannotBeNullableError } from "typeorm"
import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"
import { PowerSellerStatus } from "../../../models/dto/ml-user.models"

export const catalogReducer = (
  catalog: Array<MLProduct>
): CatalogReducerResponse => {
  const catalogReducer = catalog.reduce(
    (acc, curr, i) => {
      const { mlUser, price, title } = curr
      const isFull = curr.shipping?.logistic_type == LogisticType.full
      const state = curr.seller_address?.state?.id
      const currentDateCreated = new Date(curr.date_created)
      delete curr.pictures
      delete curr.attributes
      acc.title = title

      const shipmentKey = _getShipmentKeyByLogisticType(
        curr.shipping?.logistic_type as LogisticType
      )
      const { isMedalPlatinum, isMedalGold, isMedalLider } = _getMedalBooleans(
        mlUser.seller_reputation?.power_seller_status
      )

      acc.medalGoldBestPosition = _getBestPosition({
        currentPosition: i,
        currentValue: acc.medalGoldBestPosition,
        isType: isMedalGold,
      })
      acc.medalPlatinumBestPosition = _getBestPosition({
        currentPosition: i,
        currentValue: acc.medalPlatinumBestPosition,
        isType: isMedalPlatinum,
      })
      acc.medalLiderBestPosition = _getBestPosition({
        currentPosition: i,
        currentValue: acc.medalLiderBestPosition,
        isType: isMedalLider,
      })

      const currentMedal = _getMedalKey(
        mlUser.seller_reputation?.power_seller_status
      )
      acc.medalByState[currentMedal][state] =
        acc.medalByState[currentMedal][state] === undefined
          ? 1
          : acc.medalByState[currentMedal][state] + 1

      if (state) {
        acc.state[state] = (acc.state[state] || 0) + 1
      }

      acc.firstPlacePrice = i === 0 ? price : acc.firstPlacePrice
      acc.length += 1

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
        isFull && acc.fullBestPosition === null ? i + 1 : acc.fullBestPosition

      acc.shipmentByState[shipmentKey][state] =
        acc.shipmentByState[shipmentKey][state] === undefined
          ? 1
          : ++acc.shipmentByState[shipmentKey][state]

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
      medalGoldBestPosition: null,
      medalPlatinumBestPosition: null,
      title: "",
      medalLiderBestPosition: null,
      length: 0,
      priceList: [],
      dateCreated: "",
      state: {},
      shipmentByState: {
        full: {},
        correios: {},
        coleta: {},
        others: {},
      },
      medalByState: {
        medalLider: {},
        medalGold: {},
        medalPlatinum: {},
        noMedal: {},
      },
    }
  )
  delete catalogReducer.priceList
  return catalogReducer
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

const _getMedalKey = (powerSellerStatus: string) => {
  switch (powerSellerStatus) {
    case PowerSellerStatus.Gold:
      return "medalGold"
    case PowerSellerStatus.Silver:
      return "medalLider"
    case PowerSellerStatus.Platinum:
      return "medalPlatinum"
    default:
      return "noMedal"
  }
}

const _getMedalBooleans = (powerSellerStatus: string) => {
  const isMedalPlatinum = powerSellerStatus == PowerSellerStatus.Platinum
  const isMedalGold = powerSellerStatus == PowerSellerStatus.Gold
  const isMedalLider = powerSellerStatus == PowerSellerStatus.Silver
  return { isMedalPlatinum, isMedalGold, isMedalLider }
}

const _getBestPosition = ({
  currentPosition,
  isType,
  currentValue,
}: {
  currentPosition: number
  isType: boolean
  currentValue: number | number
}) => (isType && currentValue === null ? currentPosition + 1 : currentValue)

interface CatalogReducerResponse {
  sumPrice: number
  bestPrice: number | null
  secondBestPrice: number | null
  firstPlacePrice: number
  bestPriceFull: number | null
  fullBestPosition: number | null
  medalGoldBestPosition: number | null
  medalPlatinumBestPosition: number | null
  medalLiderBestPosition: number | null
  length: number
  priceList: Array<number>
  dateCreated: string
  state: { [key: string]: number }
  shipmentByState: {
    full: { [state: string]: number }
    correios: { [state: string]: number }
    coleta: { [state: string]: number }
    others: { [state: string]: number }
  }
  medalByState: {
    medalLider: { [state: string]: number }
    medalGold: { [state: string]: number }
    medalPlatinum: { [state: string]: number }
    noMedal: { [state: string]: number }
  }
}
