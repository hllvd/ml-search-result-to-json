import { Request, Response } from "express"
import { getMe } from "../services/ml/api/users"
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"
import { fetchMl } from "../services/ml/fetcher-api.ml.service"
import dataSource from "../db/data-source"
import { StateFields } from "../entities/sql/state-fields.entity"
import { ProductsCatalogs } from "../entities/sql/products-catalogs.entity"
import { EntityType } from "../enums/entity-type.enum"
import {
  StateFieldType,
  StateFieldSubType,
} from "../enums/state-field-type.enum"
import searchPersistence from "../services/persistence/search.persistence"
import searchSummaryFieldsPersistence from "../services/persistence/search-summary-fields.persistence"
import { Search } from "../entities/sql/search.entity"
import { SearchSummaryFieldsType } from "../enums/search-summary-fields-types.enum"

const me = async (req: Request, res: Response) => {
  const userId = req.query?.userId?.toString() ?? "1334843159"
  const r = await getMe(userId)
  console.log("r", r)
  res.status(200).json({ ...r })
}

const test = async (req: Request, res: Response) => {
  const userId = req.query?.userId?.toString() ?? "1334843159"
  const searchTerm = req.query?.searchTerm?.toString() ?? ""
  const options = {
    userId,
    method: "GET",
  }
  const search = new Search()
  search.categoryId = "Este é o teste4512"
  search.searchTerm = searchTerm
  search.url = "https://test2"
  const r = await searchPersistence.upsert(search)
  //const r = await searchPersistence.get(searchTerm)

  const r2 = await searchSummaryFieldsPersistence.upsert({
    searchType: SearchSummaryFieldsType.AvgPrice,
    valueNum: 11,
    valueStr: "jjjj",
    search: r,
    id: 3,
  })

  //const r2 = await searchSummaryFieldsPersistence.get()
  res.status(200).json({ test: "hello world", r2 })
  // const r = await fetchMl(
  //   "/sites/MLB/search?category_id=item_id:MLB3584941189",
  //   options
  // )
  /** cat MLB29373206
   * MLB2627784031
   * MLB1018500853
   * document.querySelectorAll(".ui-pdp-action--secondary").forEach(e => { console.log(e.getAttribute('formaction'))})
   */
  //const r = await fetchMl("/sites/MLB/search?q=celular", options)
  // await stateFieldsRepository([
  //   {
  //     type: StateFieldType.Shipment,
  //     subType: StateFieldSubType.Coleta,
  //     state: "BR-zz",
  //     value: 11,
  //     productsCatalogsId: "MLB19564311",
  //     productsCatalogsType: EntityType.Catalog,
  //   },
  //   {
  //     type: StateFieldType.Shipment,
  //     subType: StateFieldSubType.Coleta,
  //     state: "BR-zq",
  //     value: 12,
  //     productsCatalogsId: "MLB19564311",
  //     productsCatalogsType: EntityType.Catalog,
  //   },
  //   {
  //     type: StateFieldType.Shipment,
  //     subType: StateFieldSubType.Coleta,
  //     state: "BR-ww",
  //     value: 14,
  //     productsCatalogsId: "MLB19564311",
  //     productsCatalogsType: EntityType.Catalog,
  //   },
  // ])
  /**
   * {
    type: StateFieldType.Medal,
    state: "PR-SP",
    value: 2,
    productsCatalogsId: "MLB19564320",
    productsCatalogsType: EntityType.catalog,
  }
   */
  //const r = await fetchMl("/items?ids=MLB19564320", options)
}

const logSearchResult = async (req: Request, res: Response) => {
  const r = "ok"
  res.status(200).json({ r })
}

const notification = async (req: Request, res: Response) => {
  const sqsClient = new SQSClient({ region: "sa-east-1" })

  const queueUrl =
    "https://sqs.sa-east-1.amazonaws.com/797163826126/ml-notifications"
  const messageBody = "Hello from TypeScript!"

  const input = {
    QueueUrl: queueUrl,
    MessageBody: messageBody,
  }

  const command = new SendMessageCommand(input)

  try {
    const response = await sqsClient.send(command)
    console.log("Message sent successfully:", response.MessageId)
    res.status(200).json({ message: "Message sent successfully" })
  } catch (error) {
    console.error("Error sending message:", error)
    res.status(500).json({ error: "Error sending message" })
  }
}

export default { logSearchResult, me, notification, test }
