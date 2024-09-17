import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "././routes/authRoute.js"
import taskRoutes from "././routes/taskRoute.js"
dotenv.config();
const app = express();
connectDB();

app.use(express.json());

// Use imported routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on: ${PORT}`);
});
