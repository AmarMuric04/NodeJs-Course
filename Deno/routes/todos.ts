import { Router } from "https://deno.land/x/oak/mod.ts";
import { Todo } from "../models/todos.ts";

const router = new Router();

let todos: Array<Todo> = [];

router.get("/todos", (ctx) => {
  ctx.response.body = { todos };
});

router.post("/todos", async (ctx) => {
  const data = await ctx.request.body({ type: "json" }).value;

  const newTodo: Todo = {
    id: new Date().toISOString(),
    text: data.text,
  };

  todos.push(newTodo);

  ctx.response.body = { message: "Created todo!", todo: newTodo };
});

router.put("/todos/:todoId", async (ctx) => {
  const data = await ctx.request.body().value;
  const tid = ctx.params.todoId;

  const todoIndex = todos.findIndex((todo) => todo.id === tid);
  todos[todoIndex] = { id: todos[todoIndex].id, text: data.text };

  if (todoIndex < 0) {
    ctx.response.body = { message: "Could not find todo for this id." };
  } else {
    ctx.response.body = { message: "Updated todo!" };
  }
});

router.delete("/todos", (ctx) => {
  ctx.response.body = "Hello World!";
});

export default router;
