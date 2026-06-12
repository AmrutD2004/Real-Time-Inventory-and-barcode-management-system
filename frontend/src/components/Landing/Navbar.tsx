import { useTheme } from "../theme-provider"
import darkLogo from '../../images/Logo.png'
import whiteLogo from '../../images/WhiteLogo.png'
import { Button } from "../ui/button"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import { useNavigate } from "react-router-dom"


const Navbar = () => {
  const links = [
    {
      id : 1,
      title : 'Feature',
      path : '#feature'
    },
    {
      id : 2,
      title : 'Product',
      path : '#product'
    },
    {
      id : 3,
      title : 'FAQs',
      path : '#faqs'
    },
    {
      id : 4,
      title : 'Pricing',
      path : '#pricing'
    },
  ]
  const { theme, setTheme } = useTheme()
  const navigate = useNavigate()
  return (
    <div className='w-full fixed top-0 bg-background/30 backdrop-blur-2xl h-16 border-b z-50'>
      <div className='max-w-7xl mx-auto h-full'>
          <div className="flex items-center justify-between h-full">
              <div className="flex items-center gap-1 h-full scale-90">
                  <img src={theme === 'dark' ? darkLogo : whiteLogo} className="w-8"/>
                  <h1 className="text-lg text-accent-foreground font-medium tracking-tight">Scanventory</h1>
              </div>
              <div className="flex items-center gap-5">
                  {links.map((items : any)=>(
                      <a className="text-xs text-muted-foreground font-medium hover:text-accent-foreground transition-colors duration-300 cursor-pointer" key={items.id} href={items.path}>{items.title}</a>
                  ))}
              </div>
              <div className="flex items-center gap-2">
                  <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} variant={'ghost'} className={cn('px-2 rounded-full')}>{
                        theme === 'dark' ? <Sun /> : <Moon />
                    }</Button>
                  <Button onClick={() => navigate('/login')} variant={'ghost'}>Login</Button>
                  <Button onClick={() => navigate('/signup')} className={cn('font-medium')}>Signup</Button>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar
