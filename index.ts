import 'reflect-metadata';

import express, { Request, Response, Express } from 'express';
import { Page } from './src/page';
import { Post } from './src/post';
import { User } from './src/user';
import { container } from './src/config/container';

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express application");
});

const pageClass = container.get<Page>(Page);

app.post("/create-page", (req: Request, res: Response) => {
  let post = pageClass.createPage('http://mypage.com');
  res.json(post);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

/**
 * Advantages of Dependency Injection
 * 1. DECOUPLING: DI helps in decoupling components and layers in an application
 * 2. Ease of Testing: With DI becomes straightforward to test classes by mocking their dependency
 * 3. Reusablity: Components & services designed to be injected can be reused across different parts of application.
 */