import { MLUser, PowerSellerStatus } from "../../../models/dto/ml-user.models"
import { UserReducerResult } from "../../../models/reducers/user-reducer.models"

const userReducer = (sellers: Array<MLUser>): UserReducerResult => {
  return sellers.reduce(
    (acc, curr) => {
      const state = curr.address?.state

      const currentMedal = _getMedalKey(
        curr.seller_reputation.power_seller_status
      )
      acc.medalByState[currentMedal][state] =
        acc.medalByState[currentMedal][state] === undefined
          ? 1
          : acc.medalByState[currentMedal][state] + 1

      if (state) {
        acc.state[state] = (acc.state[state] || 0) + 1
      }

      return acc
    },
    {
      medalByState: {
        medalLider: {},
        medalGold: {},
        medalPlatinum: {},
        noMedal: {},
      },
      state: {},
    }
  )
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
export { userReducer }
