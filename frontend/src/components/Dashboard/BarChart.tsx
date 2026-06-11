import { useContext } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { StockContext } from '@/context/WarehouseInventoryContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
)

const BarChart = () => {
  const { allWarehouseStock } = useContext(StockContext)

  const warehouseTotals = Object.values(
    (allWarehouseStock || []).reduce((acc: any, stock: any) => {
      const warehouseName = stock?.warehouse?.warehouseName

      if (!acc[warehouseName]) {
        acc[warehouseName] = {
          warehouseName,
          totalQuantity: 0,
        }
      }

      acc[warehouseName].totalQuantity += stock.quantity

      return acc
    }, {})
  )

  const data = {
    labels: warehouseTotals.map(
      (item: any) => item.warehouseName
    ),
    datasets: [
      {
        label: 'Stock Units',
        data: warehouseTotals.map(
          (item: any) => item.totalQuantity
        ),
        backgroundColor: [
          '#3b82f6',
          '#10b981',
          '#f59e0b',
          '#ef4444',
          '#8b5cf6',
        ],
        borderRadius: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Stock Distribution by Warehouse',
      },
    },
  }

  return (
    <div className="h-[200px] lg:h-[350px] md:h-[350px]">
      <Bar data={data} options={options} />
    </div>
  )
}

export default BarChart