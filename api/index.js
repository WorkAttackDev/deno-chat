import { Application, Router } from "https://deno.land/x/oak/mod.ts";
import { oakCors } from "https://deno.land/x/cors/mod.ts";

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
    try {
      const message = await context.response.body().value;
      messages.push(message);
      context.response.body = messages;
    } catch (error) {
      context.response.body = { error: error.message };
    }
  });

const app = new Application();

app.use(oakCors());
app.use(router.allowedMethods());
app.use(router.routes());

addEventListener("fetch", app.fetchEventHandler());
