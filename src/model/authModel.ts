import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../db";
import { AuthType, EntrenadorType, RegisterAuthType } from "../types/auth";
import { RolModel } from "./controlRol-";


export class authModel {
  static register = async (
    data: RegisterAuthType
  ): Promise<AuthType | EntrenadorType> => {
    try {
      const { rol } = data;
      const rol_id = await RolModel.getRol(rol);

      const query =
        "INSERT INTO usuarios(nombre,email,password, rol_id) VALUES(?,?,?,?)";
      const values = [data.nombre, data.email, data.password, rol_id];
      const [rows] = await connection.query<ResultSetHeader>(query, values);

      const user = { user_id: rows.insertId, ...data } as AuthType;

      if (rol_id == 2 && data.años_de_experiencia && data.especialidad) {
        const queryEntrenador = `
                INSERT INTO entrenadores(user_id ,años_de_experiencia, descripcion , especialidad)
                VALUES (?,?,?,?)`;
        const entrenadorValues = [
          user.user_id,
          data.años_de_experiencia,
          data.descripcion,
          data.especialidad,
        ];

        console.log(
          "Inserción en entrenadores con los siguientes valores:",
          entrenadorValues
        );
        await connection.query<ResultSetHeader>(
          queryEntrenador,
          entrenadorValues
        );
        return {
          user,
          descripcion: data.descripcion,
          años_de_experiencia: data.años_de_experiencia,
          especialidad: data.especialidad,
        } as EntrenadorType;
      }

      return user;
    } catch (error: any) {
      throw new Error("eror al registrar en la db");
    }
  };

  static obtenerUserByEmail = async (
    email: string
  ): Promise<AuthType | null> => {
    try {
      const query = "SELECT * FROM usuarios  WHERE email = ?";
      const [rows] = await connection.query<RowDataPacket[]>(query, [email]);
      if (rows.length === 0) {
        return null;
      }
      return rows[0] as AuthType;
    } catch (error: any) {
      throw new Error("eror al obtener email  en la db");
    }
  };
}
