import {
  StateFieldSubType,
  StateFieldType,
} from "../../enums/state-field-type.enum"
import { StateFieldsRepositoryArguments } from "../../models/params/state-fields-repository.model"
import { CatalogReducerResponse } from "../../models/reducers/catalog-reducer.models"
import { stateInfoConverter } from "./state-info.converter"
const commonProperties: CatalogReducerResponse = {
  title: "product name",
  permalink: "https://example.com",
  length: 29,
  shipmentByState: {
    full: { "BR-SC": 1, "BR-SP": 4 },
    coleta: { "BR-SP": 10 },
    correios: { "BR-SP": 9, "BR-MG": 5 },
    others: null,
  },
  ean: "",
  domainId: "",
  tagsGoodQualityThumbnail: false,
  thumbnail: "",
  supermarketEligible: false,
  categoryId: "123",
  brandModel: {
    brand: "",
    model: "",
    color: "",
  },
  price: {
    top5Avg: 0,
    best: 0,
    secondBest: 0,
    full: 0,
  },
  position: {
    full: 0,
    medalGold: 0,
    medalPlatinum: 0,
    medalLider: 0,
    officialStore: 0,
  },
  mlOwner: false,
  priceList: [],
  dateCreated: "",
  medalByState: {
    medalLider: {},
    medalGold: {},
    medalPlatinum: {},
    noMedal: {},
  },
  state: {},
}
describe("Convert CatalogReducerResponse to StateField entity", () => {
  it("should convert shipmentByState to StateField equivalent", () => {
    //Arrange
    const data: CatalogReducerResponse = {
      ...commonProperties,
      shipmentByState: {
        full: { "BR-SC": 1, "BR-SP": 4 },
        coleta: { "BR-SC": 2, "BR-SP": 3 },
        correios: null,
        others: null,
      },
      medalByState: {
        medalLider: null,
        medalGold: null,
        medalPlatinum: null,
        noMedal: null,
      },
      length: 29,
    }

    const result: StateFieldsRepositoryArguments[] = [
      {
        productsCatalogsId: "123",
        productsCatalogsType: 1,
        state: "BR-SC",
        subType: StateFieldSubType.Full,
        type: StateFieldType.Shipment,
        value: 1,
      },
      {
        productsCatalogsId: "123",
        productsCatalogsType: 1,
        state: "BR-SP",
        subType: StateFieldSubType.Full,
        type: StateFieldType.Shipment,
        value: 4,
      },
      {
        productsCatalogsId: "123",
        productsCatalogsType: 1,
        state: "BR-SC",
        subType: StateFieldSubType.Coleta,
        type: StateFieldType.Shipment,
        value: 2,
      },
      {
        productsCatalogsId: "123",
        productsCatalogsType: 1,
        state: "BR-SP",
        subType: StateFieldSubType.Coleta,
        type: StateFieldType.Shipment,
        value: 3,
      },
    ]

    //Act
    const responseAssert = stateInfoConverter(data)

    //Assert
    expect(responseAssert).toEqual(result)
  })
})
