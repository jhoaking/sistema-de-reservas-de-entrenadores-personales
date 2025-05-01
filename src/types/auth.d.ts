enum especialidad {'aparatos' , 'cardio'}

export interface AuthType{
    user_id : number,
    nombre : string,
    email : string,
    password : string,
    fecha_creacion : string ,
    rol_id : number
}

export interface EntrenadorType{
    user : AuthType,
    años_de_experiencia : string,
    descripcion : string,
    especialidad  :especialidad
}

export type RegisterAuthType = Pick<AuthType , 'nombre'|'email'| 'password' | 'fecha_creacion'| 'rol_id'> & 
{
descripcion ?: string ;
años_de_experiencia?: string;
especialidad?: especialidad;}