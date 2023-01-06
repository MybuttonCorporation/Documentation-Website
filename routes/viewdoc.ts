import axios from "axios";
import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { existsSync, readFileSync } from "fs";
import path from "path";
import { ParsedQs } from "qs";
import { Route, RouteType } from "../util/util.js";

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;

export class ViewDocumentation implements Route {
    type: RouteType = "get"; path: string = "/docs/:id";
    method(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>) {
        let document_id = req.params.id;
        if (!document_id) return res.redirect('/doc/'+req.params.id);
        else if (!existsSync(path.resolve(__dirname, '..')+'/public/docs/'+document_id+'.json')) res.redirect('/doc/'+req.params.id);
        else {
            let data = JSON.parse(readFileSync(path.resolve(__dirname, '..')+'/public/docs/'+document_id+'.json', {encoding: 'utf-8'}));
            let response_html = `<!DOCTYPE html>
<title>Mybutton Documentation Server</title>
<body>
    <div id="_titlebar"></div>
    <div id="_title">
        Mybutton Documentation Server
    </div>
    <div id="_titlebar"></div>
    <div id="container">
            <div id="centered" class="red">${data.title}</div>
            <div style="font-family: monospace; font-size: 20px; color: rgb(224, 209, 170);">
            ${readFileSync(path.resolve(__dirname, '..') + '/public/docs/markdown/'+data.index, 'utf-8')}
            </div>
            <div class="green">${data.last_updated}</div>
    </div>
</body>
<script>
const title = document.getElementById("_title");
title.onclick = function() { window.location.href = "http://docs.mybutton.org/"; };
</script>
<link rel="stylesheet" href="../css/index.css"></link>`
            return res.status(200).send(response_html);
        }
    }
}

export default new ViewDocumentation();