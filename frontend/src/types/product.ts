import type { Categories } from "./categories"
import type { Warehous } from "./warehouse"

export interface  Product  {
  id: string | number
  name: string
  sku: string
  barcode: string
  price: string
  image_url: string
  created_at: Date
  updated_at: Date
  category_id: number
  barcodeNo: string,
  barcodeImage : string,
  category : Categories,
  warehouse : Warehous,
  stock : any
}