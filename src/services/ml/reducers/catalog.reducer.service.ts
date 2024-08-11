import { ML_OWN_USER_ID } from "../../../constants"
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

      acc.mlOwner = mlUser.id.toString() === ML_OWN_USER_ID ? true : acc.mlOwner

      const shipmentKey = _getShipmentKeyByLogisticType(
        curr.shipping?.logistic_type as LogisticType
      )
      const { isMedalPlatinum, isMedalGold, isMedalLider } = _getMedalBooleans(
        mlUser.seller_reputation?.power_seller_status
      )

      acc.position.medalGold = _getBestPosition({
        currentPosition: i,
        currentValue: acc.position.medalGold,
        isType: isMedalGold,
      })
      acc.position.medalPlatinum = _getBestPosition({
        currentPosition: i,
        currentValue: acc.position.medalPlatinum,
        isType: isMedalPlatinum,
      })
      acc.position.medalLider = _getBestPosition({
        currentPosition: i,
        currentValue: acc.position.medalLider,
        isType: isMedalLider,
      })
      acc.position.full = _getBestPosition({
        currentPosition: i,
        currentValue: acc.position.full,
        isType: isFull,
      })
      acc.position.officialStore = _getBestPosition({
        currentPosition: i,
        currentValue: acc.position.officialStore,
        isType: curr.official_store_id != null,
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

      acc.price.top5Avg =
        i < 5
          ? acc.priceList.reduce((ac, cur) => ac + cur, 0) / (i + 1)
          : acc.price.top5Avg

      acc.price.best =
        acc.price.best === null ? price : Math.min(acc.price.best, price)

      acc.price.secondBest = acc.priceList[1] ?? null

      acc.bestPriceFull =
        isFull && acc.bestPriceFull === null ? price : acc.bestPriceFull

      acc.bestPriceFull = isFull
        ? Math.min(acc.bestPriceFull, price)
        : acc.bestPriceFull

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
      title: "",
      price: { top5Avg: null, best: null, secondBest: null },
      firstPlacePrice: 0,
      bestPriceFull: null,
      position: {
        full: null,
        medalGold: null,
        medalPlatinum: null,
        medalLider: null,
        officialStore: null,
      },
      length: 0,
      priceList: [],
      dateCreated: "",
      state: {},
      mlOwner: false,

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
