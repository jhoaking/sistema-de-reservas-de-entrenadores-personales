import { z } from "zod";

export const registerUserSchema = z.object({
  nombre: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  email: z.string().min(1, { message: "El campo email es obligatorio" }).email({ message: "Revisa el formato del email" }),
  password: z.string().min(6, { message: "La contraseña debe tener entre 6 y 20 caracteres" }).max(20, { message: "La contraseña debe tener entre 6 y 20 caracteres" }),
  rol_id: z.enum(["1", "2"]).transform(val => Number(val)).default("1"),
  años_de_experiencia: z.string().min(1).optional(),
  especialidad: z.enum(["aparatos", "cardio"]).optional(),
});

export type registerUserType = z.infer<typeof registerUserSchema>;

export const validateRegister = (input: unknown): registerUserType => {
  const vali = registerUserSchema.safeParse(input);
  if (!vali.success) {
    throw new Error("error al validar los datos");
  }
  return vali.data;
};


const LoginSchema = z.object({
  email: z.string().email("Email no válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export type LoginType = z.infer<typeof LoginSchema>;

export const validateLogin = (input: unknown): LoginType => {
  return LoginSchema.parse(input);
};


