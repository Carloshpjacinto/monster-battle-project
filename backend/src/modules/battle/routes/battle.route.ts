import { Router } from "express";
import BattleController from "../controller/battle.controller";

const battleRouter = Router();
const battleController = new BattleController();

battleRouter.post("/", battleController.create);

export default battleRouter;
