import express from "express";
import cors from "cors";
import helmet from "helmet";
import { env } from "./config/env.js"
import type { Request, Response } from "express";
import { firebaseAuth } from "./infrastructure/firebase/firebase-admin.js";
import { authMiddleware } from "./presentation/http/middlewares/auth.middleware.js";
 
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.get("/me", authMiddleware, (req: Request, res: Response) => {
    res.json({ user: req.user });
})

app.get("/health", (_req: Request, res: Response) => {
    res.json({ status: "ok", firebaseInitialized: !!firebaseAuth})
});

app.listen(env.port, () => {
    console.log(`🚀 Firebase CRUD API Server is running on port ${env.port}`);
})