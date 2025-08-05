import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface CarouselItem {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
  buttonText?: string;
  order: number;
  isActive: boolean;
  language: string;
}

interface CarouselProps {
  language?: string;
  autoplay?: boolean;
  autoplayInterval?: number;
  className?: string;
}

export default function Carousel({ 
  language = 'eng', 
  autoplay = true, 
  autoplayInterval = 5000,
  className = ''
}: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoplay);

  const { data: carousels = [], isLoading } = useQuery({
    queryKey: ['/api/carousels/active', language],
    queryFn: () => 
      fetch(`/api/carousels/active?language=${language}`)
        .then(res => res.json()),
  });

  // Auto-play functionality
  useEffect(() => {
    if (!isPlaying || carousels.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carousels.length);
    }, autoplayInterval);

    return () => clearInterval(interval);
  }, [isPlaying, carousels.length, autoplayInterval]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? carousels.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carousels.length);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  if (isLoading) {
    return (
      <div className={`relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gray-200 animate-pulse ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-gray-500">Loading carousel...</div>
        </div>
      </div>
    );
  }

  if (!carousels || carousels.length === 0) {
    return (
      <div className={`relative w-full h-96 md:h-[500px] lg:h-[600px] bg-gradient-to-r from-blue-600 to-blue-800 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Welcome to MarineBioGroup</h2>
            <p className="text-xl opacity-90">Marine Nano-Fiber Technology Pioneer</p>
          </div>
        </div>
      </div>
    );
  }

  const currentSlide = carousels[currentIndex];

  return (
    <div className={`relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${currentSlide.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Content */}
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl">
              <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {currentSlide.subtitle && (
                  <p className="text-sm sm:text-base md:text-lg font-medium uppercase tracking-wider mb-3 opacity-90">
                    {currentSlide.subtitle}
                  </p>
                )}
                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                  {currentSlide.title}
                </h1>
                <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto leading-relaxed">
                  {currentSlide.description}
                </p>
                {currentSlide.linkUrl && currentSlide.buttonText && (
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold"
                    onClick={() => window.open(currentSlide.linkUrl, '_blank')}
                  >
                    {currentSlide.buttonText}
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Controls */}
      {carousels.length > 1 && (
        <>
          {/* Previous/Next Buttons */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
            onClick={goToPrevious}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
            {carousels.map((_: CarouselItem, index: number) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>

          {/* Play/Pause Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute bottom-6 right-6 bg-white/20 hover:bg-white/30 text-white border-0"
            onClick={togglePlayPause}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
        </>
      )}

      {/* Progress Bar */}
      {carousels.length > 1 && isPlaying && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
          <motion.div
            className="h-full bg-blue-500"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              duration: autoplayInterval / 1000, 
              ease: 'linear',
              repeat: Infinity 
            }}
            key={currentIndex}
          />
        </div>
      )}
    </div>
  );
}