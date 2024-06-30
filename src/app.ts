import express from "express"

import routes from "./routes"
import "reflect-metadata"

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(encodeValidation)

app.use("/", routes)

function encodeValidation(
  req: express.Request,
  _res: express.Response,
  next: express.NextFunction
) {
  const contentType = req.get("content-type")
  const isPost = req.method === "POST"
  if (isPost && !contentType?.includes("application/json"))
    throw "Content-Type must be application/json"

  next()
}

app.listen(3000, () => {
  console.log(`Example app listening on port ${3000}`)
})
