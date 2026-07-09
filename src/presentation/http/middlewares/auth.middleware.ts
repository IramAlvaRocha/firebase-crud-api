import { firebaseAuth } from "@/infrastructure/firebase/firebase-admin.js";
import type { NextFunction, Request, Response } from "express";

export async function authMiddleware(
    req: Request, 
    res: Response, 
    next: NextFunction
) : Promise<void> {
    const authHeader = req.headers.authorization;

    if(!authHeader?.startsWith('Bearer ')){
        res.status(401).json({
            error: "Missing or invalid Authorization header"
        })
        return;
    }

    const idToken = authHeader.split('Bearer ')[1];

    if(!idToken) {
        res.status(401).json({
            error: "Token not provided"
        });
        return;
    }

    try {
        const decodedToken = await firebaseAuth.verifyIdToken(idToken);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error("Token validation failed:", error);
        res.status(401).json({
            error: "Invalid token or expired token"
        });
        return;
    }
}