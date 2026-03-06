'use client';

import { useState } from 'react';
import styles from './Navigation.module.css';

function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer}>
        <div className={styles.logo}>
          <a href="#hero" onClick={(e) => handleNavClick(e, 'hero')}>
            Caleb Conner
          </a>
        </div>

        <button
          className={styles.hamburger}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksOpen : ''}`}>
          <li>
            <a href="#about" onClick={(e) => handleNavClick(e, 'hero')}>
              About
            </a>
          </li>
          <li>
            <a href="#experience" onClick={(e) => handleNavClick(e, 'experience')}>
              Experience
            </a>
          </li>
          <li>
            <a href="#skills" onClick={(e) => handleNavClick(e, 'skills')}>
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" onClick={(e) => handleNavClick(e, 'projects')}>
              Projects
            </a>
          </li>
          <li>
            <a href="#education" onClick={(e) => handleNavClick(e, 'education')}>
              Education
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navigation;
