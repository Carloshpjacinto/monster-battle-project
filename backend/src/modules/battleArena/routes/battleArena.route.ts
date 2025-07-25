import { Router } from "express";
import BattleArenaController from "../controller/battleArena.controller";

const battleArenaRouter = Router();
const battleArenaController = new BattleArenaController();

battleArenaRouter.post("/", battleArenaController.create);

export default battleArenaRouter;
