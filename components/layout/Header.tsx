'use client';

import type { SiteConfig } from '@/lib/types';

interface HeaderProps {
  config: SiteConfig;
}

export function Header({ config }: HeaderProps) {

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
            <a href="#home" className="text-eco-dark hover:text-eco-light transition-colors">
              {config.navigation.home}
            </a>
            <a href="#about" className="text-eco-dark hover:text-eco-light transition-colors">
              {config.navigation.about}
            </a>
            <a href="#shop" className="text-eco-dark hover:text-eco-light transition-colors">
              {config.navigation.shop}
            </a>
            <a href="#tourism" className="text-eco-dark hover:text-eco-light transition-colors">
              {config.navigation.tourism}
            </a>
            <a href="#masters" className="text-eco-dark hover:text-eco-light transition-colors">
              {config.navigation.masters}
            </a>
            <a href="#events" className="text-eco-dark hover:text-eco-light transition-colors">
              {config.navigation.events}
            </a>
            <a href="#contact" className="text-eco-dark hover:text-eco-light transition-colors">
              {config.navigation.contact}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-eco-dark">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
