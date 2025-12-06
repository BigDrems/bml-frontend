import React from 'react';
import { Utensils, Ruler, Weight, Hourglass } from 'lucide-react';

export const KeyFacts = ({ species }) => {
  const facts = [
    {
      icon: <Utensils className="w-6 h-6 text-[#34FB02]" />,
      label: 'Diet',
      value: species.diet || 'Unknown',
    },
    {
      icon: <Ruler className="w-6 h-6 text-[#34FB02]" />,
      label: 'Length',
      value: species.length || 'Unknown',
    },
    {
      icon: <Weight className="w-6 h-6 text-[#34FB02]" />,
      label: 'Weight',
      value: species.weight || 'Unknown',
    },
    {
      icon: <Hourglass className="w-6 h-6 text-[#34FB02]" />,
      label: 'Lifespan',
      value: species.lifespan || 'Unknown',
    },
  ];

  return (
    <div className="py-8">
      <h3 className="text-2xl font-bold mb-6 text-[#445133] font-roboto-serif">Key Facts</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {facts.map((fact, index) => (
          <div 
            key={index} 
            className="bg-[#445133] p-5 rounded-[20px] flex flex-col items-center shadow-green hover:-translate-y-1 transition-transform duration-300 min-h-[180px]"
          >
            <div className="mb-3 bg-white/10 p-3 rounded-full">{fact.icon}</div>
            <span className="text-xs text-[#90BE54] uppercase tracking-widest font-bold mb-2">{fact.label}</span>
            <span className="font-semibold text-white text-sm font-inter leading-relaxed text-center flex-1">{fact.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
