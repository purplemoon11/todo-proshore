import { Request, Response, NextFunction } from "express";
import { Todo } from "../entity/todo.entity";
import { AppDataSource } from "../configs/database";
import { TodoStatus } from "../constants/enums";
import { TodoRequestBody } from "../constants/interface";
import { todoValidator } from "../validators/todo.validator";

const todoRepository = AppDataSource.getRepository(Todo);

/**
 *
 * @param req
 * @param res
 * @param next
 */

export const getTasks = async (
  req: Request<TodoRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { filterTasks } = req.query;
    let todos;
    if (filterTasks === TodoStatus.Upcoming) {
      todos = await todoRepository.find({
        where: { status: TodoStatus.Upcoming },
      });
    } else if (filterTasks === TodoStatus.Done) {
      todos = await todoRepository.find({ where: { status: TodoStatus.Done } });
    } else {
      todos = await todoRepository.find();
    }
    if (!todos) {
      throw new Error("Could not fetch data !!!");
    }
    res.status(200).json({
      message: "Todo lists fetched successfully !!!",
      result: todos,
    });
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */

export const deleteTasks = async (
  req: Request<TodoRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskId = +req.params.id;
    const deleteTask = await todoRepository.findOne({ where: { id: taskId } });

    if (!deleteTask) {
      throw new Error("Task not found");
    }

    const result = await todoRepository.remove(deleteTask);
    res.status(200).json({ message: "Task deleted successfully !!!", result });
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */

export const createTasks = async (
  req: Request<TodoRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { error, value } = validateTodoRequestBody(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { name, shortDescription, dateAndTime, status } = value;

    const todo = new Todo();
    todo.name = name;
    todo.shortDescription = shortDescription;
    todo.dateAndTime = dateAndTime;
    todo.status = status;

    const savedTodo = await todoRepository.save(todo);
    if (!savedTodo) {
      throw new Error("Sorry something went wrong !!!");
    }
    res
      .status(200)
      .json({ message: "Todo list created successfully !!!", savedTodo });
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param req
 * @param res
 * @param next
 */

export const updateTasks = async (
  req: Request<TodoRequestBody>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const taskId = +req.params.id;
    const { error, value } = validateTodoRequestBody(req.body);

    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { name, shortDescription, dateAndTime, status } = value;

    const updateTask = await todoRepository.findOne({ where: { id: taskId } });

    if (!updateTask) {
      throw new Error("Task not found !!!");
    }

    updateTask.name = name;
    updateTask.shortDescription = shortDescription;
    updateTask.dateAndTime = dateAndTime;
    updateTask.status = status;

    const result = await todoRepository.save(updateTask);

    res.status(200).json({ message: "Task updated successfully !!!", result });
  } catch (error) {
    throw error;
  }
};

function validateTodoRequestBody(data: any) {
  return todoValidator.validate(data);
}
