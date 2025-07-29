import express, { Express } from "express";
import cors from "cors";
import routes from "../../routes";
import { Server } from "socket.io";
import { createServer } from "http";

const app: Express = express();
const httpServer = createServer(app);

app.use(express.json());
app.use(cors());
app.use(routes);

const io = new Server(httpServer);

export { httpServer, io };
