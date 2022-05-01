import mongoose from "mongoose"

export default () => {
  const mongoURI = process.env.MONGO_URI || ""
  mongoose
    .connect(mongoURI)
    .then(() => {
      console.log(`[i] Connected to database: ${mongoURI}`)
    })
    .catch((err) => {
      console.error(`Error: ${err.message}`)
      process.exit(1)
    })
}
