import { Router } from "express";
import MonsterController from "../controller/monster.controller";

const monsterRouter = Router();
const monsterController = new MonsterController();

monsterRouter.post("/", monsterController.create);

monsterRouter.get("/", monsterController.findAll);

monsterRouter.get("/:id", monsterController.findById);

export default monsterRouter;
