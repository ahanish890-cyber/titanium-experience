import React, { useState, useRef, useEffect, useCallback } from 'react';
import './Highlights.css';

export default function Highlights() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const carouselRef = useRef(null);
  const autoPlayRef = useRef(null);
  const nextTimeoutRef = useRef(null);

  const slides = [
    {
      id: 1,
      title: 'Titanium Design',
      body: 'Engineered for precision. Built to last. Designed to inspire.',
      image: `${import.meta.env.BASE_URL}Phone-9.png`,
    },
    {
      id: 2,
      title: 'Enter A17 Pro.',
      body: 'Gaming-changing chip. Professional-grade imaging technology.',
      image: `${import.meta.env.BASE_URL}chip.png`,
    },
    {
      id: 3,
      title: 'Pro Performance',
      body: 'All-new Action button.What will yours do?.',
      image: `${import.meta.env.BASE_URL}Phone-5.png`,
    },
    {
      id: 4,
      title: 'Next-gen potraits.',
      body: 'Stunning visuals. Exceptional brightness. Premium quality.',
      image: `${import.meta.env.BASE_URL}Phone-11.png`,
    },
  ];

  // Auto-play with proper interval management
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
      return;
    }

    // Clear any existing intervals
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);

    // Set new interval
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4500);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      if (nextTimeoutRef.current) clearTimeout(nextTimeoutRef.current);
    };
  }, [isPlaying, slides.length]);

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const handleDotClick = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext]);

  // Calculate carousel offset for smooth scrolling
  const getCarouselOffset = () => {
    if (!carouselRef.current) return 0;
    
    const containerWidth = carouselRef.current.parentElement?.offsetWidth || 0;
    const cardWidth = containerWidth * 0.8; // 80% width from CSS
    const gap = 28; // Updated gap value to match CSS
    const totalCardWidth = cardWidth + gap;
    
    return -(currentSlide * totalCardWidth);
  };

  const carouselOffset = getCarouselOffset();

  return (
    <section className="highlights">
      <div className="highlights-container">
        {/* Header */}
        <div className="highlights-header">
          <h2 className="highlights-title">Get the highlights.</h2>
         
        </div>

        {/* Carousel */}
        <div className="carousel-wrapper">
          <div 
            className="carousel" 
            ref={carouselRef}
            style={{
              transform: `translate3d(${carouselOffset}px, 0, 0)`,
            }}
          >
            {slides.map((slide) => (
              <div key={slide.id} className="highlight-card">
                <div className="card-inner">
                  <div className="card-text">
                    <h3 className="card-title">{slide.title}</h3>
                    <p className="card-body">{slide.body}</p>
                  </div>
                  <div className="card-image">
                    <img src={slide.image} alt={slide.title} />
                  </div>
                </div>
                <div className="card-vignette" />
                <div className="card-glow" />
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="carousel-controls">
          <div className="pagination-wrapper">
            <div className="pagination">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`pagination-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                  aria-label={`Slide ${index + 1}`}
                />
              ))}
            </div>
          </div>

          <button
            className="play-pause-btn"
            onClick={handlePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
