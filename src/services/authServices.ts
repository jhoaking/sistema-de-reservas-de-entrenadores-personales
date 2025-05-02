import { SALT_ROUNDS, SECRET_JWT_KEY } from "../config";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { AuthType } from "../types/auth";

export const hashedPassword = async (passwordUser: string): Promise<string> => {
  const hashed = await bcrypt.hash(passwordUser, Number(SALT_ROUNDS));
  return hashed;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
  } catch (error: any) {
    console.error(error);
    throw new Error("error al comparar contraseñas");
  }
};

export const createToken = (user: AuthType): string => {
  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol_id,
    },
    SECRET_JWT_KEY,
    { expiresIn: "48h" }
  );
  return token;
};

export const verifyToken = (token: string): string | JwtPayload => {
  try {
    const verify = jwt.verify(token, SECRET_JWT_KEY);
    return verify;
  } catch (error: any) {
    throw new Error("erorr al hashear la password");
  }
};
