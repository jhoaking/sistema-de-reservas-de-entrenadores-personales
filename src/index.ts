import { PORT } from "./config";
import express from "express";
import { routerAuth } from "./routes/authRoutes";
import { routerCita } from "./routes/citaUser";
import { routerEntrenador } from "./routes/entrenadorRoutes";
import { routerHistorial } from "./routes/historialRoutes";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/entrenador',routerEntrenador);
app.use("/user", routerAuth);
app.use('/cita', routerCita);
app.use('/historial',routerHistorial)

app.listen(PORT, () => {
  console.log("server on port ", PORT);
});
