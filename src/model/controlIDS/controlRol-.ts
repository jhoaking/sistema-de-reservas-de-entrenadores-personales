
import { RowDataPacket } from "mysql2";
import { connection } from "../../db";

export class RolModel {
  static async getRol(rolName: string): Promise<number> {
    try {
      
      const query = `SELECT rol_id FROM roles WHERE nombre = ?`;
      const [rows] = await connection.query<RowDataPacket[]>(query, [rolName]);

      if (rows.length === 0) {
        throw new Error("Rol no encontrado");
      }

      return rows[0].rol_id;
    } catch (error: any) {
      throw new Error(error.message || "Error al obtener el rol_id");
    }
  }
}   
