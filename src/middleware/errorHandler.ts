import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "./appError";

export const errorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Errores de validación con Zod
  if (err instanceof ZodError) {
    const errors = err.errors.map((e) => ({
      path: e.path.join("."),
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      errors,
    });
  }

  // Errores personalizados
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  // Error inesperado
  console.error("❌ Error inesperado:", err);
  return res.status(500).json({
    success: false,
    message: "Error interno del servidor",
  });
};

