import { z } from "zod";

export const registerUserSchema = z.object({
  nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().min(1, { message: "El campo email es obligatorio" }).email({ message: "Revisa el formato del email" }),
  password: z.string().min(4, { message: "La contraseña debe tener entre 4 y 12 caracteres" }).max(20, { message: "La contraseña debe tener entre 4 y 20 caracteres" }),
  rol: z.enum(["usuario", "entrenador"]).optional().default("usuario"),
  años_de_experiencia: z.string().min(1).optional(),
  especialidad: z.enum(["aparatos", "cardio"]).optional(),
});


const LoginSchema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const validateLogin = (input: unknown): LoginType => {
  return LoginSchema.parse(input);
};



export type registerUserSchema = z.infer<typeof registerUserSchema>;

export const validateRegister = (input: unknown): registerUserSchema => {
  const vali = registerUserSchema.safeParse(input);
  if (!vali.success) {
    const errorMessages = vali.error.errors.map((e) => e.message).join(", ");
    throw new Error(errorMessages);
  }
  return vali.data;
};