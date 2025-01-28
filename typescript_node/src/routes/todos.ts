import { Router } from "express";
import { Todo } from "../models/todo";

const router = Router();

let todos: Array<Todo> = [];

router.get("/todo", (req, res, next) => {
  res.status(200).json(todos);
});

router.post("/todo", (req, res, next) => {
  const body = req.body as { text: string };

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: body.text,
  };

  todos.push(newTodo);

  res.json(201).json({ message: "Added a todo.", todo: newTodo });
});

router.post("/todo/:todoId", (req, res, next) => {
  const body = req.body as { text: string };
  const params = req.params as { todoId: string };
  const tid = params.todoId;

  const todoIndex = todos.findIndex((todo) => todo.id === tid);
  if (todoIndex >= 0) {
    todos[todoIndex] = {
      id: todos[todoIndex].id,
      text: body.text,
    };

    res
      .status(200)
      .json({ message: "Updated the todo.", todo: todos[todoIndex] });

    return;
  }

  res.status(404).json({ message: "Could not find a todo with given id." });
});

router.delete("/todo/:todoId", (req, res, next) => {
  const params = req.params as { todoId: string };
  const tid = params.todoId;

  todos = todos.filter((todo) => todo.id !== tid);

  res.status(200).json({ message: "Todo removed." });
});

export default router;
