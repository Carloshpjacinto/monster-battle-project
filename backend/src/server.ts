import express, { Express } from "express";
import cors from "cors";
import { AppDataSource } from "./database/data.source";
import routes from "./routes";

const app: Express = express();

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
