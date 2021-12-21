import { Application } from 'express';
import { Server } from 'socket.io';

export default function routes(app: Application, io: Server): void {
  app.get('/', (req, res) => res.json({ message: 'Hello World!' }));
}
