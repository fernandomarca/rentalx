import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { CreateSpecificationController } from "../modules/cars/useCases/createSpecification/CreateSpecificationController";

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.post(
  "/",
  ensureAuthenticated,
  createSpecificationController.handle
);

export { specificationsRoutes };
