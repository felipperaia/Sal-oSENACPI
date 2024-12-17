import { Application } from "express";
import generoRoutes from "./categoria.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/SalaoBelezasenac", generoRoutes);
  }
}