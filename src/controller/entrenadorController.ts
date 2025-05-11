import { entrenadorModel } from "../model/enrenadorModel";
import { Request, Response, NextFunction } from "express";
import { valiCita } from "../schema/entrenadorSchema";
import { Estado } from "../types/citas";
import { catchAsync } from "../middleware/catchAsync";

export class entrenadorController {
  static getCitasEntrenador = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const entrenador = +req.params.id;
      const result = await entrenadorModel.obtenerTodasCitasEntrenador(
        entrenador
      );
      res.status(200).json(result);
    }
  );

  static actualizarCitaEntrenador = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const entrenadorId = +req.params.id;
      const entrenadorAutenticado = req.user.user_id;
      const entrenador = await entrenadorModel.buscarEntrenadorById(
        entrenadorAutenticado
      );
      if (!entrenador || entrenador.entrenador_id !== entrenadorId) {
        res
          .status(403)
          .json({ message: "No puedes modificar citas de otro entrenador" });
        return;
      }
      try {
        const vali = valiCita(req.body);
        const result = await entrenadorModel.actualizarEstadoCita(
          entrenador.entrenador_id,
          vali.estado as Estado,
          vali.cita_id
        );
        res
          .status(200)
          .json({ message: "se actualizo la cita con exito", result });
      } catch (error: any) {
        console.error(error.message);
        res
          .status(500)
          .json({ message: "error al actualizar el estado de la cita" });
      }
    }
  );
}
