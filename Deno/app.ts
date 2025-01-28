import { Application } from "https://deno.land/x/oak/mod.ts";
import TodosRoutes from "./routes/todos.ts";

const app = new Application();

app.use(async (_, next) => {
  console.log("Middleware");
  await next();
});

app.use(TodosRoutes.routes());
app.use(TodosRoutes.allowedMethods());

await app.listen({ port: 3000 });
