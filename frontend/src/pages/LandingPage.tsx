import Feature from '@/components/Landing/Feature'
import Hero from '@/components/Landing/Hero'
import Navbar from '@/components/Landing/Navbar'

const LandingPage = () => {
  return (
    <>
    <Navbar />
    <div className='max-w-7xl mx-auto mt-30'>
        <div id='home' className='w-full mt-10'>
          <Hero />
        </div>
        <div id='feature'>
          <Feature />
        </div>
    </div>
    </>
  )
}

export default LandingPage
