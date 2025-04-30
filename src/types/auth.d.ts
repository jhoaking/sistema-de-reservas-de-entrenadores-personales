enum especialidad {'aparatos' , 'cardio'}

export interface AuthTypes{
    user_id : number,
    nombre : string,
    email : string,
    password : string,
    fecha_creacion : string ,
    rol_id : number
}

export interface EntrenadorType{
    user : AuthTypes,
    años_de_experiencia : string,
    descripcion : string,
    expecialidad  :especialidad
}

export type RegisterAuthType = Pick<AuthTypes , 'nombre'|'email'| 'password' | 'fecha_creacion'| 'rol_id'> & 
{descripcion ?: string ;
años_de_experiencia?: string;
especialidad?: especialidad;}