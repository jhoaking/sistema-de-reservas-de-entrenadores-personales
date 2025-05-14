import { Router } from "express";
import { historialController } from "../controller/historialControllerCita";
import { validateAuth } from "../middleware/authMiddleware";
import { permisionRoles } from "../middleware/validacionMiddleware";

export const routerHistorial = Router();

routerHistorial.get('/protected',permisionRoles("entrenador"), validateAuth , historialController.obtenerTodoHistorial); 
routerHistorial.get('/estado', permisionRoles("entrenador"),validateAuth , historialController.obtenerHistorialPorEstado); 

