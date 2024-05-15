import axios from "axios";

export const getTodo = async (filterTask) => {
  const getTodo = await axios.get(
    `http://localhost:5000/api/v1/todo?filterTasks=${filterTask}`
  );
  return getTodo;
};

export const deleteTask = async (taskId) => {
  const deleteTodo = await axios.delete(
    `http://localhost:5000/api/v1/todo/${taskId}`
  );
  return deleteTodo;
};

export const createTodo = async (taskData) => {
  const createTask = await axios.post(
    `http://localhost:5000/api/v1/createTodo`,
    taskData
  );
  return createTask;
};

export const updateTodo = async (taskData, taskId) => {
  console.log(taskData);
  const updateTask = await axios.put(
    `http://localhost:5000/api/v1/tasks/${taskId}`,
    taskData
  );
  return updateTask;
};
