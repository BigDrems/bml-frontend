import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '@/assets/logo.png';
import { ChevronDown, ChevronRightCircle, Menu, X, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../lib/firebase';


function Navbar() {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="sticky top-0 z-[1100] bg-white/80 backdrop-blur-md border-b border-white/20">
      <div className="max-w-[1234px] mx-auto mt-0 px-4">
        <div className="flex flex-row items-center justify-between gap-3 py-4">
          {/* Logo and Title */}
          <div className='flex gap-2 sm:gap-4 items-center'>
            <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-500 rounded-full flex items-center justify-center">
             <img src={Logo} alt="Logo" />
            </div>

            {/* Title */}
            <div className="flex flex-row tracking-widest text-xl sm:text-2xl lg:text-3xl font-bold font-roboto-serif">
              <h1 className='text-[#43409D]'>L</h1>
              <h1 className='text-[#7EA0CD]'>E</h1>
              <h1 className='text-[#7DE8E8]'>Y</h1>
              <h1 className='text-[#FFF71A]'>T</h1>
              <h1 className='text-[#FD6D6D]'>E</h1>
            </div>
          </div>

          {/* Desktop Navigation - Hidden on mobile/tablet */}
          <div className='hidden w-[397px] lg:flex h-[64px] items-center justify-around gap-5 border-2 border-[#90BE54] px-10 bg-white/60 backdrop-blur-sm shadow-green rounded-[30px] font-roboto'>
            <Link to="/" className="hover:text-[#90BE54] transition-colors">Home</Link>
            <Link to="/map" className="hover:text-[#90BE54] transition-colors">Map</Link>
            <Link to="/species" className="hover:text-[#90BE54] transition-colors">Species</Link>
            <Link to="/sightings" className="hover:text-[#90BE54] transition-colors">Sightings</Link>
          </div>

          <div className='hidden lg:flex items-center justify-center py-2 px-2 gap-2 font-roboto'>
              <Button 
                variant={'outline'} 
                className='flex rounded-[20px] items-center justify-center w-[154px] h-[43px] border border-[#90BE54] gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80'
              > 
                <span className='text-md font-medium lg:mt-1'>English</span> 
                <ChevronDown size={16} />
              </Button>
              {user ? (
                <Button 
                  variant={'outline'} 
                  onClick={handleLogout}
                  className='flex items-center justify-center rounded-[20px] w-[154px] h-[43px] border border-[#90BE54] gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80'
                > 
                  <LogOut size={16} color='black' /> 
                  <span className='text-md font-medium lg:mt-1'>Logout</span>
                </Button>
              ) : (
              <Link to="/auth">
                <Button 
                  variant={'outline'} 
                  className='flex items-center justify-center rounded-[20px] w-[154px] h-[43px] border border-[#90BE54] gap-2 bg-white/60 backdrop-blur-sm hover:bg-white/80'
                > 
                  <ChevronRightCircle size={16} color='black' /> 
                  <span className='text-md font-medium lg:mt-1'>Let's Connect</span>
                </Button>
              </Link>
              )}
            </div>

          {/* Mobile Menu Button - Visible on mobile/tablet */}
          <button 
            className="lg:hidden p-2 hover:bg-white/50 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu - Overlay when open */}
      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-white/90 backdrop-blur-lg shadow-lg border-t border-white/20 z-40">
          <div className="max-w-[1234px] mx-auto px-4 py-4 font-roboto">
            {/* Navigation Links */}
            <div className='flex flex-col gap-3'>
              <Link to="/" className="py-2 px-4 hover:bg-white/50 rounded-lg transition-colors">Home</Link>
              <Link to="/map" className="py-2 px-4 hover:bg-white/50 rounded-lg transition-colors">Map</Link>
              <Link to="/species" className="py-2 px-4 hover:bg-white/50 rounded-lg transition-colors">Species</Link>
              <Link to="/sightings" className="py-2 px-4 hover:bg-white/50 rounded-lg transition-colors">Sightings</Link>
            </div>

            {/* Mobile Buttons */}
            <div className='flex flex-col sm:flex-row gap-3 mt-4'>
              <Button 
                variant={'outline'} 
                className='flex rounded-[20px] h-[43px] items-center justify-center border border-[#90BE54] gap-2 w-full sm:w-auto bg-white/60 backdrop-blur-sm hover:bg-white/80'
              > 
                <span className='text-md font-medium'>English</span> 
                <ChevronDown size={16} />
              </Button>
           
              {user ? (
                <Button 
                  variant={'outline'} 
                  onClick={handleLogout}
                  className='flex items-center justify-center rounded-[20px] h-[43px] border border-[#90BE54] gap-2 w-full sm:w-auto bg-white/60 backdrop-blur-sm hover:bg-white/80'
                > 
                  <LogOut size={16} color='black' /> 
                  <span className='text-md font-medium'>Logout</span>
                </Button>
              ) : (
              <Link to="/auth" className="w-full sm:w-auto">
                <Button 
                  variant={'outline'} 
                  className='flex items-center justify-center rounded-[20px] h-[43px] border border-[#90BE54] gap-2 w-full bg-white/60 backdrop-blur-sm hover:bg-white/80'
                > 
                  <ChevronRightCircle size={16} color='black' /> 
                  <span className='text-md font-medium'>Let's Connect</span>
                </Button>
              </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar