import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import ProductPage from "./pages/ProductPage"
import { useThemeStore } from "./Store /useThemeStore"
import { ToastContainer } from "react-toastify"
import Footer from "./pages/Footer"

function App(){
 const {theme} = useThemeStore()
  return(
    <>
      <div className="min-h-screen bg-base-200 transition-colors duration-300" data-theme={theme}>

        <Navbar/>

        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/product/:id" element={<ProductPage/>}/>
        </Routes>

        <ToastContainer/>
        <Footer/>
      </div>
    </>
  )
}
export default App