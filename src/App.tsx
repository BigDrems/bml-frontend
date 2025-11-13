import './App.css'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
function App() {

  return (
    <div className='max-w-screen max-h-screen'>
      <Navbar />
      <Home/>
      <Footer/>
    </div>
  )
}

export default App
