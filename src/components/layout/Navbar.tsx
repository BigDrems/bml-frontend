import { useState } from 'react';
import Logo from '@/assets/logo.png';
import { ChevronDown, ChevronRightCircle, Menu, X } from 'lucide-react';
import { Button } from '../ui/button';


function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50">
    <div className="max-w-[1234px] mx-auto mt-0 px-4">
      <div className="flex flex-row items-center justify-between gap-3 py-4">
        {/* Logo and Title */}
        <div className='flex gap-2 sm:gap-4 items-center'>
          <div className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-blue-500 rounded-full flex items-center justify-center">
           <img src={Logo} alt="Logo" />
          </div>

          {/* Title */}
          <div className="flex flex-row tracking-widest text-xl sm:text-2xl lg:text-3xl font-bold">
            <h1 className='text-[#43409D]'>L</h1>
            <h1 className='text-[#7EA0CD]'>E</h1>
            <h1 className='text-[#7DE8E8]'>Y</h1>
            <h1 className='text-[#FFF71A]'>T</h1>
            <h1 className='text-[#FD6D6D]'>E</h1>
          </div>
        </div>

        {/* Desktop Navigation - Hidden on mobile/tablet */}
        <div className='hidden w-[397px] lg:flex h-[64px] items-center justify-around gap-5 border-2 border-[#90BE54] px-10 bg-[#F4F4F4] shadow-green rounded-[30px]'>
          <a href="" className="hover:text-[#90BE54] transition-colors">Home</a>
          <a href="" className="hover:text-[#90BE54] transition-colors">Map</a>
          <a href="" className="hover:text-[#90BE54] transition-colors">Species</a>
          <a href="" className="hover:text-[#90BE54] transition-colors">Sightings</a>
        </div>

        <div className='hidden lg:flex items-center justify-center py-2 px-2 gap-2'>
            <Button 
              variant={'outline'} 
              className='flex rounded-[20px] items-center justify-center w-[154px] h-[43px] border border-[#90BE54] gap-2'
            > 
              <span className='text-md font-medium lg:mt-1'>English</span> 
              <ChevronDown size={16} />
            </Button>
            <Button 
              variant={'outline'} 
              className='flex items-center justify-center rounded-[20px] w-[154px] h-[43px] border border-[#90BE54] gap-2'
            > 
              <ChevronRightCircle size={16} color='black' /> 
              <span className='text-md font-medium lg:mt-1'>Let's Connect</span>
            </Button>
          </div>

        {/* Mobile Menu Button - Visible on mobile/tablet */}
        <button 
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - Visible when open */}
      {mobileMenuOpen && (
        <div className="lg:hidden flex flex-col gap-4 pb-4 px-4 border-t border-gray-200 mt-4 pt-4">
          {/* Navigation Links */}
          <div className='flex flex-col gap-3'>
            <a href="" className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">Home</a>
            <a href="" className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">Map</a>
            <a href="" className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">Species</a>
            <a href="" className="py-2 px-4 hover:bg-gray-100 rounded-lg transition-colors">Sightings</a>
          </div>

          {/* Mobile Buttons */}
          <div className='flex flex-col sm:flex-row gap-3 mt-2'>
            <Button 
              variant={'outline'} 
              className='flex rounded-[20px] h-[43px] items-center justify-center border border-[#90BE54] gap-2 w-full sm:w-auto'
            > 
              <span className='text-md font-medium'>English</span> 
              <ChevronDown size={16} />
            </Button>
            <Button 
              variant={'outline'} 
              className='flex items-center justify-center rounded-[20px] h-[43px] border border-[#90BE54] gap-2 w-full sm:w-auto'
            > 
              <ChevronRightCircle size={16} color='black' /> 
              <span className='text-md font-medium'>Let's Connect</span>
            </Button>
          </div>
        </div>
      )}
    </div>
    </div>
  )
}

export default Navbar