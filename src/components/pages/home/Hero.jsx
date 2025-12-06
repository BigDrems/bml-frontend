import React from 'react'
import { Link } from 'react-router-dom'
import bgImage from '@/assets/landing-image.svg'
import { Button } from '@/components/ui/button';

function Hero() {
  return (
    <section
      className="w-full min-h-[600px] md:min-h-[891px] bg-cover bg-center bg-no-repeat flex flex-col justify-start items-start p-6 md:p-10"
      style={{ backgroundImage: `url(${bgImage})` }}
      aria-label="Hero section"
    >
      <div className="w-full max-w-[923px] bg-black/50 backdrop-blur-sm rounded-[40px] md:rounded-[90px] p-6 md:p-10 text-center">
        <h1 className="font-semibold text-white text-[32px] md:text-[48px] lg:text-[64px] font-roboto-serif leading-tight">
          Discover and Document Leyte's Biodiversity
        </h1>
        <p className="font-normal text-white text-base md:text-xl lg:text-2xl font-roboto text-start pt-6 md:pt-10 px-4 md:pl-11">
          Explore, document, and conserve the rich natural heritage of Leyte. Join a community of researchers, students, and nature enthusiasts
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 mt-8 md:mt-20 px-4 md:px-0 md:ml-11 w-full sm:w-auto">
        <Button
          asChild
          className="group relative w-full sm:w-auto px-8 h-[56px] md:h-[62px] !bg-[#4F8706] !text-white font-inter font-bold text-base md:text-lg rounded-full shadow-lg hover:!bg-[#3d6805] hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
        >
          <Link to="/map" aria-label="Explore the biodiversity map">
            <span className="flex items-center gap-2 text-white">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Explore Map
            </span>
          </Link>
        </Button>
        <Button
          asChild
          className="group relative w-full sm:w-auto px-8 h-[56px] md:h-[62px] !bg-transparent !text-white font-inter font-bold text-base md:text-lg rounded-full border-2 border-white hover:!bg-white hover:!text-[#4F8706] hover:shadow-xl hover:scale-105 active:scale-100 transition-all duration-300"
        >
          <Link to="/sightings" aria-label="Submit a wildlife sighting">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Sighting
            </span>
          </Link>
        </Button>
      </div>
    </section>
  );
}

export default Hero