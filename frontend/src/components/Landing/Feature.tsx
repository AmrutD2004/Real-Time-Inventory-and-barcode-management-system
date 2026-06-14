import { useTheme } from "../theme-provider"
import lineDark from '../../images/landing/features/lineDark.png'
import lineLight from '../../images/landing/features/lineLight.png'
import barDark from '../../images/landing/features/barDark.png'
import barLight from '../../images/landing/features/barLight.png'
import notiDark from '../../images/landing/features/notiDark.png'
import notiLight from '../../images/landing/features/notiLight.png'
import stockMovDark from '../../images/landing/features/stockMovDark.png'
import stockMovLight from '../../images/landing/features/stockMovLight.png'

const Feature = () => {
    const { theme } = useTheme()
    return (
        <div className='max-w-5xl mx-auto my-5 mt-10'>
            <div className='flex flex-col items-center justify-center'>
                <span className='uppercase text-muted-foreground font-medium text-sm'>Feature</span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 my-5">
                {/* Large Card */}
                <div className="lg:col-span-2 lg:row-span-2 border rounded-lg p-4 relative">
                    <img src={theme === 'dark' ? lineDark : lineLight} className="mask-b-from-0% mask-r-from-0%" />
                    <div className="absolute bottom-0 flex flex-col items-start justify-start gap-2">
                        <div className="px-3 py-5 flex flex-col gap-3">
                            <h1 className="text-base tracking-tight font-medium">Chart Analytics</h1>
                            <p className="text-xs font-medium tracking-tight text-muted-foreground ">Visualize inventory distribution across warehouses and monitor total units stored in each location. Instantly identify overstocked and underutilized warehouses.</p>
                        </div>
                    </div>
                </div>

                {/* Small Cards */}

                <div className="border rounded-lg p-4 lg:col-span-2 lg:row-span-2 relative">
                    <img src={theme === 'dark' ? barDark : barLight} className="mask-b-from-0% mask-r-from-0%" />
                    <div className="absolute bottom-0 flex flex-col items-start justify-start gap-2">
                        <div className="px-3 py-5 flex flex-col gap-3">
                            <h1 className="text-base tracking-tight font-medium">Stock Movement Trends</h1>
                            <p className="text-xs font-medium tracking-tight text-muted-foreground ">Track inventory activity over the last 7 days with clear IN vs OUT movement comparisons. Monitor stock flow patterns and detect unusual inventory changes.</p>
                        </div>
                    </div>
                </div>

                {/* Wide Card */}
                <div className="lg:col-span-3 row-span-6 border rounded-lg p-4 relative py-20">
                    <img src={theme === 'dark' ? stockMovDark : stockMovLight} className="mask-b-from-0% mask-r-from-0% h-40 w-250"/>
                    <div className="absolute bottom-0 flex flex-col items-start justify-start gap-2">
                        <div className="px-3 py-5 flex flex-col gap-3">
                            <h1 className="text-base tracking-tight font-medium">Activity Logs & Audit Trail</h1>
                            <p className="text-xs font-medium tracking-tight text-muted-foreground ">Track every inventory action including stock additions, removals, transfers, barcode scans, and user activities. Maintain a detailed audit trail for accountability, compliance, and operational transparency.</p>
                        </div>
                    </div>
                </div>

                {/* Small Cards */}
                <div className="border rounded-lg p-4 row-span-6 relative lg:col-span-1">
                    <img src={theme === 'dark' ? notiDark : notiLight} className="mask-b-from-0% mask-r-from-0% "/>
                    <div className="absolute bottom-0 flex flex-col items-start justify-start gap-2">
                        <div className="px-3 py-5 flex flex-col gap-3">
                            <h1 className="text-base tracking-tight font-medium">Instant Operational Alerts</h1>
                            <p className="text-xs font-medium tracking-tight text-muted-foreground ">Receive immediate notifications for low stock levels, inventory updates, warehouse transfers, and critical system activities without refreshing the dashboard.</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Feature