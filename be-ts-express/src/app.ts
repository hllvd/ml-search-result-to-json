import express from "express"
import routes from "./routes/index.route"
import "reflect-metadata"
import https from "https"
import fs from "fs"
import path from "path"
import cors from "cors"

var env = process.env.NODE_ENV || "development"
// Load your SSL certificate and private key
// Install https local certificate https://support.apple.com/en-gb/guide/keychain-access/kyca2431/mac
const privateKey = fs.readFileSync(
  path.join(__dirname, "..", "ssl", "localhost-server.key"),
  "utf8"
)
const certificate = fs.readFileSync(
  path.join(__dirname, "..", "ssl", "localhost-server.crt"),
  "utf8"
)

const credentials =
  env == "development"
    ? {
        key: privateKey,
        cert: certificate,
      }
    : null

const app = express()

const httpsServer = https.createServer(credentials, app)
app.use(cors())
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

httpsServer.listen(3333, () => {
  console.log(`Example app listening on port ${3333}`)
})
