import { citaModel } from "../model/citaModel";
import { NextFunction, Request, Response } from "express";
import { validateCita } from "../schema/usuarioCita";
import { CitaTipes } from "../types/citas";
import { catchAsync } from "../middleware/catchAsync";

export class citaUserController {
  static obtenerTodaCitaUser = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const user = req.user.user_id;
      const result = await citaModel.obtenerCitasUsuario(user);
      res.status(200).json(result);
    }
  );

  static obtenerEntrenadores = catchAsync(
    async (
      _req: Request,
      res: Response,
      _next: NextFunction
    ): Promise<void> => {
      const result = await citaModel.obtenerGeneral();
      res.status(200).json(result);
    }
  );

  static obtenerPorCategoria = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const { especialidad } = req.query;
      if (typeof especialidad !== "string") {
        res
          .status(400)
          .json({ message: "La especialidad  debe ser un string" });
        return;
      }
      const result = await citaModel.obtenerPorCategoria(especialidad);
      res.status(200).json(result);
    }
  );

  static crearCita = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const user = req.user;
      const vali = validateCita(req.body);

      const createCita = await citaModel.crearCitaPorProcedure(user.user_id, {
        entrenador_id: vali.entrenador_id,
        hora_cita: vali.hora_cita,
        fecha_cita: vali.fecha_cita,
      } as CitaTipes);
      res.status(201).json(createCita);
    }
  );

  static actualizarEstadoCita = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const user = req.user.user_id;
      const cita_id = +req.params.id;
      const result = await citaModel.actualizarEstadoCita(cita_id, user);
      res.status(200).json(result);
    }
  );
}
