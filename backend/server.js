import express from "express";
import authRoutes from "./routes/auth.routes.js";
import dotend from "dotenv";
import connectMongoDB from "./db/connectMongoDB.js";

const app = express();
dotend.config();
const PORT = process.env.PORT || 5000;

console.log(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is runnning on port ${PORT}`);
  connectMongoDB();
});
