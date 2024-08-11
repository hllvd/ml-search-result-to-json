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
        mlOwner: false,
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
        mlOwner: false,
        official_store_id: 123,
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
        mlOwner: false,
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
        mlOwner: false,
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
      firstPlacePrice: 50,
      bestPriceFull: 60,
      price: { top5Avg: 56.25, best: 50, secondBest: 55 },
      position: {
        full: 3,
        medalGold: 2,
        medalPlatinum: 1,
        medalLider: null,
        officialStore: 2,
      },
      length: 4,
      mlOwner: false,
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

  it("Should correctly reduce the one element catalog array", () => {
    //Arrange
    const commonProperties = { id: "id", permalink: "https://example.com" }
    const sellers: Array<MLProduct> = [
      {
        ...commonProperties,
        seller_address: { state: { id: "BR-SP" } },
        date_created: "2022-06-13T11:23:59.000Z",
        price: 50,
        mlOwner: false,
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
    ]

    //Act
    const result = catalogReducer(sellers)

    //Assert
    expect(result).toEqual({
      firstPlacePrice: 50,
      bestPriceFull: null,
      price: { top5Avg: 50, best: 50, secondBest: null },
      position: {
        full: null,
        medalGold: null,
        medalPlatinum: 1,
        medalLider: null,
        officialStore: null,
      },
      length: 1,
      mlOwner: false,
      dateCreated: "2022-06-13T11:23:59.000Z",
      shipmentByState: {
        full: {},
        correios: { "BR-SP": 1 },
        coleta: {},
        others: {},
      },
      medalByState: {
        medalLider: {},
        medalGold: {},
        medalPlatinum: { "BR-SP": 1 },
        noMedal: {},
      },
      state: {
        "BR-SP": 1,
      },
    })
  })
})
