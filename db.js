import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useBewUrlParser: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Successfully connected to MONGO"))
  .catch(() => console.error(e));

const db = mongoose.connection;

const handlOpen = () => console.log("Connectde to MongoDB");
const handlError = () => console.log("Error to MongoDB");

db.once("open", handlOpen);
db.on("error", handlError);
