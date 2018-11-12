import * as Dotenv from 'dotenv';
import * as path from 'path';
import * as express from 'express';
import "reflect-metadata"; // this shim is required
import { createExpressServer } from "routing-controllers";
import RastreioController from './controller/rastreioController';

Dotenv.config();

const app = createExpressServer({
  controllers: [RastreioController]
});

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.set('views', path.join(__dirname, 'views'));

app.listen(8080);