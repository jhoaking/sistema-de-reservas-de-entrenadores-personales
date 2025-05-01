import { PORT } from "./config";
import express from 'express';
import { routerAuth } from "./routes/authRoutes";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/user',routerAuth);


app.listen(PORT , () =>{
    console.log('server on port ',PORT);
})
