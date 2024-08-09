import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"
import { catalogReducer } from "./catalog.reducer.service"

describe("userReducer", () => {
  it("Should correctly reduce the seller array", () => {
    //Arrange
    const commonProperties = { id: "id", permalink: "https://example.com" }
    const sellers: Array<MLProduct> = [
      {
        ...commonProperties,
        price: 50,
        shipping: {
          logistic_type: LogisticType.correios,
        },
      },
      {
        ...commonProperties,
        price: 55,
        shipping: {
          logistic_type: LogisticType.coleta,
        },
      },
      {
        ...commonProperties,
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
      sumPrice: 165,
      bestPrice: 50,
      secondBestPrice: 55,
      firstPlacePrice: 50,
      bestPriceFull: 60,
      fullBestPosition: 2,
      length: 3,
      shipment: {
        full: 1,
        correios: 1,
        coleta: 1,
      },
    })
  })
})
