import { DataSource } from "typeorm";
import { Todo } from "../entity/todo.entity";
import env from "../configs/env";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.dbHost,
  port: Number(env.dbPort),
  username: env.dbUserName,
  password: env.dbPassword,
  database: env.dbName,
  synchronize: false,
  logging: false,
  entities: [Todo],
});
