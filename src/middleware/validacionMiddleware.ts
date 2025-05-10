import { UserType } from "../types/rolType";
import { NextFunction, Request, Response } from "express";

export const permisionRoles = (...rolesPermitidos: string[]) => {
  return (
    req: Request & { user?: UserType },
    res: Response,
    next: NextFunction
  ) => {
    const userRol = req.user?.rol;
    if (!userRol || !rolesPermitidos.includes(userRol)) {
      res
        .status(403)
        .json({ message: "No tienes permisos para acceder a esta ruta" });
    }
    next();
  };
};
