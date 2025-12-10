import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQ_DATA } from './const';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className=" py-19 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600">
            Find answers to common questions about our services
          </p>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((faq, index) => (
            <div
              key={index}
              className="bg-[#445133] rounded-lg shadow-md overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center"
              >
                <span className="font-semibold text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-white transition-transform duration-200 flex-shrink-0 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-48' : 'max-h-0'
                }`}
              >
                <div className="px-6 pb-4 text-white">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default FAQSection;