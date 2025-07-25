import { Router } from "express";
import playerRouter from "../modules/player/routes/player.route";
import monsterRouter from "../modules/monster/routes/user.route";
import arenaRouter from "../modules/arena/routes/arena.route";
import battleRouter from "../modules/battle/routes/battle.route";

const routes = Router();

routes.use("/player", playerRouter);

routes.use("/monster", monsterRouter);

routes.use("/arena", arenaRouter);

routes.use("/battle", battleRouter);

export default routes;
