import * as Dotenv from 'dotenv';
import "reflect-metadata"; // this shim is required
import { createExpressServer } from "routing-controllers";
import RastreioController from './controller/rastreioController';

Dotenv.config();

const app = createExpressServer({
  controllers: [RastreioController]
});

app.listen(8080);