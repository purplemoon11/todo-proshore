import axios from "axios";

export const getTodo = async (filterTask) => {
  const getTodo = await axios.get(
    `http://localhost:5000/api/v1/todo?filterTasks=${filterTask}`
  );
  console.log(getTodo, filterTask);
  return getTodo;
};

export const deleteTask = async (taskId) => {
  const deleteTodo = await axios.delete(
    `http://localhost:5000/api/v1/todo/${taskId}`
  );
  return deleteTodo;
};

export const createTodo = async (taskData) => {
  console.log(taskData);
  const createTask = await axios.post(
    `http://localhost:5000/api/v1/createTodo`,
    taskData
  );
  return createTask;
};
