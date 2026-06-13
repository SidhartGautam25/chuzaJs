import { BachaServer } from "./lib/server.js";

export function createServer(opts = {}) {
  return new BachaServer(opts);
}

export { BachaServer };
