import { Router } from "express";
import { authController } from "../controller/authController";
import { validateAuth } from "../middleware/authMiddleware";

export const routerAuth = Router();

routerAuth.post("/login", authController.login);
routerAuth.post("/register", authController.register);
routerAuth.get("/protected", validateAuth, authController.protectedUser);
routerAuth.get("/logout", authController.logout);
