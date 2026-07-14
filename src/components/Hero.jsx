import React from 'react';
import './Hero.css';

export default function Hero() {

  console.log("BASE_URL =", import.meta.env.BASE_URL);
console.log("Hero URL =", `${import.meta.env.BASE_URL}hero.png`);

  return (
    <section className="hero">
      <div className="hero-wrapper">
        <div className="hero-eyebrow">iPhone 15 Pro</div>

        <h1 className="hero-title">
          PRO
          <div className="hero-image-wrapper">
            <img src={`${import.meta.env.BASE_URL}hero.png`} alt="iPhone 15 Pro Titanium" className="hero-image" />
          </div>
        </h1>
        <div className='hero-content'>
        <button className="hero-button">Buy</button>

        <p className="hero-price">From $199/ month or $999</p>
        </div>
      </div>
      
    </section>
  );
}
