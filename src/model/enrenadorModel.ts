import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../db";
import { EntrenadorType, Estado } from "../types/citas";
import { log } from "console";

export class entrenadorModel {
  static obtenerTodasCitasEntrenador = async (
    entrenador_id: number
  ): Promise<EntrenadorType[]> => {
    try {
      const query = `SELECT u.nombre , c.fecha_cita , c.hora_cita , c.estado  FROM citas c
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
    cita_id: number
  ): Promise<{ mensaje: string } | null> => {
    try {
      console.log('cita_id' , cita_id);
      console.log('entrenador_id' , entrenador_id);
      console.log('estado' , estado);
      
      
      const [rows] = await connection.query<RowDataPacket[]>(
        'SELECT * FROM citas WHERE cita_id = ? AND entrenador_id = ? AND estado = "pendiente"',
        [cita_id, entrenador_id]
      );
      console.log('Cita encontrada:', rows);
      if (rows.length === 0) {
        return { mensaje: "No se encontró una cita pendiente" };
      }

      
      await connection.query("UPDATE citas SET estado = ? WHERE cita_id = ?", [
        estado,
        cita_id,
      ]);

      return { mensaje: "Cita actualizada" };
    } catch (error: any) {
      throw new Error("error al actualizar las citas de los usuarios");
    }
  };

  static buscarEntrenadorById = async (user_id: number) => {
    console.log("entrenador token", user_id);

    const query = "SELECT * FROM entrenadores WHERE user_id = ?";
    const [rows] = await connection.query<RowDataPacket[]>(query, [user_id]);
    if (rows.length === 0) {
      return null;
    }
    return rows[0];
  };
}
