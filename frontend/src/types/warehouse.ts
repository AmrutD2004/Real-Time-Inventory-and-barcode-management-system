export interface Warehous{
  id : number,
  warehouseName : string,
  warehouseLocation : string,
  warehouseRackInfo : string | null,
  created_at : Date,
  updated_at : Date,
  warehouseStatus : string,
  warehouseCapacity : number | null
}