import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.ts";
import * as Prisma from "./internal/prismaNamespace.ts";
export * as $Enums from './enums.ts';
export * from "./enums.ts";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.users.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model Users
 *
 */
export type Users = Prisma.UsersModel;
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Products
 *
 */
export type Products = Prisma.ProductsModel;
/**
 * Model Warehouses
 *
 */
export type Warehouses = Prisma.WarehousesModel;
/**
 * Model Stock
 *
 */
export type Stock = Prisma.StockModel;
/**
 * Model StockMovement
 *
 */
export type StockMovement = Prisma.StockMovementModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
//# sourceMappingURL=client.d.ts.map