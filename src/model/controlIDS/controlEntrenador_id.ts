
import { RowDataPacket } from "mysql2";
import { connection } from "../../db";

export class entrenadorRolModel {
  static async getRol(entrenadorName: string): Promise<number> {
    try {
      
      const query = `SELECT entrenador_id FROM entrenadores WHERE nombre = ?`;
      const [rows] = await connection.query<RowDataPacket[]>(query, [entrenadorName]);

      if (rows.length === 0) {
        throw new Error("entrenador no encontrado");
      }

      return rows[0].entrenador_id;
    } catch (error: any) {
      throw new Error(error.message || "Error al obtener el entrenador_id");
    }
  }
}   
