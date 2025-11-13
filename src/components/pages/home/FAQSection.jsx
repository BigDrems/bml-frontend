import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is BioMap Leyte?",
      answer: "BioMap Leyte is a web and mobile platform that maps and tracks wildlife sightings across Leyte, Philippines, promoting citizen participation, biodiversity awareness, and data-driven conservation."
    },
    {
      question: "Who can contribute sightings?",
      answer: "Anyone interested in wildlife and nature can contribute sightings to BioMap Leyte. We encourage citizen scientists, nature enthusiasts, researchers, and local communities to participate."
    },
    {
      question: "How is the data used?",
      answer: "The data collected through BioMap Leyte is used to monitor biodiversity, support conservation efforts, and provide valuable insights for researchers and policymakers."
    },
    {
      question: "Do I need to be an expert to identify a species?",
      answer: "No, you don't need to be an expert. BioMap Leyte welcomes all contributions, and our community and experts help verify and identify species."
    }
  ];

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
          {faqs.map((faq, index) => (
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