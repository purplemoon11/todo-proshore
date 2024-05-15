import { Router } from "express";
import {
  createTasks,
  deleteTasks,
  getTaskById,
  getTasks,
  updateTasks,
} from "../controller/todo.controller";

const router = Router();

router.get("/todo", getTasks);
router.delete("/todo/:id", deleteTasks);
router.post("/createTodo", createTasks);
router.put("/tasks/:id", updateTasks);
router.get("/todo/:id", getTaskById);

export default router;
