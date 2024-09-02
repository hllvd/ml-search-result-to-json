import express from "express"
import routes from "./routes/index.route"
import "reflect-metadata"
import cors from "cors"

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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something went wrong!")
})

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
