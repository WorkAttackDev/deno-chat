import { h, IS_BROWSER, useState, useEffect, useCallback } from "../deps.ts";

interface Message {
  text: string;
}

export default function Home() {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);

  const getMessages = useCallback(async () => {
    const res = await fetch("https://wa-chat-api.deno.dev/messages");
    const data = res.json();

    setMessages(data);
  }, []);

  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit = useCallback(
    async (e: Event) => {
      e.preventDefault();
      if (!text) return;
      const res = await fetch("https://wa-chat-api.deno.dev/messages", {
        method: "POST",
        body: JSON.stringify({ text }),
        headers: [["content-type", "application/json"]],
      });

      setMessages(res);
    },
    [text]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setText(e.target.value)} />
        <button>Enviar</button>
      </form>

      {JSON.stringify(messages)}
    </div>
  );
}
