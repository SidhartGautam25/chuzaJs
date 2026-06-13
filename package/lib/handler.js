export class RequestHandler {
    constructor(server) {
        this.server = server;
    }

    handle(req, res) {
        try {
            this.server.requestDecorator.decorate(req);
            this.server.responseDecorator.decorate(res);
            const match = this.server.router.find(req.method, req.path);

            if (match) {
                req.params = match.params;
                Promise.resolve(match.handler(req, res)).catch((err) => {
                    this.server.error(err, req, res);
                });
            } else {
                this.server.noMatches(req, res);
            }
        } catch (err) {
            this.server.error(err, req, res);
        }
    }
}
