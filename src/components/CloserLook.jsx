import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import './CloserLook.css';
import PhonePlayer from './PhonePlayer';

export default function CloserLook() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const phoneRef = useRef(null);
  const storyHeadingRef = useRef(null);
  const gridItemsRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for lazy animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateIn();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const animateIn = () => {
    const tl = gsap.timeline();

    tl.from(headingRef.current, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power3.out',
    })
      .from(
        phoneRef.current,
        {
          opacity: 0,
          scale: 0.92,
          y: 60,
          duration: 1,
          ease: 'power3.out',
        },
        0.2
      );

    // Animate story section
    if (storyHeadingRef.current) {
      tl.from(
        storyHeadingRef.current,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
        },
        0.5
      );
    }

    // Animate grid items
    if (gridItemsRef.current.length > 0) {
      tl.from(
        gridItemsRef.current,
        {
          opacity: 0,
          scale: 0.95,
          y: 40,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.15,
        },
        0.7
      );
    }
  };

  return (
    <section className="closer-look" ref={sectionRef}>
      <div className="closer-look-container">
        <div className="closer-look-content">
          <h2 className="closer-look-heading" ref={headingRef}>
            Take a closer look.
          </h2>

          <div className="closer-look-phone-wrapper">
            <div className="phone-container" ref={phoneRef}>
              <img
                src={`${import.meta.env.BASE_URL}Phone.png`}
                alt="iPhone 15 Pro"
                className="phone-image"
              />
              <div className="phone-glow" />
              <div className="phone-shadow" />
            </div>
          </div>

          <p className="phone-caption">iPhone 15 Pro in Titanium</p>
        </div>

        {/* Explore the Full Story Section */}
        <div className="story-section">
          <h3 className="story-heading" ref={storyHeadingRef}>
            Explore the full story.
          </h3>

          <h2 className="iphone-heading" ref={(el) => gridItemsRef.current[0] = el}>
            iPhone.<br />
            Forged in titanium.
          </h2>
        <div className='feature-grid'>
          <div className="features-grid">
            <div className="grid-item large-item" ref={(el) => gridItemsRef.current[1] = el}>
              <div className="grid-image-wrapper">
                <img src={`${import.meta.env.BASE_URL}Phone-4.jpg`} alt="iPhone Design" className="grid-image" />
              </div>
            </div>
          </div>

          <div className="features-grid-bottom">
            <div className="grid-item-bottom" ref={(el) => gridItemsRef.current[2] = el}>
              <div className="grid-image-wrapper">
                <img src={`${import.meta.env.BASE_URL}Phone-2.jpg`} alt="Camera System" className="grid-image" />
              </div>
            </div>

            <div className="grid-item-bottom" ref={(el) => gridItemsRef.current[3] = el}>
              <div className="grid-image-wrapper">
                <img src={`${import.meta.env.BASE_URL}Phone-3.jpg`} alt="Design Detail" className="grid-image" />
              </div>
            </div>
          </div>

          <div className="features-text-grid">
            <div className="text-card" ref={(el) => gridItemsRef.current[4] = el}>
              <p className="text-card-content">
                <span className="text-label">iPhone 15 Pro is</span> the first iPhone to feature an aerospace-grade titanium design using the
              </p>
            </div>

            <div className="text-card" ref={(el) => gridItemsRef.current[5] = el}>
              <p className="text-card-content">
                <span className="text-label">Titanium has one</span> of the best strength-to-weight ratios of any metal, making these our lightest Pro
              </p>
            </div>
          </div>
        </div>

          {/* Chip Section */}
          <div className="chip-section">
            <div className="chip-image-container" ref={(el) => gridItemsRef.current[6] = el}>
              <img src={`${import.meta.env.BASE_URL}chip.png`} alt="A17 Pro Chip" className="chip-image" />
            </div>

            <div className="chip-content" ref={(el) => gridItemsRef.current[7] = el}>
              <h3 className="chip-heading">
                A17 Pro chip.<br />
                A monster win for gaming.
              </h3>
              <p className="chip-description">
                It's here. The biggest redesign in the history of Apple GPUs.
              </p>
            </div>

            {/* Premium Phone Player */}
            <div className="phone-player-wrapper" ref={(el) => gridItemsRef.current[8] = el}>
              <PhonePlayer 
                frame={`${import.meta.env.BASE_URL}frame-phone.png`}
                video={`${import.meta.env.BASE_URL}game.mp4`}
                screen={{
                  left: '7.3%',
                  top: '20.6%',
                  width: '86.8%',
                  height: '58%',
                  radius: '38px'
                }}
                debug={false}
              />
            </div>

            {/* Gaming Content Section */}
            <div className="gaming-content-section" ref={(el) => gridItemsRef.current[9] = el}>
            <div className='gaming-text'>
              <p className="game-title">Honkai: Star Rail</p>

              <div className="gaming-content-grid">
                <div className="gaming-text-card">
                  <p className="gaming-description">
                    A17 Pro is an entirely new class of iPhone chip that delivers our <span className="highlight">best graphic performance by far</span>. Mobile games will look and feel so immersive, with incredibly detailed environments and characters.
                  </p>
                </div>

                <div className="gaming-spec-card">
                  <p className="spec-label">New</p>
                  <h3 className="spec-title">Pro-class GPU</h3>
                  <p className="spec-detail">with 6 cores</p>
                </div>
              </div>
            </div>
               
              {/* Footer */}
              <div className="closer-look-footer">

                <div className="footer-bottom">
                  <p className="copyright">Copyright © 2024 Apple Inc. All rights reserved.</p>
                  <div className="footer-links">
                    <a href="#" className="footer-policy-link">Privacy Policy</a>
                    <a href="#" className="footer-policy-link">Terms of Use</a>
                    <a href="#" className="footer-policy-link">Sales Policy</a>
                    <a href="#" className="footer-policy-link">Legal</a>
                    <a href="#" className="footer-policy-link">Site Map</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
