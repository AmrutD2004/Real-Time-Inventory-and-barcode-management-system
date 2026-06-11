export declare const userRoles: {
    readonly Admin: "Admin";
    readonly Manager: "Manager";
    readonly Operator: "Operator";
    readonly Viewer: "Viewer";
};
export type userRoles = (typeof userRoles)[keyof typeof userRoles];
export declare const Status: {
    readonly Active: "Active";
    readonly Inactive: "Inactive";
};
export type Status = (typeof Status)[keyof typeof Status];
export declare const types: {
    readonly IN: "IN";
    readonly OUT: "OUT";
    readonly TRANSFER: "TRANSFER";
};
export type types = (typeof types)[keyof typeof types];
export declare const notiType: {
    readonly LOW_STOCK: "LOW_STOCK";
    readonly STOCK_UPDATED: "STOCK_UPDATED";
    readonly TRANSFER: "TRANSFER";
};
export type notiType = (typeof notiType)[keyof typeof notiType];
//# sourceMappingURL=enums.d.ts.map