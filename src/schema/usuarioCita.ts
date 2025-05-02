import z from "zod";

const citaSchema = z.object({
  user_id: z.number().positive().int(),
  entrenador_id: z.number().positive().int(),
  fecha_cita: z.string(),
  hora_cita: z.string(),
  estado: z
    .enum(["pendiente", "aceptada", "cancelada", "terminada"])
    .default("pendiente"),
});

type CitaType = z.infer<typeof citaSchema>;

export const validateCita = (input: unknown): CitaType => {
  const vali = citaSchema.safeParse(input);
  if (!vali.success) {
    throw new Error("error al validar los datos");
  }
  return vali.data;
};
