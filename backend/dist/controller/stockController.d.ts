import type { Request, Response } from "express";
export declare const addStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getWarehouseStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getStockMovementHistory: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllWarehouseStock: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getStockMovementLast7days: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=stockController.d.ts.map