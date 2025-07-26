import { Router } from "express";
import BattleController from "../controller/battle.controller";

const battleRouter = Router();
const battleController = new BattleController();

battleRouter.get("/:id", battleController.findById);

battleRouter.get("/start/:id", battleController.start);

battleRouter.post("/:id", battleController.create);

export default battleRouter;
