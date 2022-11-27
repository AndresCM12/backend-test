import { Task, listOfTasks } from "./models/Task.model";
import express from "express";

const app: express.Application = require("express")();
const port: number = 3000;
app.use(express.json());

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

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
    id: getRandomInt(),
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

//Update task //Working
app.put("/task/update/:id", (req, res) => {
  const { id } = req.params;
  validateId(id, res);

  const body = req.body;
  validateBody(body, res);

  const taskFoundId = tasks.items.findIndex((task) => task.id + "" === id);
  if (taskFoundId === -1)
    return res.status(400).send("No se ha encontrado la tarea");

  const newTask = {
    id: tasks.items[taskFoundId].id,
    name: body.name,
    elapsed_time: body.elapsed_time,
    start_time: body.start_time,
    deleted: body.deleted,
    project_id: body.project_id,
  };
  tasks.items[taskFoundId] = newTask;
  res.status(200).send(tasks);
});

//Delete task by id //Working
app.delete("/task/delete/:id", (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(400).send("No se ha enviado el id");

  const taskFound = tasks.items.find((task) => task.id + "" === id);
  if (!taskFound) return res.status(400).send("No se ha encontrado la tarea");

  const taskFoundId = tasks.items.findIndex((task) => task.id + "" === id);
  tasks.items.splice(taskFoundId, 1);

  tasks.count = tasks.items.length;
  tasks.total = tasks.items.length;

  res.status(200).send(tasks);
});

//Utils
function initTasks() {
  let listOfTask: listOfTasks = {
    items: [
      {
        id: getRandomInt(),
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
}

const validateId = (id: string, res: any) => {
  if (!id) return res.status(400).send("No se ha enviado el id");
  if (isNaN(Number(id))) return res.status(400).send("El id no es un número");
};

const validateBody = (body: any, res: any) => {
  if (!body) {
    return res.status(400).send("No se ha enviado el body");
  }
  if (!body.name) {
    return res.status(400).send("Envíe el nombre de la tarea");
  } else if (!body.elapsed_time) {
    return res.status(400).send("Envíe el tiempo transcurrido");
  } else if (!body.start_time) {
    return res.status(400).send("Envíe la hora de inicio");
  } else if (body.deleted === undefined) {
    return res.status(400).send("Envíe el estado de eliminado");
  } else if (!body.project_id) {
    return res.status(400).send("Envíe el id del proyecto");
  }
};

function getRandomInt() {
  return Math.floor(Math.random() * Math.floor(100));
}
