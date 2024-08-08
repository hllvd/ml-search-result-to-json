import { MLUser, PowerSellerStatus } from "../../../models/dto/ml-user.models"
import { userReducer } from "./user.reducer.service"

describe("userReducer", () => {
  it("Should correctly reduce the seller array", () => {
    //Arrange

    const sellers: Array<MLUser> = [
      {
        id: 1,
        seller_reputation: {
          power_seller_status: PowerSellerStatus.Gold,
        },
        address: {
          state: "BR-SP",
        },
      },
      {
        id: 2,
        seller_reputation: {
          power_seller_status: PowerSellerStatus.Gold,
        },
        address: {
          state: "BR-SP",
        },
      },
      {
        id: 3,
        seller_reputation: {
          power_seller_status: PowerSellerStatus.Silver,
        },
        address: {
          state: "BR-RJ",
        },
      },
      {
        id: 4,
        seller_reputation: {
          power_seller_status: PowerSellerStatus.Silver,
        },
        address: {
          state: "BR-SC",
        },
      },
    ]

    //Act
    const result = userReducer(sellers)
    expect(result).toEqual({
      medal: { medalLider: 2, medalGold: 2, medalPlatinum: 0 },
      state: {
        "BR-SP": 2,
        "BR-RJ": 1,
        "BR-SC": 1,
      },
    })
  })
})
