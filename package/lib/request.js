export class RequestDecorator {
    decorate(req) {
        const rawUrl = req.url || "/";
        req.completeURL = req.originalUrl || rawUrl;

        const parsedUrl = new URL(rawUrl, "http://localhost");
        req.path = parsedUrl.pathname;

        const query = {};
        for (const [key, value] of parsedUrl.searchParams.entries()) {
            if (query[key] !== undefined) {
                if (Array.isArray(query[key])) {
                    query[key].push(value);
                } else {
                    query[key] = [query[key], value];
                }
            } else {
                query[key] = value;
            }
        }
        req.query = query;
        req.params = req.params || {};

        return req;
    }
}
