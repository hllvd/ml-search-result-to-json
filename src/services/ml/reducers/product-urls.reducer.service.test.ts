import { IsNull } from "typeorm"
import { ProductId } from "../../../models/dto/ml-product.models"
import { productIdsReducer } from "./product-urls.reducer.service"

describe("productReducer", () => {
  it("Should correctly reduce product ids to matrix of product ids", () => {
    //Arrange
    const productIds = Array(30)
      .fill(1)
      .map((_, i) => `product${i + 1}`)

    //Act
    const result = productIdsReducer(productIds)
    expect(result.length).toBe(2)
    expect(result[0].length).toBe(20)
    expect(result[1].length).toBe(10)

    // expect(result).toEqual([
    //   Array(25)
    //     .fill(1)
    //     .map((_, i) => `product${i + 1}`),
    //   ,
    //   Array(5)
    //     .fill(1)
    //     .map((_, i) => `product${i + 25 + 1}`),
    //   ,
    // ])
  })
})
