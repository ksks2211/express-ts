import app from "./app";
import http from "http";
import path from "path";
import dotenv from "dotenv";

dotenv.config({ path: path.join(__dirname, ".env") });

function normalizePort(val: string) {
  const port = parseInt(val, 10);

  if (isNaN(port) || port <= 0) {
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
