import { parse } from "regexparam";

class Route {
    constructor(method, path, handler) {
        const { keys, pattern } = parse(path);
        this.method = method.toUpperCase();
        this.path = path;
        this.handler = handler;
        this.keys = keys;
        this.pattern = pattern;
    }

    match(method, pathname) {
        if (this.method !== method.toUpperCase()) {
            return null;
        }
        const matches = this.pattern.exec(pathname);
        if (!matches) {
            return null;
        }
        const params = {};
        if (matches.groups) {
            Object.assign(params, matches.groups);
        }
        this.keys.forEach((key, i) => {
            params[key] = matches[i + 1];
        });
        return {
            handler: this.handler,
            params,
        };
    }
}

export class Router {
    constructor() {
        this.routes = [];
    }

    addRoute(method, path, handler) {
        if (typeof handler !== "function") {
            throw new Error(`Handler for route ${method} ${path} must be a function`);
        }
        const route = new Route(method, path, handler);
        this.routes.push(route);
        return this;
    }

    get(path, handler) {
        return this.addRoute("GET", path, handler);
    }

    post(path, handler) {
        return this.addRoute("POST", path, handler);
    }

    put(path, handler) {
        return this.addRoute("PUT", path, handler);
    }

    delete(path, handler) {
        return this.addRoute("DELETE", path, handler);
    }

    options(path, handler) {
        return this.addRoute("OPTIONS", path, handler);
    }

    head(path, handler) {
        return this.addRoute("HEAD", path, handler);
    }

    find(method, pathname) {
        for (const route of this.routes) {
            const match = route.match(method, pathname);
            if (match) {
                return match;
            }
        }
        return null;
    }
}
