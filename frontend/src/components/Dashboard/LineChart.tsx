import React, { useContext } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { StockContext } from '@/context/WarehouseInventoryContext'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
)

const LineChart = () => {
  const { movementlast7daysHistory } = useContext(StockContext)

  const labels = Object.keys(movementlast7daysHistory || {})

  const data = {
    labels,
    datasets: [
      {
        label: 'Stock IN',
        data: labels.map(
          (day) => movementlast7daysHistory?.[day]?.IN || 0
        ),
        borderColor: '#22c55e',
        backgroundColor: '#22c55e',
        tension: 0.4,
      },
      {
        label: 'Stock OUT',
        data: labels.map(
          (day) => movementlast7daysHistory?.[day]?.OUT || 0
        ),
        borderColor: '#ef4444',
        backgroundColor: '#ef4444',
        tension: 0.4,
        fill : true
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
    },
  }

  return (
    <div className="h-[200px] lg:h-[350px] md:h-[350px]">
      <Line data={data} options={options} />
    </div>
  )
}

export default LineChart