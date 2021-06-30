addEventListener("fetch", (event) => {
  const response = new Response("Welcome to WorkAttack Deno chat", {
    headers: { "content-type": "text/plain" },
  });
  event.respondWith(response);
});
