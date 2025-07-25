import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";

const dbport = Number(process.env.DB_PORT);

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: dbport,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [`./src/modules/**/entities/*.{ts,js}`],
  migrations: [`./src/database/migrations/*.{ts,js}`],
});
