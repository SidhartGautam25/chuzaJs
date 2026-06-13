import http from "http";
import { Router } from "./router.js";
import { RequestDecorator } from "./request.js";
import { ResponseDecorator } from "./response.js";
import { RequestHandler } from "./handler.js";
import { nothingMatches, errorOccured } from "./utils/defaults.js";

export class BachaServer {
    constructor(opts = {}) {
        this.noMatches = opts.noMatches || nothingMatches;
        this.error = opts.error || errorOccured;
        this.router = new Router();
        this.requestDecorator = new RequestDecorator();
        this.responseDecorator = new ResponseDecorator();
        this.handler = new RequestHandler(this);
        this._initializeMethods();
    }

    _initializeMethods() {
        const methods = ["get", "post", "put", "delete", "options", "head"];
        methods.forEach((method) => {
            this[method] = (path, handler) => {
                this.router.addRoute(method.toUpperCase(), path, handler);
                return this;
            };
        });
    }

    runServerOn(port, callback) {
        if (!this.server) {
            this.server = http.createServer((req, res) => {
                this.handler.handle(req, res);
            });
        }

        this.server.listen(port, callback);
        return this;
    }
}
