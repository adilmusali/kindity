import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router'
import Home from './pages/Home'
import Header from './components/Header'
import Footer from './components/Footer'
import FirstHeader from './components/FirstHeader'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Event from './pages/Event'
import EventDetail from './pages/EventDetail'
import Donation from './pages/Donation'
import Contact from './pages/Contact'
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
    <FirstHeader />
    <Header />
    <Toaster position='bottom-right' toastOptions={{duration: 2000}} />
    <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/gallery' element={<Gallery />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/event' element={<Event />}></Route>
      <Route path='/event/:id' element={<EventDetail />}></Route>
      <Route path='/donation' element={<Donation />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
    </Routes>
    <Footer />
    </>
  )
}

export default App
