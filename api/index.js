import { Application } from "https://deno.land/x/oak/mod.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Welcome to WorkAttack Deno chat";
});

addEventListener("fetch", app.fetchEventHandler());
