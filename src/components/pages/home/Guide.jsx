import React from 'react'
import { GUIDE_STEPS } from './const'

function Guide() {
  return (
    <div className='flex flex-col mt-20 md:mt-16 lg:mt-22 px-4 md:px-6 lg:px-0'>
        <h3 className='font-bold items-center font-inter text-[40px]'>How It Works</h3>
        <p className='font-normal font-inter text-[16px] md:text-[20px] lg:text-[24px] mt-2 md:mt-3'>
            Contributing to BioMap Leyte is easy. Follow these simple steps to add your discoveries
            to our growing map of biodiversity
        </p>
        <div className='flex justify-center mt-6 md:mt-8'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-18 items-center justify-items-center md:[&>*:nth-child(3)]:col-span-2 md:[&>*:nth-child(3)]:mx-auto lg:[&>*:nth-child(3)]:col-span-1 lg:[&>*:nth-child(3)]:mx-0 max-w-[1200px]'>
                {GUIDE_STEPS.map((step) => {
                  const IconComponent = step.Icon;
                  return (
                    <div key={step.id} className='flex flex-col items-center p-4 md:p-6 bg-[#445133] rounded-[5px] w-full max-w-[310px] shadow-md'>
                        <div className='text-white rounded-full p-3 md:p-4 mb-3 md:mb-4'>
                            <IconComponent size={40} />
                        </div>
                        <h3 className='text-white text-[20px] md:text-[22px] lg:text-[24px] font-inter font-bold mb-2 text-center'>{step.title}</h3>
                        <p className='text-white text-[12px] md:text-[13px] font-inter text-center'>{step.description}</p>
                    </div>
                  );
                })}
            </div>
        </div>
    </div>

  )
}

export default Guide