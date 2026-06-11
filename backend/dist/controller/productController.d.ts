import type { Request, Response } from "express";
export declare const addProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getAllProducts: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getAllProductsOnce: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const editProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const deleteProduct: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const getProductBySearch: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=productController.d.ts.map