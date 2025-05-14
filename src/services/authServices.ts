import {
  BadRequestError,
  UnauthorizedError,
  NotFoundError,
} from "../Error/errorRequests";
import { authModel } from "../model/authModel";
import { comparePassword, createToken } from "../utils/authUtil";
import { JwtPayload } from "jsonwebtoken";
import { RegisterAuthType } from "../types/auth";

export class authService {
  static loginUser = async (
    email: string,
    password: string
  ): Promise<string> => {
    const user = await authModel.obtenerUserByEmail(email);
    if (!user) {
      throw new NotFoundError("Email no encontrado");
    }

    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedError("Contraseña incorrecta");
    }

    const payload: JwtPayload = {
      user_id: user.user_id,
      email: user.email,
      nombre: user.nombre,
      rol: user.rol,
    };

    const token = createToken(payload);
    return token;
  };

  static register = async (validateData: RegisterAuthType) => {
    const email = await authModel.obtenerUserByEmail(validateData.email);
    if (email) {
      throw new BadRequestError(
        "Este email ya fue registrado, intente con otro"
      );
    }

    const newUser = authModel.register(validateData);
    return newUser;
  };
}
