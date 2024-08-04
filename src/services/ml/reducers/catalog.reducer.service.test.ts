import { LogisticType, MLProduct } from "../../../models/dto/ml-product.models"
import { catalogReducer } from "./catalog.reducer"

describe("userReducer", () => {
  it("Should correctly reduce the seller array", () => {
    //Arrange
    const commonProperties = { id: "id", permalink: "https://example.com" }
    const sellers: Array<MLProduct> = [
      {
        ...commonProperties,
        price: 50,
      },
      {
        ...commonProperties,
        price: 55,
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
      firstPlace: 50,
      bestPriceFull: 60,
      fullBestPosition: 2,
      length: 3,
    })
  })
})
