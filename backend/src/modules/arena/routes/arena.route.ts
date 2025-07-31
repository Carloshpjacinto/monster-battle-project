import { Router } from "express";
import ArenaController from "../controller/arena.controller";

const arenaRouter = Router();
const arenaController = new ArenaController();

arenaRouter.post("/", arenaController.create);

arenaRouter.get("/", arenaController.findAll);

arenaRouter.get("/:id", arenaController.findById);

export default arenaRouter;
