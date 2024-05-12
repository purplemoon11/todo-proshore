import { Router } from "express";
import {
  createTasks,
  deleteTasks,
  getTasks,
  updateTasks,
} from "../controller/todo.controller";

const router = Router();

router.get("/todo", getTasks);
router.delete("/todo/:id", deleteTasks);
router.post("/createTodo", createTasks);
router.put("/tasks/:id", updateTasks);

export default router;
