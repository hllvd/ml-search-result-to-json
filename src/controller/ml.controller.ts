import { Request, Response } from "express"
import { getMe } from "../services/ml/api/me"
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs"

const me = async (req: Request, res: Response) => {
  const r = await getMe()
  console.log("r", r)
  res.status(200).json({ ...r })
}

const logSearchResult = async (req: Request, res: Response) => {
  console.log("here")
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

export default { logSearchResult, me, notification }
