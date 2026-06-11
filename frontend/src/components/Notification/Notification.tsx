import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { AlertTriangle, ArrowDownUp, Bell, BellOff, Box, Check } from 'lucide-react'
import type { Notification } from '@/types/notification'
import { getAllNotification, makeAllRead, makeSingleRead } from '@/api/endpoint'
import { Badge } from '../ui/badge'
import { formatDistanceToNow } from 'date-fns'
import socket from '@/lib/socket'

const NotificationComponent = () => {
    const [notification, setNotification] = useState<Notification[]>([])
    const [unreadCount, setUnreadCount] = useState<number>(0)
    const [open, setOpen] = useState(false)
    const fetchNotifications = async () => {
        const data = await getAllNotification()
        if (data?.success) {
            setNotification(data?.data)
            setUnreadCount(data?.unreadCount)
        }
    }
    useEffect(() => {
        fetchNotifications()
    }, [])

    useEffect(() => {
        if (!notification) return
        socket.on('new_notification', () => {
            fetchNotifications()
        })
        return () => {
            socket.off('new_notification')
        }
    }, [])

    const handleRead = async(id : number)=>{
        const data = await makeSingleRead(id)
        if(data?.success){
            fetchNotifications()
        }
    }
     const handleAllRead = async()=>{
        const data = await makeAllRead()
        if(data?.success){
            fetchNotifications()
        }
    }
    const isReaded = notification.filter((f : any)=>f?.isRead===false).length
    return (
        <div>
            <div className='relative cursor-pointer'>
                {unreadCount > 0 && <span className='rounded-full text-accent-foreground absolute right-2 -top-1'>•</span>}
                <Button onClick={() => {
                    setOpen(!open)
                }} className={cn(`rounded-full px-2 hover:border ${open ? 'text-ring' : ''}`)} variant={'ghost'}><Bell /></Button>
            </div>
            {open && <div className='fixed w-90 border bg-background text-accent-foreground rounded-lg shadow lg:top-20 lg:right-60 md:top-20 md:right-60 z-50 overflow-hidden'>
                <div className='flex items-center justify-between w-full border-b px-5 py-3'>
                    <div className='flex items-center gap-2'>
                        <h1 className='flex items-center gap-1 tracking-tight text-muted-foreground font-medium text-sm'><Bell size={18} />Notifications</h1>
                        {notification.length > 0 && <Badge>{unreadCount} unread</Badge>}
                    </div>
                    {notification.length > 0 && <Button onClick={handleAllRead} size={'sm'} className={cn('flex items-center gap-1')}><Check />Mark all read</Button>}
                </div>
                <div className='w-full overflow-x-auto'>
                    {isReaded ===0 ? (
                        <div className='flex items-center justify-center h-52'>
                            <div className='flex flex-col items-center justify-center gap-2 text-muted-foreground'>
                                <BellOff />
                                <h1 className='text-sm tracking-tighter font-medium'>No notifications yet</h1>
                                <p className='text-xs tracking-tight'>You'll see low stock alerts and stock updates here</p>
                            </div>
                        </div>
                    ) : (
                        <div className="max-h-82 overflow-y-auto">
                            {notification.filter((f : any)=>f?.isRead===false).map((item: Notification) => (
                                <div onClick={() => handleRead(item?.id)}
                                    key={item.id}
                                    className={`w-full border-b px-5 py-4 transition-colors cursor-pointer ${!item.isRead
                                            ? "bg-sidebar text-accent-foreground hover:bg-sidebar/30"
                                            : "text-muted-foreground"
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <Badge
                                            className="rounded-lg p-2 shrink-0"
                                            variant={
                                                item.type === "LOW_STOCK"
                                                    ? "destructive"
                                                    : item.type === "STOCK_UPDATED"
                                                        ? "default"
                                                        : "outline"
                                            }
                                        >
                                            {item.type === "LOW_STOCK" ? (
                                                <AlertTriangle size={16} />
                                            ) : item.type === "STOCK_UPDATED" ? (
                                                <Box size={16} />
                                            ) : (
                                                <ArrowDownUp size={16} />
                                            )}
                                        </Badge>

                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm leading-relaxed whitespace-normal font-medium">
                                                {item.message}
                                            </p>

                                            <span className="mt-2 block text-xs text-muted-foreground">
                                                {formatDistanceToNow(
                                                    new Date(item.created_at),
                                                    { addSuffix: true }
                                                )}
                                            </span>
                                        </div>

                                        {!item.isRead && (
                                            <div className="h-2 w-2 rounded-full bg-blue-500 shrink-0 mt-2" />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>}
        </div>
    )
}

export default NotificationComponent
