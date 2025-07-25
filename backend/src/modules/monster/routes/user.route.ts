import { Router } from "express";
import MonsterController from "../controller/monster.controller";

const monsterRouter = Router();
const monsterController = new MonsterController();

monsterRouter.post("/", monsterController.create);

export default monsterRouter;
