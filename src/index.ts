import chalk from "chalk";
import express from "express";
import axios from "axios";
import fs from 'fs';
import path from "path";
import favicon from "serve-favicon";
import { orange, Route } from "../util/util.js";
import { URL } from 'url';

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;
let port: number | string = fs.readFileSync(path.resolve(__dirname, '..')+'/website.settings', {encoding: 'utf-8'}).split('\n').find(j=>j.startsWith('port')).split('=')[1];
port = parseInt(port);

const app = express();

app.use(express.json());
app.use(express.static(path.join(path.resolve(__dirname, '..'), "public")));
app.use(express.urlencoded());
app.use(favicon(__dirname + '/../images/favicon.ico'));
const routes: Map<string, Route> = new Map<string, Route>();
fs.readdirSync(__dirname+'/../routes').filter(f=>f.endsWith('.ts')).forEach(async j=>{
    const data: Route = (await import(__dirname + '../routes/'+j))?.default;
    routes.set(data?.path, data);
    app[data.type](data.path, data.method);
    console.log(chalk.bold(orange(data.type), 'route created at', chalk.bold.blue(data.path)));
});


app.listen(port).on('request', (req) => {
    console.log(chalk.bold(orange(req.method)) + chalk.bold.white(' at', chalk.bold.yellow(req.url), 'by', chalk.bold.blue(req.socket.remoteAddress)));
    
});