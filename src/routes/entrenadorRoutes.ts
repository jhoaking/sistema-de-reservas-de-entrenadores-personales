import { Router } from "express";
import { entrenadorController } from "../controller/entrenadorController";
import { validateAuth } from "../middleware/authMiddleware";
import { permisionRoles } from "../middleware/validacionMiddleware";

export const routerEntrenador = Router();

routerEntrenador.get('/protected/:id',permisionRoles("entrenador"), validateAuth , entrenadorController.getCitasEntrenador);
routerEntrenador.put('/protected/:id',permisionRoles("entrenador"), validateAuth,entrenadorController.actualizarCitaEntrenador);

