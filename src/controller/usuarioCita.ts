import { citaModel } from "../model/citaModel";
import { Request, Response } from "express";
import { validateCita } from "../schema/usuarioCita";
import { CitaTipes } from "../types/citas";

export class citaUserController {
  static obtenerEntrenadores = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    const result = await citaModel.obtenerGeneral();
    res.status(200).json(result);
  };

  static obtenerPorCategoria = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { especialidad } = req.query;
    if (typeof especialidad !== "string") {
      res.status(400).json({ message: "La especialidad  debe ser un string" });
      return;
    }
    try {
      const result = await citaModel.obtenerPorCategoria(especialidad);
      res.status(200).json(result);
    } catch (error: any) {
        console.error(error);
      res.status(500).json({ message: " error al obtener por query" });
    }
  };

  static crearCita = async (req: Request, res: Response): Promise<void> => {
    const user = req.user;
    console.log('user', user);
    
    try {
      const vali = validateCita(req.body);
  
      const createCita = await citaModel.crearCitaPorProcedure(
        user.user_id, {
        entrenador_id: vali.entrenador_id,
        hora_cita: vali.hora_cita,
        fecha_cita: vali.fecha_cita,
      } as CitaTipes);

      
         
      res.status(201).json(createCita);
    } catch (error: any) {
        console.error(error);
      res.status(500).json({ message: "error al crear la cita" });
    }
  };
}
