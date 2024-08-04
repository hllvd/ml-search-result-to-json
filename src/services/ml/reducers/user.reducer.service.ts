import { MLUser, PowerSellerStatus } from "../../../models/dto/ml-user.models"

const userReducer = (sellers: Array<MLUser>) => {
  return sellers.reduce(
    (acc, curr) => {
      acc.medalGold =
        curr.seller_reputation.power_seller_status === PowerSellerStatus.Gold
          ? ++acc.medalGold
          : acc.medalGold
      acc.medalPlatinum =
        curr.seller_reputation.power_seller_status ===
        PowerSellerStatus.Platinum
          ? ++acc.medalPlatinum
          : acc.medalPlatinum
      acc.medalLider =
        curr.seller_reputation.power_seller_status === PowerSellerStatus.Silver
          ? ++acc.medalLider
          : acc.medalLider
      const state = curr.address?.state

      if (state) {
        acc.state[state] = (acc.state[state] || 0) + 1
      }

      return acc
    },
    {
      medalLider: 0,
      medalGold: 0,
      medalPlatinum: 0,
      state: {},
    }
  )
}
export { userReducer }
