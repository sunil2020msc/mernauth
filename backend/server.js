import express from "express";
import dotenv from "dotenv"
import cookieParser from "cookie-parser";
import path from "path"

import userRouter from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cookieParser());

app.use("/api/users", userRouter)

if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    app.use(express.static(path.join(__dirname, "build")))
    app.get("*", (req, res, next) => {
        res.sendFile(path.resolve(__dirname, 'build', 'index.html'))
    })
}
else {
    app.get("/", (req, res) => res.send("server running"))
}

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`server started at port ${port}`)
})