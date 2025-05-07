import { Router } from "express";
import { historialController } from "../controller/historialControllerCita";
import { validateAuth } from "../middleware/authMiddleware";

export const routerHistorial = Router();

routerHistorial.get('/protected', validateAuth , historialController.obtenerTodoHistorial); 
routerHistorial.get('/estado', validateAuth , historialController.obtenerHistorialPorEstado); 

