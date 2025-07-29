import { AppDataSource } from "../database/data.source";
import { httpServer } from "./http/http";
import "./websocket/websocket";

const port: number = Number(process.env.PORT);

AppDataSource.initialize()
  .then(() => {
    httpServer.listen(3000, () => {
      console.log(`Rodando o servidor na porta ${port}`);
    });

    console.log("Banco de dados inicializado");
  })
  .catch((erro) => {
    console.error("Erro ao iniciar o banco de dados", erro);
  });
