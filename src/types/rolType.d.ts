type Roles = "usuario" |"entrenador";

export interface UserType {
  user_id: number;
  email: string;
  nombre: string;
  contraseña: string;
  fecha_creacion: Date;
  rol_id: Roles;
}
