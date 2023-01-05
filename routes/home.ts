import { Request, Response } from "express";
import path from "path";
import { Route, RouteType } from "../util/util.js";

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

export class TestRoute implements Route {
    path: string = '/'; type: RouteType = 'get';
    method(req: Request, res: Response) {
        res.status(200).sendFile(path.resolve(__dirname, '..')+'/pages/home/index.html');
    };
};

export default new TestRoute();