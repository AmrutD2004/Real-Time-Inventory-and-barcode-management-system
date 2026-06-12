import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignUp from './pages/auth/SignUp'
import { Toaster } from './components/ui/sonner'

import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import Protected from './components/protected/Protected'
import Categories from './pages/Categories'
import { ProductContextProvider } from './context/ProductContext'
import Products from './pages/Products'
import { WareHouseContextProvider } from './context/WarehouseInventoryContext'
import WareHouse from './pages/WareHouse'
import WarehouseDetails from './pages/WarehouseDetails'
import ScanPage from './pages/ScanPage'
import LandingPage from './pages/LandingPage'

export function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />

          <Route path='/dashboard' element={<Protected><WareHouseContextProvider><Dashboard /></WareHouseContextProvider></Protected>} />
          <Route path='/categories' element={<Protected><ProductContextProvider><Categories /></ProductContextProvider></Protected>} />
          <Route path='/products' element={<Protected><ProductContextProvider><Products /></ProductContextProvider></Protected>} />

          <Route path='/warehouse' element={<Protected><WareHouseContextProvider><WareHouse /></WareHouseContextProvider></Protected>} />
          <Route path='/warehouse/:id' element={<Protected><ProductContextProvider><WareHouseContextProvider><WarehouseDetails /></WareHouseContextProvider></ProductContextProvider></Protected>} />
          <Route path='scan' element={<Protected><ScanPage /></Protected>}/>
        </Routes>
      </Router>
      <Toaster position='bottom-right' />
    </>
  )
}

export default App
