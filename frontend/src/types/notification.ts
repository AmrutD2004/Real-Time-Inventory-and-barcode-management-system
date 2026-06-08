import type { User } from "./user";

export interface Notification {
    id : number,
    message : string,
    type : string,
    user : User,
    isRead : boolean,
    created_at : Date
}