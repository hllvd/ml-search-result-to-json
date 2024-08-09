import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"
import { PowerSellerStatus } from "../../../models/dto/ml-user.models"
import { catalogReducer } from "./catalog.reducer.service"

describe("catalogReducer", () => {
  it("Should correctly reduce the catalog array", () => {
    //Arrange
    const commonProperties = { id: "id", permalink: "https://example.com" }
    const sellers: Array<MLProduct> = [
      {
        ...commonProperties,
        seller_address: { state: { id: "BR-SP" } },
        date_created: "2022-06-13T11:23:59.000Z",
        price: 50,
        shipping: {
          logistic_type: LogisticType.correios,
        },
        mlUser: {
          id: 1,
          seller_reputation: {
            power_seller_status: PowerSellerStatus.Platinum,
          },
        },
      },
      {
        ...commonProperties,
        seller_address: { state: { id: "BR-SP" } },
        date_created: "2022-06-13T11:23:59.000Z",
        price: 55,
        shipping: {
          logistic_type: LogisticType.coleta,
        },
        mlUser: {
          id: 1,
          seller_reputation: { power_seller_status: PowerSellerStatus.Gold },
        },
      },
      {
        ...commonProperties,
        seller_address: { state: { id: "BR-SC" } },
        date_created: "2022-06-13T11:23:59.000Z",
        price: 60,
        shipping: {
          logistic_type: LogisticType.full,
        },
        mlUser: {
          id: 1,
          seller_reputation: { power_seller_status: PowerSellerStatus.Gold },
        },
      },
      {
        ...commonProperties,
        seller_address: { state: { id: "BR-SP" } },
        date_created: "2022-06-13T11:23:59.000Z",
        price: 60,
        shipping: {
          logistic_type: LogisticType.full,
        },
        mlUser: {
          id: 1,
          seller_reputation: null,
        },
      },
    ]

    //Act
    const result = catalogReducer(sellers)

    //Assert
    expect(result).toEqual({
      sumPrice: 225,
      bestPrice: 50,
      secondBestPrice: 55,
      firstPlacePrice: 50,
      bestPriceFull: 60,
      medalGoldBestPosition: 2,
      medalPlatinumBestPosition: 1,
      medalLiderBestPosition: null,
      fullBestPosition: 3,
      length: 4,
      dateCreated: "2022-06-13T11:23:59.000Z",
      shipmentByState: {
        full: { "BR-SC": 1, "BR-SP": 1 },
        correios: { "BR-SP": 1 },
        coleta: { "BR-SP": 1 },
        others: {},
      },
      medalByState: {
        medalLider: {},
        medalGold: { "BR-SP": 1, "BR-SC": 1 },
        medalPlatinum: { "BR-SP": 1 },
        noMedal: { "BR-SP": 1 },
      },
      state: {
        "BR-SC": 1,
        "BR-SP": 3,
      },
    })
  })
})
