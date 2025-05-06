enum Accion {
    creada = 'creada',
    aceptada = 'aceptada',
    cancelada = 'cancelada',
    terminada = 'terminada'
}

export interface HistorialType{
    historial_id : number,
    cita_id : number,
    user_id : number,
    entrenador_id : number,
    accion : Accion,
    fecha_accion : Date
}