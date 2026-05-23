import { Request, Response } from "express";
export declare const getEvent: (req: Request, res: Response) => Promise<void>;
export declare const createEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const showEvent: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const updateEvents: (req: Request, res: Response) => Promise<void>;
export declare const deleteEvent: (req: Request, res: Response) => Promise<void>;
//# sourceMappingURL=eventController.d.ts.map