import { login, register } from "@/api/endpoint"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UserInfoContext } from "@/context/userInfoContext"
import type { User } from "@/types/user.ts"
import { Eye, EyeClosed, Loader2 } from "lucide-react"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const Login = () => {
  const navigate = useNavigate()
  const {setIsLoggedIn} = useContext(UserInfoContext)
  const [formData, setFormData] = useState<User>({
    email: '',
    password: ''
  })
  const [seePassword, setSeepassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true)
    try {
      const payload = {
        email: formData.email,
        password: formData.password

      }
      const data = await login(payload)
      if (data.success) {
        toast.success(data?.message)
        setIsLoggedIn(true)
        setFormData({
          email: '',
          password: ''
        })
        setTimeout(()=>{
          navigate('/dashboard')
        }, 2000)
      }
      else{
        toast.error(data?.message || 'Something went wrong')
      }
    } catch (err : any) {
      console.log(err)
      toast.error(err.response.data.message|| 'Something went wrong')
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <div className="relative min-h-screen overflow-hidden">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center blur-xs scale-110"
        style={{
          backgroundImage: "url('/inventoryBG.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">

        <Card className="w-full max-w-sm shadow"> <CardHeader> <CardTitle>Login to your account</CardTitle> <CardDescription> Enter your email below to login to your account </CardDescription> <CardAction> <Button onClick={() => navigate('/signup')} variant="link">Sign Up</Button> </CardAction> </CardHeader> <CardContent> <form id="signup-form" onSubmit={handleSubmit}> <div className="flex flex-col gap-6"> <div className="grid gap-2"> <Label htmlFor="email">Email</Label> <Input value={formData.email} onChange={handleChange} id="email" name="email" type="email" placeholder="m@example.com" required /> </div> <div className="grid gap-2"> <div className="flex items-center"> <Label htmlFor="password">Password</Label> </div> <div className="w-full relative"> <button type="button" onClick={() => setSeepassword(!seePassword)} className="absolute right-2 top-2 text-accent-foreground/30 hover:text-accent-foreground transition-colors duration-200 cursor-pointer">{seePassword ? <EyeClosed size={16} /> : <Eye size={16} />}</button> <Input value={formData.password} onChange={handleChange} name="password" id="password" type={seePassword ? "text" : "password"} required placeholder="••••••••••" className="placeholder:text-xs"/> </div> </div> </div> </form> </CardContent> <CardFooter className="flex-col gap-2"> <Button type="submit" form="signup-form" className="w-full flex items-center gap-1" disabled={loading}> {loading ? <><Loader2 size={16} className="animate-spin" />Logging In...</> : "Login"} </Button> </CardFooter> </Card>

      </div>
    </div>
  )
}

export default Login
