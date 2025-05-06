import { Router } from "express";
import { entrenadorController } from "../controller/entrenadorController";
import { validateAuth } from "../middleware/authMiddleware";

export const routerEntrenador = Router();

routerEntrenador.get('/protected/:id', validateAuth , entrenadorController.getCitasEntrenador);
routerEntrenador.put('/protected/:id',validateAuth,entrenadorController.actualizarCitaEntrenador);

