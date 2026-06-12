
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'
import whiteLanding from '../../images/landing/whiteLanding.png'
import darkLanding from '../../images/landing/darkLanding.png'
import { useTheme } from '../theme-provider'

const Hero = () => {
    const {theme} = useTheme()
  return (
    <div className='w-full flex flex-col items-center justify-centerw gap-4 relative '>
        <div className='absolute h-24 bg-accent border w-full -z-50 top-25 transform-3d rotate-y-45 rotate-x-45 right-0 blur'>

        </div>
        <div className='absolute h-24 bg-accent border w-full -z-50 top-25 transform-3d -rotate-y-45 rotate-x-45 left-0 blur'>

        </div>
        <div className='flex items-center justify-center'>
            <Badge className='py-3.5 px-5 bg-background flex items-center gap-4 drop-shadow-xl ' variant={'outline'}><span className='scale-115'>•</span>Real-time sync enabled</Badge>
        </div>
        <div className='max-w-5xl z-40'>
            <div className='flex flex-col items-center justify-center text-center w-full gap-2 '>
                <h1 className='text-5xl font-semibold'>Manage Inventory in Real Time. Track Every Product. Scale Every Warehouse.</h1>
                <p className='text-sm text-muted-foreground lg:w-148 mt-3'>An enterprise-grade inventory platform that combines warehouse management, barcode scanning, live stock synchronization, notifications, and analytics into one powerful system.</p>
            </div>  
        </div>
        <div className='flex items-center justify-center gap-2'>
            <Button className={cn('text-xs border-2 border-accent-foreground')}>Get started</Button>
            <Button variant={'ghost'} className={cn('text-xs flex items-center')}>Contact us <ArrowRight /></Button>
        </div>
        <div className='flex items-center justify-center rounded-lg my-3 border-8 overflow-hidden'>
            <img src={theme === 'dark' ? darkLanding : whiteLanding} className='w-200 rounded-lg  mask-b-from-0% overflow-hidden'/>
        </div>
    </div>
  )
}

export default Hero
