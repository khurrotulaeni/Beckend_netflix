import { Request, Response } from "express";
export declare const getMovies: (req: Request, res: Response) => Promise<void>;
export declare const createMovies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const showMovies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateMovies: (req: Request, res: Response) => Promise<void>;
export declare const deleteMovies: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=movieController.d.ts.map