import { Router } from "express";
import userRouter from "../modules/user/routes/user.route";
import monsterRouter from "../modules/monster/routes/user.route";

const routes = Router();

routes.use("/user", userRouter);

routes.use("/monster", monsterRouter);

export default routes;
