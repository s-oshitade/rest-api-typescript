import {DataSource} from "typeorm";
import {Course} from "./models/course";
import {Lesson} from "./models/lesson";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    ssl: true,
    extra: { //This is heroku-specific
      ssl: {
          rejectUnauthorized: false
      }
    },
    entities: [
        //Add the entities of data model here
        Course,
        Lesson
    ],
    synchronize: true, //Only set this property to true in development mode
    logging: true //Prints all SQL queries to the console
})