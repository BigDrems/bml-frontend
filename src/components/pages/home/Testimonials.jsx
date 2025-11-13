import React from 'react'

function Testimonials() {
  return (
    <div className='flex flex-col items-center mt-12 md:mt-22 px-4'>
        <h1 className='text-2xl md:text-[40px] font-inter font-black text-center mb-8'>From Our Community</h1>
        <div className='grid items-center justify-center grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl'>
                <div className="border border-gray-300 rounded-lg p-6 shadow-lg rounded-tr-[120px] rounded-bl-[120px] sm:rounded-tr-[200px] sm:rounded-bl-[200px] w-full max-w-[539px] min-h-[297px] bg-[#445133] text-white">
                <p className='pr-10 mb-4 font-inter italic text-sm md:text-[16px] leading-relaxed'>"BioMap Leyte has made exploring our local wildlife so much easier and more exciting!"</p>
                <p className='mb-4 px-2 font-inter italic text-sm md:text-[16px] leading-relaxed'>"I used to take photos of birds and insects during my weekend hikes, but now I can upload them directly to the map and see other people's sightings too. It's amazing to realize how diverse Leyte's ecosystems really are — from mountain species to coastal ones."</p>
                <p className='ml-22 mt-6 font-inter text-sm md:text-base'>— Maria Liza D., Teacher & Nature Enthusiast from Baybay City</p>
            </div>
             <div className="border border-gray-300 rounded-lg p-6 shadow-lg rounded-tl-[120px] rounded-br-[120px] sm:rounded-tl-[200px] sm:rounded-br-[200px] w-full max-w-[539px] min-h-[297px] bg-[#445133] text-white">
                <p className='pl-17 py-10 mb-6 font-inter italic text-sm md:text-[16px] leading-relaxed'>"BioMap Leyte is such a great initiative! I've learned so much about the wildlife around my town, and it's fun seeing my sightings appear on the map. It makes me feel like I'm actually helping protect Leyte's environment in my own small way."</p>
                <p className='mt-8 pl-8 font-inter text-sm md:text-base'>— Rafael S., College Student & Hiker</p>
            </div>
        </div>
    </div>
  )
}

export default Testimonials