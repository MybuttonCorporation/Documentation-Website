import chalk from "chalk";
import { Request, Response } from "express";

export function orange(...str: unknown[]): string { return chalk.rgb(246, 128, 25)(str)};

export interface Route {
    type: RouteType; path: string;
    method(req: Request, res: Response): any; 
};

export type RouteType = "get" | "post";