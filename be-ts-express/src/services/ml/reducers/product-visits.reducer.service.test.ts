import { ProductVisitsResponse } from "../../../models/api-response/product-views-response.models"
import { productVisitsReducer } from "./product-visits.reducer.service"

describe("Recuer Catalog visits", () => {
  it("Should correctly aggregate visits given an array of dates", () => {
    //Arrange
    const arrayOfDatesAndVisits: Array<ProductVisitsResponse> = [
      {
        item_id: "MLB4641831438",
        total_visits: 6,
        results: [
          {
            date: "2023-12-26T00:00:00Z",
            total: 1,
            visits_detail: [],
          },
          {
            date: "2023-12-27T00:00:00Z",
            total: 0,
            visits_detail: [],
          },
          {
            date: "2023-12-28T00:00:00Z",
            total: 5,
            visits_detail: [],
          },
          {
            date: "2023-12-29T00:00:00Z",
            total: 0,
            visits_detail: [],
          },
          {
            date: "2023-12-30T00:00:00Z",
            total: 0,
            visits_detail: [],
          },
        ],
      },
      {
        item_id: "MLB4287999270",
        total_visits: 4,
        results: [
          {
            date: "2023-12-26T00:00:00Z",
            total: 2,
            visits_detail: [],
          },
          {
            date: "2023-12-27T00:00:00Z",
            total: 2,
            visits_detail: [],
          },
          {
            date: "2023-12-28T00:00:00Z",
            total: 0,
            visits_detail: [],
          },
          {
            date: "2023-12-30T00:00:00Z",
            total: 0,
            visits_detail: [],
          },
        ],
      },
    ]
    //Act
    const result = productVisitsReducer(arrayOfDatesAndVisits)

    //Assert
    expect(result).toEqual({
      dates: {
        "2023-12-26": 3,
        "2023-12-27": 2,
        "2023-12-28": 5,
        "2023-12-29": 0,
        "2023-12-30": 0,
      },
      dailyAvg: 2,
      totalVisits: 10,
      visitsBySeller: [6, 4],
    })
  })
})
