import { Router } from "express";
import CategoriaController from "../controllers/categoria.controller";

class CategoriaRoutes {
  router = Router();
  controller = new CategoriaController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {

    this.router.post("/categoria", this.controller.create);

    this.router.get("/categorias", this.controller.findAll);

    this.router.get("/categoria/:id", this.controller.findOne);

    this.router.get("/categoria/nome/:nome", this.controller.findName);

    this.router.put("/categoria/:id", this.controller.update);

    this.router.delete("/categoria/:id", this.controller.delete);

    this.router.delete("/categorias/", this.controller.deleteAll);
  }
}

export default new CategoriaRoutes().router;
