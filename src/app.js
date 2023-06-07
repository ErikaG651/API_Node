import express from "express"
import indexRoutes from "./routes/index.routes.js";

const app = express();
app.use(express.json());  //Para procesar datos en formato json
app.use(indexRoutes);   

export default app;