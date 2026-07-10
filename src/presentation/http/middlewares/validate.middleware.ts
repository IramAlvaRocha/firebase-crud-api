import { ValidationError } from "@/domain/errors/app-error.js";
import type { NextFunction, Request, Response } from "express";
import type { ZodType } from "zod";

export function validate(schema: ZodType) { 

    return (req: Request, _res: Response, next: NextFunction): void => {
        //Resultado de la validación de los datos del body, si es exitoso, se asigna a req.body, si no, se devuelve un error de validación.
        const result = schema.safeParse(req.body);

        //Si la validación no es exitosa, se devuelve un error de validación.
        if(!result.success) {
            const message = result.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join(", ");
            next(new ValidationError(message));
            return;
        }

        //Si la validación es exitosa, se asigna a req.body.
        //RESULTA.DATA contiene los datos validados.
        req.body = result.data;
        next();
    }

}