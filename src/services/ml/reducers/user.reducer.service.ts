import { MLUser, PowerSellerStatus } from "../../../models/dto/ml-user.models"
import { UserReducerResult } from "../../../models/reducers/user-reducer.models"

const userReducer = (sellers: Array<MLUser>): UserReducerResult => {
  return sellers.reduce(
    (acc, curr) => {
      acc.medal.medalGold =
        curr.seller_reputation.power_seller_status === PowerSellerStatus.Gold
          ? ++acc.medal.medalGold
          : acc.medal.medalGold
      acc.medal.medalPlatinum =
        curr.seller_reputation.power_seller_status ===
        PowerSellerStatus.Platinum
          ? ++acc.medal.medalPlatinum
          : acc.medal.medalPlatinum
      acc.medal.medalLider =
        curr.seller_reputation.power_seller_status === PowerSellerStatus.Silver
          ? ++acc.medal.medalLider
          : acc.medal.medalLider
      acc.medal.noMedal =
        curr.seller_reputation.power_seller_status === null
          ? ++acc.medal.noMedal
          : acc.medal.noMedal
      const state = curr.address?.state

      if (state) {
        acc.state[state] = (acc.state[state] || 0) + 1
      }

      return acc
    },
    {
      medal: {
        medalLider: 0,
        medalGold: 0,
        medalPlatinum: 0,
        noMedal: 0,
      },
      medalByState: {},
      state: {},
    }
  )
}
export { userReducer }
