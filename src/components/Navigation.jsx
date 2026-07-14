import React from 'react';
import './Navigation.css';

export default function Navigation() {
  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-left">
          <button className="nav-logo" aria-label="Apple">
            <img src={`${import.meta.env.BASE_URL}apple-logo.png`} alt="Apple" className="nav-logo-image" />
          </button>
        </div>
        
        <div className="nav-center">
          <a href="#store" className="nav-link">Store</a>
          <a href="#mac" className="nav-link">Mac</a>
          <a href="#iphone" className="nav-link">iPhone</a>
          <a href="#support" className="nav-link">Support</a>
        </div>
        
        <div className="nav-right">
          <button className="nav-icon" aria-label="Search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M10 10L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
          <button className="nav-icon" aria-label="Bag">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="4" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M5 4V3C5 2.45 5.45 2 6 2H10C10.55 2 11 2.45 11 3V4" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}
