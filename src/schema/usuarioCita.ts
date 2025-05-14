import z from "zod";

const citaSchema = z.object({
  entrenador: z.string().min(1 ,{message : "el nombre del entrenador debe tener 1 caracter al menos"}),
  fecha_cita: z.string(),
  hora_cita: z.string(),
});

type CitaType = z.infer<typeof citaSchema>;

export const validateCita = (input: unknown): CitaType => {
  const vali = citaSchema.safeParse(input);
  if (!vali.success) {
    throw new Error("error al validar los datos");
  }
  return vali.data;
};
     