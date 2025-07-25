import { Router } from "express";
import UserController from "../controller/player.controller";

const playerRouter = Router();
const playerController = new UserController();

playerRouter.post("/", playerController.create);

export default playerRouter;
