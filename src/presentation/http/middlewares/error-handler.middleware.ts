import { AppError } from "@/domain/errors/app-error.js";
import type { NextFunction, Request, Response } from "express";

export function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction,
) : void {

    if( error instanceof AppError ) {
        res.status(error.statusCode).json({ error: error.message });
        return;
    }

    console.error("Unexpected error:", error);
    res.status(500).json({ error: "Internal server error" });
} 