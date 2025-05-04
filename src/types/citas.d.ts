enum Estado {
  PENDIENTE = "pendiente",
  ACEPTADA = "aceptada",
  CANCELADA = "cancelada",
  TERMINADA = "terminada",
}

export interface CitaTipes {
  user_id: number;
  entrenador_id: number;
  fecha_cita: string;
  hora_cita: string;
  estado: Estado;
}
export type EntrenadorType = {
  nombre: string;
  años_de_experiencia: number;
  descripcion: string;
  especialidad: string;
};

export type CreateCita = Pick< CitaTipes,
  "entrenador_id" | "fecha_cita" | "hora_cita" | "estado"
>;
