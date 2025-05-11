import { Request, Response } from "express";
import { historialModel } from "../model/historialEntrenador";
import { entrenadorModel } from "../model/enrenadorModel";
import { Accion } from "../types/historial";
import { catchAsync } from "../middleware/catchAsync";

export class historialController {
  static obtenerTodoHistorial = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const entrenadorAutenticado = req.user.user_id;
        const entrenador = await entrenadorModel.buscarEntrenadorById(
          entrenadorAutenticado
        );
        if (!entrenador) {
          res.status(404).json({ message: "no se encontro el entrenador" });
          return;
        }

        const resut = await historialModel.obtenerTodoHistorial(
          entrenador.entrenador_id
        );
        res.status(200).json(resut);
    }
  );

  static obtenerHistorialPorEstado = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const entrenadorAutenticado = req.user.user_id;
      const { accion } = req.query;
        const entrenador = await entrenadorModel.buscarEntrenadorById(
          entrenadorAutenticado
        );
        if (!entrenador) {
          res.status(404).json({ message: "no se encontro el entrenador" });
          return;
        }
        const result = await historialModel.obtenerHistorialPorEstado(
          entrenador.entrenador_id,
          accion as Accion
        );
        res.status(200).json(result)
    }
  );
}
