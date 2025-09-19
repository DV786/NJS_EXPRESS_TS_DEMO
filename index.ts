import 'reflect-metadata';
import express, { Request, Response, Express } from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors';
import { addRoutes } from './src/config/routes.config';
import { responseFormatter } from './src/middleware/responseFormatter.middleware';

dotenv.config();
const app: Express = express();
const port = process.env.PORT;
/** 
  let corsOptions: CorsOptions = {
    origin: 'http://example.com'
  }; 
*/
app.use(cors());
app.use(express.json());

app.use(responseFormatter);
addRoutes(app);

async function bootstrap() {
  try {
    if (!process.env.DATABASE_URL) {
      throw new Error('Cannot read environment variable');
      process.exit(1);
    }

    await mongoose.connect(
      process.env.DATABASE_URL, { dbName: process.env.DATABASE_NAME }
    );
    console.log("Connected To MongoDB", port);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

bootstrap()
