import './App.css'
import { Outlet } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import { Toaster } from 'sonner'

function App() {

  return (
    <div className='max-w-screen max-h-screen'>
      <Navbar />
      <Outlet />
      <Footer/>
      <Toaster 
        position="bottom-right" 
        richColors 
        expand={true}
        closeButton
        theme="light"
        toastOptions={{
          style: {
            borderRadius: '16px',
            padding: '16px',
            boxShadow: '0 8px 30px rgba(0,0,0,0.12)',
            border: '1px solid rgba(0,0,0,0.05)',
            fontFamily: 'inherit',
          },
          classNames: {
            error: 'bg-red-50 border-red-100 text-red-600',
            success: 'bg-green-50 border-green-100 text-green-600',
            warning: 'bg-orange-50 border-orange-100 text-orange-600',
            info: 'bg-blue-50 border-blue-100 text-blue-600',
          }
        }}
      />
    </div>
  )
}

export default App
