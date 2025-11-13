import React from 'react'
import bgImage from '@/assets/landing-image.svg'
import { Button } from '@/components/ui/button';

function Hero() {
  return (
    <div
         className="w-full min-h-[600px] md:min-h-[891px] bg-cover bg-center flex flex-col justify-start items-start p-6 md:p-10"
         style={{ backgroundImage: `url(${bgImage})` }}
       >
         <div className="w-full max-w-[923px] bg-black/50 rounded-[40px] md:rounded-[90px] p-6 md:p-10 text-center">
           <h1 className="font-semibold text-white text-[32px] md:text-[48px] lg:text-[64px] font-roboto-serif leading-tight">
             Discover and Document Leyte's Biodiversity
           </h1>
           <h4 className="font-medium text-white text-[16px] md:text-[20px] lg:text-[24px] font-roboto text-start pt-6 md:pt-10 px-4 md:pl-11">
             Explore, document, and conserve the rich natural heritage of Leyte. Join a community of researchers, students, and nature enthusiasts
           </h4>
         </div>
         <div className='flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-19 px-4 md:px-0 md:ml-11 w-full sm:w-auto'>
           <Button className="w-full sm:w-[174px] h-[60px] md:h-[69px] bg-white text-[#4F8706] font-inter font-medium text-[18px] md:text-[20px] rounded-[10px] hover:bg-[#4F8706] hover:text-white transition-colors duration-300">
             Explore Map
           </Button>
           <Button className="w-full sm:w-[174px] h-[60px] md:h-[69px] bg-white text-[#4F8706] font-inter font-medium text-[18px] md:text-[20px] rounded-[10px] hover:bg-[#4F8706] hover:text-white transition-colors duration-300">
             Submit Sighting
           </Button>
         </div>
       </div>
     );
}

export default Hero