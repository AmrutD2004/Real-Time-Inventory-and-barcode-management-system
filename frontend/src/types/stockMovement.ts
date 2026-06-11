export interface stockMovement{
    id : number,
    product_id : number,
    note : string | null,
    preformed_by : number,
    quantity : number,
    type : string,
    warehouse_id : number,
    created_at : Date
}