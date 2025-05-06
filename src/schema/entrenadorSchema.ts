import z from 'zod';

const entrenadorSchema = z.object({
  años_de_experiencia : z.string(),
  descripcion : z.string().min(1, {message :'debes dar informacion de ti '}),
  especialidad : z.enum(['aparatos' , 'cardio']),
  user_id : z.number().positive().int()
});

type EntrenadorTypes = z.infer<typeof entrenadorSchema>;

export const valiEntrenador = (input: unknown): EntrenadorTypes => {
  const vali = entrenadorSchema.safeParse(input);
  if (!vali.success) {
    throw new Error("error al validar los datos");
  }
  return vali.data;
};
     

const citaEstadoSchema = z.object({
  user_id : z.number().positive().int(),
  estado: z.enum(['aceptada', 'cancelada'])
});

type CitaType = z.infer<typeof citaEstadoSchema>;

export const valiCita = (input: unknown): CitaType => {
  const vali = citaEstadoSchema.safeParse(input);
  if (!vali.success) {
    throw new Error("error al validar los datos");
  }
  return vali.data;
};