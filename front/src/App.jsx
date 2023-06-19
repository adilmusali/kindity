import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import FirstHeader from './components/FirstHeader'
import Gallery from './pages/Gallery'

function App() {
  return (
    <>
    <FirstHeader />
    <Header />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/gallery' element={<Gallery />}></Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App
