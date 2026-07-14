import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './PhonePlayer.css';

export default function PhonePlayer({ 
  frame = `${import.meta.env.BASE_URL}frame.png`,
  video = `${import.meta.env.BASE_URL}game.mp4`,
  screen = {
    left: '9.3%',
    top: '12.6%',
    width: '81.2%',
    height: '74%',
    radius: '38px'
  },
  debug = false,
  className = ''
}) {
  const wrapperRef = useRef(null);
  const screenRef = useRef(null);
  const videoRef = useRef(null);
  const frameRef = useRef(null);
  const reflectionRef = useRef(null);
  const sectionRef = useRef(null);
  
  const [hasEntered, setHasEntered] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  // Section entrance animation trigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasEntered) {
          setHasEntered(true);
          animateEntrance();
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasEntered]);

  // Video play/pause based on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (videoRef.current) {
          if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
            videoRef.current.play().catch(() => {});
            setIsVideoVisible(true);
          } else {
            videoRef.current.pause();
            setIsVideoVisible(false);
          }
        }
      },
      { threshold: 0.2 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Entrance animation
  const animateEntrance = () => {
    if (!wrapperRef.current) return;

    gsap.from(wrapperRef.current, {
      opacity: 0,
      scale: 0.95,
      y: 40,
      duration: 1.2,
      ease: 'power3.out',
    });
  };

  // Floating effect on entire phone
  useEffect(() => {
    if (!wrapperRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    
    tl.to(wrapperRef.current, {
      y: -5,
      duration: 4,
      ease: 'sine.inOut',
    })
    .to(wrapperRef.current, {
      y: 0,
      duration: 4,
      ease: 'sine.inOut',
    });

    return () => tl.kill();
  }, []);

  // Glass reflection animation
  useEffect(() => {
    if (!reflectionRef.current) return;

    gsap.to(reflectionRef.current, {
      backgroundPosition: '100% center',
      duration: 12,
      ease: 'none',
      repeat: -1,
    });

    return () => {
      if (reflectionRef.current) {
        gsap.killTweensOf(reflectionRef.current);
      }
    };
  }, []);

  // Subtle video scale on scroll
  useEffect(() => {
    if (!isVideoVisible || !videoRef.current) return;

    const handleScroll = () => {
      if (!wrapperRef.current) return;

      const rect = wrapperRef.current.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

      if (isInViewport) {
        const progress = 1 - Math.max(0, rect.top / window.innerHeight);
        const scale = 1 + (Math.min(progress, 1) * 0.04);
        
        gsap.to(videoRef.current, {
          scale: scale,
          duration: 0.2,
          overwrite: 'auto',
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVideoVisible]);

  return (
    <div className={`phone-player ${className}`} ref={sectionRef}>
      <div className="phone-wrapper" ref={wrapperRef}>
        
        {/* Independent Screen Container */}
        <div 
          className={`phone-screen ${debug ? 'debug' : ''}`}
          ref={screenRef}
          style={{
            left: screen.left,
            top: screen.top,
            width: screen.width,
            height: screen.height,
            borderRadius: screen.radius,
          }}
        >
          {/* Video Layer */}
          <video
            ref={videoRef}
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="phone-video"
          />
          
        
        </div>

        {/* Phone Frame PNG - Top Layer */}
        <img
          ref={frameRef}
          src={frame}
          alt="Device Frame"
          className="phone-frame"
        />
      </div>
    </div>
  );
}
