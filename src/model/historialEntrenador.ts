import { connection } from "../db";
import { Accion, HistorialType } from "../types/historial";

export class historialModel {
  static obtenerTodoHistorial = async (
    entrenador_id: number
  ): Promise<HistorialType[]> => {
    const query = `SELECT * SELECT u.nombre , u.email,u.fecha_creacion,h.accion , h.fecha_accion FROM historial_citas h
                        INNER JOIN usuarios u ON h.user_id = u.user_id
                        WHERE h.entrenador_id = ?;FROM historial_citas WHERE entrenador_id = ?`;
    const [rows] = await connection.query(query, [entrenador_id]);
    return rows as HistorialType[];
  };

  static obtenerHistorialPorEstado = async (
    entrenador_id: number,
    accion: Accion
  ): Promise<HistorialType[]> => {
    const query = `SELECT u.nombre , u.email,u.fecha_creacion,h.accion , h.fecha_accion FROM historial_citas h
                        INNER JOIN usuarios u ON h.user_id = u.user_id
                        WHERE h.entrenador_id = ? AND h.accion = ?;`;
    const values = [entrenador_id, accion];
    const [rows] = await connection.query(query, values);
    return rows as HistorialType[];
  };

  static obtenerHistorialPorFecha = async (
    entrenador_id: number,
    fecha_accion: Date
  ): Promise<HistorialType[]> => {
    const query = `SELECT u.nombre , u.email,u.fecha_creacion,h.accion , h.fecha_accion FROM historial_citas h
                    INNER JOIN usuarios u ON h.user_id = u.user_id
                    WHERE h.entrenador_id = ? AND h.fecha_accion = ?;`;
    const vallues = [entrenador_id,fecha_accion];
    const [rows] = await connection.query(query,vallues);
    return rows as HistorialType[]
  };
}
