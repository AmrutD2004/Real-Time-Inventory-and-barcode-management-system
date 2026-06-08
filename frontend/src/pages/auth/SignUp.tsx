import { register } from "@/api/endpoint"
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
import type { User } from "@/types/user.ts"
import { Eye, EyeClosed, Loader2 } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"

const SignUp=()=> {
  const [formData, setFormData] = useState<User>({
    email :'',
    password : ''
  })
  const [seePassword, setSeepassword] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const handleChange = (e : React.ChangeEvent <HTMLInputElement>)=>{
    const {name, value} = e.target;
    setFormData(prev=>({...prev, [name]:value}))
  }

  const handleSubmit = async(e : React.FormEvent <HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true)
    try{
      const payload = {
        email : formData.email,
        password : formData.password
        
      }
      const data = await register(payload)
      if(data.success){
        toast.success(data?.message)
        setFormData({
          email : '',
          password : ''
        })
      }
    }catch(err){
      console.log(err)
      toast.error('Something went wrong')
      setLoading(false)
    }finally{
      setLoading(false)
    }
  }
  const navigate = useNavigate()
  return (
    <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-center min-h-screen">
            <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>
          Enter your details below to create your account
        </CardDescription>
        <CardAction>
          <Button onClick={() => navigate('/login')} variant="link">Log In</Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form id="signup-form" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
              value={formData.email}
              onChange={handleChange}
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
              </div>
             <div className="w-full relative">
              <button type="button" onClick={() => setSeepassword(!seePassword)} className="absolute right-2 top-2 text-accent-foreground/30 hover:text-accent-foreground transition-colors duration-200 cursor-pointer">{seePassword ? <EyeClosed size={16}/> : <Eye size={16}/>}</button>
               <Input value={formData.password}
              onChange={handleChange} name="password" id="password" type={seePassword ? "text" : "password"} required placeholder="••••••••••" />
             </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" form="signup-form" className="w-full flex items-center gap-1" disabled={loading}>
          {loading ? <><Loader2 size={16} className="animate-spin"/>Creating account...</> : "Sign Up"}
        </Button>
      </CardFooter>
    </Card>
        </div>
    </div>
  )
}

export default SignUp
