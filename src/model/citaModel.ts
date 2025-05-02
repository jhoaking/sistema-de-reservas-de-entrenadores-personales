import { RowDataPacket } from "mysql2";
import { connection } from "../db";
import { CitaTipes, CreateCita, EntrenadorType } from "../types/citas";

export class citaModel {
  static obtenerGeneral = async (): Promise<CitaTipes[]> => {
    try {
      const query = `SELECT  u.nombre , e.años_de_experiencia , e.descripcion , e.especialidad FROM entrenadores e
                            INNER JOIN usuarios u ON e.user_id = u.user_id;`;
      const [rows] = await connection.query(query);

      return rows as CitaTipes[];
    } catch (error: any) {
      console.error(error.message);
      throw new Error("error al obtener los entrenadores en la db");
    }
  };

  static obtenerPorCategoria = async (especialidad: string): Promise<EntrenadorType[]> => {
    try {
      const query = `SELECT u.nombre , e.años_de_experiencia , e.descripcion , e.especialidad FROM entrenadores e
                        INNER JOIN usuarios u ON e.user_id = u.user_id 
                        WHERE e.especialidad = ?;`;

      const [rows] = await  connection.query(query,[especialidad]);
      return rows as EntrenadorType[];
    } catch (error: any) {
      console.error(error.message);
      throw new Error(
        "error al obtener los entrenadores de categoria en la db"
      );
    }
  };

  

  static crearCitaPorProcedure = async (
    user_id: number,
    data: CreateCita
  ): Promise<CitaTipes> => {
    try {
      const query = "CALL sp_control_cita(?,?,?,?,@mensaje)";
      const values = [
        user_id,
        data.entrenador_id,
        data.hora_cita,
        data.fecha_cita,
      ];
      await connection.query(query, values);

      const [[{ mensaje }]] = await connection.query<RowDataPacket[]>(
        "SELECT @mensaje AS mensaje"
      );
      return mensaje;
    } catch (error: any) {
      console.error(error.message);
      throw new Error("error al crear la cita en la db");
    }
  };
}
