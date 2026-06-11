import { prisma } from "../prisma/lib/prisma.js";
export const checkDbConnection = async () => {
    try {
        await prisma.$queryRaw `SELECT 1`;
        return true;
    }
    catch (err) {
        console.log(err);
        return false;
    }
};
//# sourceMappingURL=db.js.map