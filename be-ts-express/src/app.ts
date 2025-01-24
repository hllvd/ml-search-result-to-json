import express from "express"
import routes from "./routes/index.route"
import "reflect-metadata"
import cors from "cors"
import { persistentMiddleware } from "./middlewares/persistent.middleware"
import dataSource from "./db/data-source"
import { entityFromDbMiddleware } from "./middlewares/entity-from-db.middleware"
import { WorkerManagerService } from "./worker/services/worker-manager.service"

// Create an instance of the Express application
const app = express()
const port = process.env.PORT || 3333

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Get Entity From DB
//app.use(entityFromDbMiddleware)

// Routes
app.use("/", routes)
//app.post("/notification", notificationController.notification) d
// Persistent middleware
app.use(persistentMiddleware)
// Get Entity From DB
app.use(entityFromDbMiddleware)
// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})

const workerManager = new WorkerManagerService()

// Start workers
workerManager.startWorker({
  id: "emailWorker",
  jobServiceType: "email",
  batchSize: 5,
  delay: 2000,
  workerFunction: "exampleWorker",
})
workerManager.startWorker({
  id: "reportWorker",
  jobServiceType: "report",
  batchSize: 3,
  delay: 3000,
  workerFunction: "exampleWorker",
})

// List active workers
console.log("Active workers:", workerManager.getWorkerIds())

// Stop all workers after 10 seconds
setTimeout(() => {
  workerManager.stopAllWorkers()
  console.log("All workers stopped.")
}, 15000)

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
