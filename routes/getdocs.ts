import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { existsSync, readdirSync, readFile, readFileSync } from "fs";
import path from "path";
import { ParsedQs } from "qs";
import { Route, RouteType } from "../util/util.js";

const __dirname = new URL('.', import.meta.url).pathname;
export class Documentation implements Route {
    path: string = '/documentation/:id'; type: RouteType = "get";
    method(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): any {
        const document_id = req.params?.id;
        if (!document_id) return res.status(201).send('No such documentation');
        else if (document_id == 'list') {
            let files = readdirSync(path.resolve(__dirname, '..')+'/public/docs', {withFileTypes: true}).filter(j=>j.name.endsWith('.json'));
            let all_docs: {desc: string, title: string, last_updated: string; index: string}[] = [];
            files.forEach(file => {
                const data1 = JSON.parse(readFileSync(path.resolve(__dirname, '..')+'/public/docs/'+file.name, {encoding: 'utf-8'}));
                let data = {
                    title: data1.title,
                    last_updated: data1.last_updated,
                    desc: data1.desc,
                    index: readFileSync(path.resolve(__dirname, '..') + '/public/docs/markdown/' + data1.index, 'utf-8')
                }
                all_docs.push(data);
            });
            return res.status(200).send({docs: all_docs});
        }
        else if (!existsSync(path.resolve(__dirname, '..')+'/public/docs/'+document_id+'.json')) return res.status(201).send('No such documentation');
        else {
            let data = JSON.parse(readFileSync(path.resolve(__dirname, '..')+'/public/docs/'+document_id+'.json', {encoding: 'utf-8'}));
            return res.status(200).send({
                title: data.title,
                last_updated: data.last_updated,
                desc: data.desc,
                index: readFileSync(path.resolve(__dirname, '..') + '/public/docs/markdown/' + data.index, 'utf-8')
            });
        };
    }
};

export default new Documentation();