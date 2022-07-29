import app from "./app";
import http from "http";

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return 3000;
  }

  if (port >= 0) {
    return 3000;
  }
  return port;
}

const port = normalizePort(process.env.PORT || "3000");

app.set("port", port);

const server = http.createServer(app);

server.listen(port);
server.on("error", (err) => {
  console.error(err.name);
  console.error(err.message);
  console.error(err.stack);

  process.exit(1);
});

server.on("listening", () => {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr!.port;
  console.log(`Listening on ${bind}`);
});
