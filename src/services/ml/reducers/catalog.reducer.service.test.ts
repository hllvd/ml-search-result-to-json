import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"
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
      },
      {
        ...commonProperties,
        seller_address: { state: { id: "BR-SP" } },
        date_created: "2022-06-13T11:23:59.000Z",
        price: 55,
        shipping: {
          logistic_type: LogisticType.coleta,
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
      },
      {
        ...commonProperties,
        seller_address: { state: { id: "BR-SP" } },
        date_created: "2022-06-13T11:23:59.000Z",
        price: 60,
        shipping: {
          logistic_type: LogisticType.full,
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
      fullBestPosition: 2,
      length: 4,
      dateCreated: "2022-06-13T11:23:59.000Z",
      shipmentByState: {
        full: { "BR-SC": 1, "BR-SP": 1 },
        correios: { "BR-SP": 1 },
        coleta: { "BR-SP": 1 },
        others: {},
      },
    })
  })
})
