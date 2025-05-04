import { Router } from "express";
import { citaUserController } from "../controller/usuarioCita";
import { validateAuth } from "../middleware/authMiddleware";

export const routerCita = Router();

routerCita.get('/protected', validateAuth , citaUserController.obtenerTodaCitaUser);
routerCita.get("/", validateAuth ,citaUserController.obtenerEntrenadores);
routerCita.get("/entrenadores", validateAuth ,citaUserController.obtenerPorCategoria);
routerCita.post("/", validateAuth, citaUserController.crearCita);

