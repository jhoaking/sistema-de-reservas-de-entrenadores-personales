import { Request, Response, NextFunction, CookieOptions } from "express";
import { authService } from "../services/authServices";
import { validateRegister, validateLogin } from "../schema/authSchema";
import { catchAsync } from "../middleware/catchAsync";
import { AuthType, RegisterAuthType } from "../types/auth";
import { hashedPassword } from "../utils/authUtil";

export class authController {
  static register = catchAsync(
    async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
      const vali = validateRegister(req.body);

      const hashearContra = await hashedPassword(vali.password);

      const user = await authService.register({
        nombre: vali.nombre,
        email: vali.email,
        password: hashearContra,
        rol: vali.rol,
        descripcion: vali.descripcion,
        años_de_experiencia: vali.años_de_experiencia,
        especialidad: vali.especialidad,
      } as RegisterAuthType);

      res.status(200).json({ message: "registrado con exito", user });
    }
  );

  static login = catchAsync(
    async (req: Request, res: Response): Promise<void> => {
      const vali = validateLogin(req.body);

      const token = await authService.loginUser(vali.email, vali.password);
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
