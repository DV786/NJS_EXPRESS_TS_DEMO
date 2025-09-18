import 'reflect-metadata';
import express, { Request, Response, Express } from 'express';
import { addRoutes } from './src/config/routes.config';

const app: Express = express();
const port = 3001;

addRoutes(app);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
