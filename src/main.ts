import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js"
import type { Request, Response } from "express";
 
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok"})
});

app.listen(env.port, () => {
    console.log(`🚀 Firebase CRUD API Server is running on port ${env.port}`);
})