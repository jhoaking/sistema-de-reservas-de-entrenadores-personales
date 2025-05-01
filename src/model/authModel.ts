import { ResultSetHeader, RowDataPacket } from "mysql2";
import { connection } from "../db";
import { AuthTypes, EntrenadorType, RegisterAuthType } from "../types/auth";

export class authModel {
  static register = async (
    data: RegisterAuthType
  ): Promise<AuthTypes | EntrenadorType> => {
    try {
      const query =
        "INSERT INTO usuarios(nombre,email,password,fecha_creacion, rol_id) VALUES(?,?,?,?,?)";
      const values = [data.nombre, data.email, data.password, data.rol_id];
      const [rows] = await connection.query<ResultSetHeader>(query, values);

      const user = { user_id: rows.insertId, ...data } as AuthTypes;

      if (data.rol_id == 2 && data.años_de_experiencia && data.especialidad) {
        const queryEntrenador = `
                INSERT INTO entrenadores(user_id , años_de_experiencia, descripcion , especialidad)
                VALUES (?,?,?,?)`;
        const entrenadorValues = [
          user.user_id,
          data.años_de_experiencia,
          data.descripcion,
          data.especialidad,
        ];
        await connection.query<ResultSetHeader>(
          queryEntrenador,
          entrenadorValues
        );
        return {
          user,
          años_de_experiencia: data.años_de_experiencia,
          expecialidad: data.especialidad,
        } as EntrenadorType;
      }

      return user;
    } catch (error: any) {
      throw new Error("eror al registrar en la db");
    }
  };


  static obtenerUserByEmail = async (email : string):Promise<AuthTypes | EntrenadorType | null> =>{
      try {
        const query = 'SELECT * FROM usuarios  WHERE email = ?';
        const [rows] = await connection.query<RowDataPacket[]>(query,[email]);
        if(rows.length === 0){
          return null;
        }
        return rows[0] as AuthTypes | EntrenadorType | null;
      } catch (error:any) {
        throw new Error("eror al obtener email  en la db");
      }
  }
}
