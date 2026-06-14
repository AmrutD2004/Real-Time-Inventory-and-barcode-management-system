import { useState } from 'react'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'

const FAQs = () => {
    const [open, setOpen] = useState(null)
    const faqs = [
        {
            id : 1,
            question : 'How does barcode scanning work?',
            ans : 'When a product is created, the system auto-generates a unique SKU and creates a barcode image using Code-128 format. This barcode is uploaded to Cloudinary and stored in the database. Operators can then print the label and scan it using any device camera or a USB handheld scanner. The scan decodes the SKU and instantly fetches the product data from the database.'
        },
        {
            id : 2,
            question : 'Can I manage multiple warehouses?',
            ans : 'Yes. You can create unlimited warehouse locations, each with their own name, location, and rack info. Products can be assigned to multiple warehouses simultaneously with different quantities and low-stock thresholds per warehouse. Stock transfers between warehouses are tracked in the movement history.'
        },
        {
            id : 3,
            question : 'How are real-time update handled?',
            ans : "Real-time updates are powered by Socket.IO. When an operator updates stock, the backend emits a stock_updated event to all clients in that warehouse's room. Connected admin and manager dashboards automatically refresh the stock table without any page reload. Toast notifications appear for all connected users."
        },{
            id : 4,
            question : 'Is role-based access control supported?',
            ans : 'Yes. The system has four roles — Admin, Manager, Operator, and Viewer. Each role has specific permissions enforced at the API middleware level on every request. Admins can create warehouses and manage users. Managers handle stock and reports. Operators scan and update. Viewers have read-only access.'
        },
        {
            id : 5,
            question : 'Can inventory reports be exported?',
            ans : 'Yes. The system supports Excel export using the XLSX library. You can export stock reports, movement history, product reports, and warehouse reports. Each export includes product name, SKU, warehouse, current quantity, threshold, and status columns.'
        }

    ]
  return (
    <div className="max-w-5xl mx-auto">
        <div className='flex flex-col items-center justify-center gap-2 my-5 mt-10'>
            <h1 className='font-medium uppercase text-sm  text-muted-foreground'>Frequently asked questions</h1>
        </div>
  <div className="flex flex-col gap-3 my-3">
    {faqs.map((item: any) => (
      <div key={item.id} className="border shadow rounded-lg">
        <div className="px-5 py-3 flex items-center justify-between">
          <h1 className="text-sm font-medium text-accent-foreground">
            {item.question}
          </h1>

          <Button
            onClick={() => setOpen(open === item.id ? null : item.id)}
            variant="ghost"
            size="icon"
          >
            <Plus
              className={`transition-transform ${
                open === item.id ? "rotate-45" : ""
              }`}
            />
          </Button>
        </div>

        {open === item.id && (
          <div className="px-5 py-4 text-sm text-muted-foreground border-t">
            {item.ans}
          </div>
        )}
      </div>
    ))}
  </div>
</div>
  )
}

export default FAQs
