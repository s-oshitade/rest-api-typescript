import {DataSource} from "typeorm";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: true,
    entities: [
        //Add the entities of data model here
    ],
    logging: true //Prints all SQL queries to the console
})