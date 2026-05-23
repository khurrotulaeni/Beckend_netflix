import { Request, Response } from "express";
export declare const getCategories: (req: Request, res: Response) => Promise<void>;
export declare const createCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const showCategories: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateCategories: (req: Request, res: Response) => Promise<void>;
export declare const deleteCategories: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=categoryController.d.ts.map