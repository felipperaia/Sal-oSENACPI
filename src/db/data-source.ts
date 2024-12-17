import "reflect-metadata"
import { DataSource } from "typeorm"
import { config, dialect } from "../config/db.config"
import { Categoria } from "../models/categoria"

export const AppDataSource = new DataSource({
    type: dialect,
    host: config.HOST,
    port: config.PORT,
    username: config.USER,
    password: config.PASSWORD,
    database: config.DB,
    entities: [Categoria],
    synchronize: false,
    logging: false,
})

