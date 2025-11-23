import React, { useState, useEffect } from 'react';
import { HERO_SLIDES } from '../constants';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);

  return (
    <div className="relative rounded-lg overflow-hidden shadow-sm my-4 bg-white group">
      <div 
        className="flex transition-transform duration-500 ease-out h-[200px] md:h-[380px]"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {HERO_SLIDES.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0 relative">
            <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-8 md:px-16 text-white">
              <h2 className="text-2xl md:text-5xl font-bold mb-2 md:mb-4 drop-shadow-md">{slide.title}</h2>
              <p className="text-lg md:text-xl drop-shadow-sm mb-4 md:mb-6">{slide.subtitle}</p>
              <button className="bg-emag-blue hover:bg-emag-darkBlue text-white px-6 py-2 rounded-full font-semibold w-max transition-colors">
                Разгледай
              </button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={prevSlide} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full shadow-md text-gray-800 opacity-0 group-hover:opacity-100 transition-opacity">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${currentSlide === idx ? 'bg-white' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
