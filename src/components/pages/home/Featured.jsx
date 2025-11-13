import featuredSpecies from "@/data/featured";
import { MapPin } from "lucide-react";
import React from 'react'
import { Button } from "@/components/ui/button";

function Featured() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-8 md:mt-15 px-4 md:px-0">
        {featuredSpecies.slice(0, 3).map((species) => (
          <div key={species.speciesName} className="flex flex-col bg-white rounded-[10px] shadow-[4px_4px_8px_#445133] overflow-hidden max-w-[400px] mx-auto w-full">
            <img src={species.imageUrl} alt={species.speciesName} className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[392px] object-cover" />
            <div className="p-4 md:p-6">
              <h2 className="text-black text-[18px] md:text-[20px] lg:text-[24px] font-inter font-bold">{species.speciesName}</h2>
              <p className="text-green-900 text-[9px] md:text-[10px] italic font-inter">{species.speciesType}</p>
              <p className="text-black text-[12px] md:text-[13px] font-inter italic flex items-center pt-2">
                <MapPin size={18} className="mr-2 md:mr-2" color="green" /> 
                <span className="md:hidden">{species.location.length > 30 ? species.location.substring(0, 30) + '...' : species.location}</span>
                <span className="hidden md:inline">{species.location}</span>
              </p>
            </div>
            <div className="flex justify-center pb-4 md:pb-6 mt-3 md:mt-5">
              <Button variant="outline" className="w-[110px] md:w-[130px] h-[40px] md:h-[45px] bg-[#4F8706] text-white text-[14px] md:text-[16px]"> 
                View Sighting 
              </Button>
            </div>
          </div>
          
        ))}
       
    </div>
  )
}

export default Featured