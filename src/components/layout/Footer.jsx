import React from 'react'
import { Facebook, Twitter, Instagram } from 'lucide-react'

function Footer() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <div className='mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 border-t-2 border-black px-6 md:px-12 lg:px-22 w-full max-w-7xl'>
            <div className='flex flex-col py-8 md:py-12 lg:py-18 text-center md:text-left'>
                <h1 className='font-bold text-xl md:text-2xl font-roboto pb-3 md:pb-5'>BioMap Leyte</h1>
                <p className='text-sm md:text-base text-gray-700 px-4 md:px-0'>Mapping and protecting the biodiversity of Leyte, Philippines</p>
            </div>
            <div className='flex flex-col py-8 md:py-12 lg:py-18 text-center md:text-left mx-auto'>
                <h1 className='font-bold text-xl md:text-2xl font-roboto pb-3 md:pb-5'>Quick Links</h1>
                <ul className='space-y-2 text-sm md:text-base'>
                    <li className='hover:text-gray-600 cursor-pointer'>About Us</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Contact</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Privacy Policy</li>
                    <li className='hover:text-gray-600 cursor-pointer'>Term of Service</li>
                </ul>
            </div>
            <div className='mx-auto flex flex-col py-8 md:py-12 lg:py-18 text-center md:text-left md:col-span-2 lg:col-span-1'>
                <h1 className='font-bold text-xl md:text-2xl font-roboto pb-3 md:pb-5'>Connect With Us</h1>
                <div className='flex flex-row justify-center md:justify-start gap-6 md:gap-8'>
                    <Facebook className='w-8 h-8 hover:text-blue-600 cursor-pointer transition-colors' />
                    <Twitter className='w-8 h-8 hover:text-blue-400 cursor-pointer transition-colors' />
                    <Instagram className='w-8 h-8 hover:text-pink-600 cursor-pointer transition-colors' />
                </div>
            </div>
        </div>
        <div className='text-center py-8 md:py-12 lg:py-16 px-4'>
            <p className='font-roboto text-sm md:text-base lg:text-xl'>© 2025 BioMap Leyte. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer