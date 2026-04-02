'use client';

import { useState, useEffect } from 'react';
import type { SiteConfig } from '@/lib/types';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Відстеження активної секції за допомогою Intersection Observer
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Секція активна коли вона в верхній частині viewport
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection(sectionId);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Спостерігати за всіма секціями
    const sections = ['home', 'about', 'shop', 'tourism', 'masters', 'contact'];
    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  // Закрити меню при зміні розміру екрану
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Блокувати scroll коли меню відкрите
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    // Smooth scroll з offset для fixed header
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80; // Висота fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { href: '#home', label: config.navigation.home },
    { href: '#about', label: config.navigation.about },
    { href: '#shop', label: config.navigation.shop },
    { href: '#tourism', label: config.navigation.tourism },
    { href: '#masters', label: config.navigation.masters },
    { href: '#events', label: config.navigation.events },
    { href: '#contact', label: config.navigation.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-display font-bold text-eco-dark">
            {config.siteName}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className={`text-eco-dark hover:text-eco-light transition-all duration-300 ${
                    isActive
                      ? 'text-eco-light font-semibold border-b-2 border-eco-light'
                      : ''
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-eco-dark focus:outline-none focus:ring-2 focus:ring-eco-light rounded-lg p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              // Close icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-64 bg-eco-dark z-50 transform transition-transform duration-300 ease-in-out md:hidden
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white focus:outline-none focus:ring-2 focus:ring-eco-mint rounded-lg p-2"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Menu links */}
        <nav className="flex flex-col pt-20 px-6 space-y-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.replace('#', '');
            return (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className={`text-white text-lg font-medium hover:text-eco-mint transition-all duration-300 ${
                  isActive
                    ? 'text-eco-mint border-l-4 border-eco-mint pl-4 -ml-4'
                    : ''
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Social links in mobile menu */}
        <div className="absolute bottom-8 left-6 right-6">
          <p className="text-eco-mint text-sm font-semibold mb-3">Соціальні мережі</p>
          <div className="flex space-x-6">
            {config.facebook && (
              <a
                href={config.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-eco-light hover:text-eco-mint transition-colors"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook text-2xl"></i>
              </a>
            )}
            {config.instagram && (
              <a
                href={config.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-eco-light hover:text-eco-mint transition-colors"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram text-2xl"></i>
              </a>
            )}
            {config.telegram && (
              <a
                href={`https://t.me/${config.telegram.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-eco-light hover:text-eco-mint transition-colors"
                aria-label="Telegram"
              >
                <i className="fab fa-telegram text-2xl"></i>
              </a>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
