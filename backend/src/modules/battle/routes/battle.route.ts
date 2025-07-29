import { Router } from "express";
import BattleController from "../controller/battle.controller";

const battleRouter = Router();
const battleController = new BattleController();

battleRouter.get("/:id", battleController.findById);

battleRouter.post("/:id", battleController.create);

battleRouter.patch("/:id", battleController.update);

export default battleRouter;
