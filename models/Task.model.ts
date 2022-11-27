interface Task {
  id: number;
  name: string;
  elapsed_time: number;
  start_time: number;
  deleted: boolean;
  project_id: number;
}

interface listOfTasks {
  items: Task[];
  count: number;
  total: number;
}

//Export the models
export { Task, listOfTasks };
