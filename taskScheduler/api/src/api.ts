import express, { Express, Request, Response } from "express";
import bodyParser from "body-parser";
import {
  addCategory,
  addTask,
  getCategories,
  getTask,
  getTasks,
  updateTask,
  getCategory,
  deleteTask,
} from "./sqlite";
import cors from "cors";

export class Api {
  private app: Express;

  constructor() {}

  startApi = () => {
    this.app = express();
    this.app.use(bodyParser.json());
    this.app.use(cors());
    this.createRoutes();
    this.app.listen(1337, () => {
      console.log("api started");
    });
  };

  createRoutes = () => {
    this.app.get("/", (request: Request, response: Response) => {
      response.send("Hello world");
    });
    this.app.post("/tasks", (request: Request, response: Response) => {
      addTask(request.body);
      response.sendStatus(200);
    });
    this.app.get("/tasks", (request: Request, response: Response) => {
      getTasks().then((rows) => {
        response.send(rows);
      });
    });

    this.app.get("/tasks/:id", (request: Request, response: Response) => {
      getTask(+request.params.id).then((rows) => {
        response.send(rows);
      });
    });
    this.app.delete("/tasks/:id", (request: Request, response: Response) => {
      deleteTask(+request.params.id);
      response.sendStatus(200);
    });
    this.app.put("/tasks/:id", (request: Request, response: Response) => {
      updateTask(request.body);
      response.sendStatus(200);
    });

    this.app.get("/categories", (request: Request, response: Response) => {
      getCategories().then((rows) => {
        response.send(rows);
      });
    });
    this.app.get("/category/:cat", (request: Request, response: Response) => {
      getCategory(request.params.cat).then((rows) => {
        response.send(rows);
      });
    });

    this.app.post("/categories", (request: Request, response: Response) => {
      addCategory(request.body).then((data) => {
        response.send(data);
      });
    });
  };
}
