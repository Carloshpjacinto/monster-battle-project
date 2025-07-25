import express, { Express } from "express";
import { WebSocketServer } from "ws";
import cors from "cors";
import { AppDataSource } from "./database/data.source";
import routes from "./routes";

const app: Express = express();

const wss = new WebSocketServer({ port: 8080 });

app.use(express.json());
app.use(cors());
app.use(routes);

const port: number = Number(process.env.PORT);

AppDataSource.initialize()
  .then(() => {
    app.listen(3000, () => {
      console.log(`Rodando o servidor na porta ${port}`);
    });

    console.log("Banco de dados inicializado");
  })
  .catch((erro) => {
    console.error("Erro ao iniciar o banco de dados", erro);
  });


wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  const interval = setInterval(() => {
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(Date.now().toString());
    }
  }, 3000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Conexão encerrada.");
  });

  ws.on("message", function message(data) {
    const receivedTime = Number(data.toString())
    console.log(`Round-trip time: ${Date.now() - receivedTime} ms`);
  });
});
