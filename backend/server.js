import express from "express";
import dotenv from "dotenv"
import { connectDB } from "./config/db.js";
import customerRoutes from "./routes/customer.route.js"
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://mern-customer-management.vercel.app/"
  ]
}));
app.use(express.json()); //allows us to accept JSON data from the req.body

app.use("/api/customers", customerRoutes)

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, "0.0.0.0", () => {
            console.log("Server started at localhost:" + PORT);
        });

    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

startServer();