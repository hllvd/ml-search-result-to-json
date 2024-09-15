import express from "express"
import routes from "./routes/index.route"
import "reflect-metadata"
import cors from "cors"
import { persistentMiddleware } from "./middlewares/persistent.middleware"
import dataSource from "./db/data-source"

// Create an instance of the Express application
const app = express()
const port = process.env.PORT || 3333

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use("/", routes)
//app.post("/notification", notificationController.notification)

// Persistent middleware
app.use(persistentMiddleware)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})

// Start the server
app.listen(port, async () => {
  try {
    await dataSource.initialize()
    console.log("Data source has been initialized.")
    console.log(`Server is running on port ${port}`)
  } catch (error) {
    console.error("Error during data source initialization:", error)
  }
})
