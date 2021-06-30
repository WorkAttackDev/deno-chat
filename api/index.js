import { Application, Router } from "https://deno.land/x/oak/mod.ts";

const messages = [];

const router = new Router();
router
  .get("/", (context) => {
    context.response.body = "WorkAttack chat app!";
  })
  .get("/messages", (context) => {
    context.response.body = messages;
  })
  .post("/messages", async (context) => {
    const message = await context.response.body().value;
    messages.push(message);
    context.response.body = messages;
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());

addEventListener("fetch", app.fetchEventHandler());
