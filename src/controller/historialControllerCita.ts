import { Request,Response } from "express";
import { historialModel } from "../model/historialEntrenador";
import { entrenadorModel } from "../model/enrenadorModel";

export class historialController {
    static obtenerTodoHistorial = async (req :Request ,res : Response):Promise<void>=>{
        const entrenadorAutenticado = req.user.user_id;
        try {

            const entrenador = await entrenadorModel.buscarEntrenadorById(entrenadorAutenticado);
            if(!entrenador){
                res.status(404).json({message : 'no e encontro el entrenador'});
                return;
            }

            const resut = await historialModel.obtenerTodoHistorial(entrenador.entrenador_id);
            res.status(200).json(resut)
        } catch (error:any) {
            console.error(error.message);
            res.status(500).json({message: 'error al obtener el historial'})
        }
    }
}