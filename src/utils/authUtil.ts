import bcrypt from 'bcrypt';
import jwt,{ JwtPayload } from 'jsonwebtoken';
import { SECRET_JWT_KEY,SALT_ROUNDS } from '../config';

export const hashedPassword = async (passwordUser: string): Promise<string> => {
  const hashed = await bcrypt.hash(passwordUser, Number(SALT_ROUNDS));
  return hashed;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
    const compare = await bcrypt.compare(password, hashedPassword);
    return compare;
};

export const createToken = (user: JwtPayload): string => {
  const token = jwt.sign(
    {
      user_id: user.user_id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    },
    SECRET_JWT_KEY,
    { expiresIn: "48h" }
  );
  return token;
};