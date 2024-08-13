import { Request, Response } from "express"
import { getMe } from "../services/ml/api/users"
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"
import { fetchMl } from "../services/ml/fetcher-api.ml.service"

const me = async (req: Request, res: Response) => {
  const userId = req.query?.userId?.toString() ?? "1334843159"
  const r = await getMe(userId)
  console.log("r", r)
  res.status(200).json({ ...r })
}

const test = async (req: Request, res: Response) => {
  const userId = req.query?.userId?.toString() ?? "1334843159"
  const options = {
    userId,
    method: "GET",
  }
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
  const r = await fetchMl("/items?ids=MLB19564320", options)
  res.status(200).json({ ...r })
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
