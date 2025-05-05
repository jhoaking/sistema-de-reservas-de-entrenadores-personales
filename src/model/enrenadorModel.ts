import { ResultSetHeader } from "mysql2";
import { connection } from "../db";
import { EntrenadorType, Estado } from "../types/citas";

export class entrenadorModel {
  static obtenerTodasCitasEntrenador = async (
    entrenador_id: number
  ): Promise<EntrenadorType[]> => {
    try {
      const query = `SELECT u.nombre , c.fecha_cita , c.hora_cita  FROM citas c
                            INNER JOIN usuarios u ON c.user_id = u.user_id
                            WHERE c.entrenador_id = ?;`;

      const [rows] = await connection.query(query, [entrenador_id]);
      return rows as EntrenadorType[];
    } catch (error: any) {
      throw new Error("error al obtener las citas de los usuarios");
    }
  };

  static actualizarEstadoCita = async (
    entrenador_id: number,
    estado: Estado,
    user_id: number
  ): Promise<{ mensaje: string } | null> => {
    try {
      const query = `UPDATE citas SET estado = ?  WHERE entrenador_id = ? AND user_id = ? AND estado = 'pendiente';`;
      const values = [estado,entrenador_id,user_id];
      const [rows] = await connection.query<ResultSetHeader>(query,values);

      if(rows.affectedRows === 0){
        return { mensaje: "No se encontró una cita pendiente con esos datos" };
      }

      return { mensaje: `Cita ${estado} correctamente` };
    } catch (error: any) {
      throw new Error("error al actualizar las citas de los usuarios");
    }
  };
}
