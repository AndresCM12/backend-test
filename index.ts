import { Task, listOfTasks } from "./models/Task.model";
import express from "express";

const app: express.Application = require("express")();
const port: number = 3000;
app.use(express.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const initTasks = () => {
  let listOfTask: listOfTasks = {
    items: [
      {
        id: 1,
        name: "Correr en el parque",
        elapsed_time: 20,
        start_time: 1622253787,
        deleted: false,
        project_id: 1,
      },
    ] as Task[],
    count: 1,
    total: 1,
  };
  return listOfTask;
};

const tasks = initTasks();

app.get("/", (req, res) => {
  res.status(200).sendFile(__dirname + "/static/index.html");
});

//GET all tasks //Working
app.get("/task", (req, res) => {
  res.status(200).send(tasks);
});

//ADD Task //Working
app.post("/task/create", (req, res) => {
  const body = req.body;
  validateBody(body, res);

  const newTask = {
    id: tasks.items.length + 1,
    name: body.name,
    elapsed_time: body.elapsed_time,
    start_time: body.start_time,
    deleted: body.deleted,
    project_id: body.project_id,
  };

  tasks.items.push(newTask);

  tasks.count = tasks.items.length;
  tasks.total = tasks.items.length;

  res.status(201).send(tasks);
});

//Find task by id //Working
app.get("/task/:id", (req, res) => {
  const { id } = req.params;
  validateId(id, res);

  const taskFound = tasks.items.find((task) => task.id + "" === id);
  if (!taskFound) return res.status(404).send("No se ha encontrado la tarea");

  res.status(200).send(taskFound);
});

//Update task //Check if it works
app.put("/task/update/:id", (req, res) => {
  const { id } = req.params;
  const { task } = req.body;

  validateId(id, res);
  validateBody(task, res);

  const taskFound = tasks.items.findIndex((task) => task.id + "" === id);
  if (!taskFound) return res.status(400).send("No se ha encontrado la tarea");

  const newTask = {
    id: tasks.items.length + 1,
    name: task.name,
    elapsed_time: task.elapsed_time,
    start_time: task.start_time,
    deleted: task.deleted,
    project_id: task.project_id,
  };
  tasks.items[taskFound] = newTask;
  res.status(200).send(tasks);
});

//Delete task by id //Check if it works
app.delete("/task/delete/:id", (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send("No se ha enviado el id");

  const taskFound = tasks.items.find((task) => task.id + "" === id);
  if (!taskFound) return res.status(400).send("No se ha encontrado la tarea");

  const taskDeleted = tasks.items.filter((task) => task.id + "" !== id);

  res.status(200).send(taskDeleted);
});

//Utils
const validateId = (id: string, res: any) => {
  if (!id) return res.status(400).send("No se ha enviado el id");
  if (isNaN(Number(id))) return res.status(400).send("El id no es un número");
};

const validateBody = (body: any, res: any) => {
  if (!body) return res.status(400).send("No se ha enviado el body");
  if (
    !body.name ||
    !body.elapsed_time ||
    !body.start_time ||
    !body.project_id
  ) {
    return res.status(400).send("Envíe todos los campos requeridos");
  }
};
