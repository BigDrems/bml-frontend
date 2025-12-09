import React from 'react'
import { TESTIMONIALS_DATA } from './const'

function Testimonials() {
  return (
    <div className='flex flex-col items-center mt-12 md:mt-22 px-4'>
        <h1 className='text-2xl md:text-[40px] font-inter font-black text-center mb-8'>From Our Community</h1>
        <div className='grid items-center justify-center grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl'>
          {TESTIMONIALS_DATA.map((testimonial) => (
            <div 
              key={testimonial.id}
              className={`border border-gray-300 rounded-lg p-6 shadow-lg ${testimonial.roundedClass} w-full max-w-[539px] min-h-[297px] bg-[#445133] text-white`}
            >
              <p className={`mb-4 font-inter italic text-sm md:text-[16px] leading-relaxed ${testimonial.id === 1 ? 'pr-10' : 'pl-17 py-10 mb-6'}`}>
                "{testimonial.quote}"
              </p>
              {testimonial.description && (
                <p className='mb-4 px-2 font-inter italic text-sm md:text-[16px] leading-relaxed'>
                  "{testimonial.description}"
                </p>
              )}
              <p className={`font-inter text-sm md:text-base ${testimonial.id === 1 ? 'ml-22 mt-6' : 'mt-8 pl-8'}`}>
                — {testimonial.author}, {testimonial.role}
              </p>
            </div>
          ))}
        </div>
    </div>
  )
}

export default Testimonials