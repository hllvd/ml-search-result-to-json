import { MLUser, PowerSellerStatus } from "../../../models/dto/ml-user.models"
import { UserReducerResult } from "../../../models/reducers/user-reducer.models"

const userReducer = (sellers: Array<MLUser>): UserReducerResult => {
  return sellers.reduce(
    (acc, curr) => {
      const isGold =
        curr.seller_reputation.power_seller_status === PowerSellerStatus.Gold
      const isLider =
        curr.seller_reputation.power_seller_status === PowerSellerStatus.Silver
      const isPlatinum =
        curr.seller_reputation.power_seller_status ===
        PowerSellerStatus.Platinum

      const state = curr.address?.state

      if (isGold) {
        acc.medalByState.medalGold[state] =
          acc.medalByState.medalGold[state] === undefined
            ? 1
            : acc.medalByState.medalGold[state] + 1
      }

      if (isLider) {
        acc.medalByState.medalLider[state] =
          acc.medalByState.medalLider[state] === undefined
            ? 1
            : acc.medalByState.medalLider[state] + 1
      }

      if (isPlatinum) {
        acc.medalByState.medalPlatinum[state] =
          acc.medalByState.medalPlatinum[state] === undefined
            ? 1
            : acc.medalByState.medalPlatinum[state] + 1
      }

      if (!isPlatinum && !isPlatinum && !isLider) {
        acc.medalByState.noMedal[state] =
          acc.medalByState.noMedal[state] === undefined
            ? 1
            : acc.medalByState.noMedal[state] + 1
      }

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
export { userReducer }
