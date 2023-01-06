import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { writeFile, writeFileSync } from "fs";
import path from "path";
import { ParsedQs } from "qs";
import { Route, RouteType } from "../util/util.js";

const __dirname = new URL('.', import.meta.url).pathname;
export class PostDocumentation implements Route {
    type: RouteType = "post"; path: string = "/add_doc";
    method(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
        let data = req.body;
        if (!data.auth || data.auth != 'AUTHKEY_DOCSMYBUTTON') return res.status(201).send('Unauthorized');
        else if (!data.docs || !data.docs?.name || !data.docs?.title || !data.docs?.desc || !data.docs?.index || !data.docs?.last_updated) return res.status(201).send('Bad parameters');
        let doc = data.docs;
        writeFileSync(`${path.resolve(__dirname, '..')}/public/docs/${doc.name}.json`, `${JSON.stringify({
            title: doc.title,
            desc: doc.desc,
            index: doc.name + '.html',
            last_updated: doc.last_updated
        })}`);
        writeFileSync(`${path.resolve(__dirname, '..')}/public/docs/${doc.name}.html`, `${doc.index}`);
        return res.status(200).send({
            title: doc.title,
            desc: doc.desc,
            index: doc.name + '.html',
            last_updated: doc.last_updated
        });
    }
};

export default new PostDocumentation();