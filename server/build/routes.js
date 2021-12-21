"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function routes(app, io) {
    app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
}
exports.default = routes;
//# sourceMappingURL=routes.js.map