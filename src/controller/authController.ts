import { Request, Response, CookieOptions } from "express";
import { authModel } from "../model/authModel";
import {
  createToken,
  hashedPassword,
  comparePassword,
} from "../services/authServices";
import { validateRegister, validateLogin } from "../schema/authSchema";
import { AuthType, RegisterAuthType } from "../types/auth";
import { catchAsync } from "../middleware/catchAsync";

export class authController {
  static register = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const vali = validateRegister(req.body);

        const buscarEmail = await authModel.obtenerUserByEmail(vali.email);
        if (buscarEmail) {
          res.status(400).json({ message: "ya estas registrado" });
          return;
        }
        const hashearContra = await hashedPassword(vali.password);

        const user = await authModel.register({
          nombre: vali.nombre,
          email: vali.email,
          password: hashearContra,
          rol_id: vali.rol,
          años_de_experiencia: vali.años_de_experiencia,
          especialidad: vali.especialidad,
          descripcion: vali.descripcion,
        } as RegisterAuthType);

        res.status(200).json({ message: "registrado con exito", user });
    }
  );

  static login = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
        const vali = validateLogin(req.body);
        const user = await authModel.obtenerUserByEmail(vali.email);
        if (!user) {
          res.status(400).json({ message: "el email no esta registrado" });
          return;
        }

        const validarPassword = await comparePassword(
          vali.password,
          user.password
        );
        if (!validarPassword) {
          res.status(400).json({ message: "contraseña invalida" });
          return;
        }

        const token = createToken(user);
        const options: CookieOptions = {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 48,
        };

        res
          .status(201)
          .cookie("access_token", token, options)
          .json({ message: "login exitoso" });
    }
  );

  static protectedUser = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const user = req.user as AuthType;

      if (!user) {
        res.status(401).json({ message: "usuario no autorizado" });
        return;
      }
      res.status(200).json({ message: " usuario autorizado", user });
    }
  );

  static logout = catchAsync(
    async (_req: Request, res: Response): Promise<void> => {
      res
        .clearCookie("access_token", { httpOnly: true, sameSite: "strict" })
        .status(200)
        .json({ message: "Logout exitoso" });
    }
  );
}
