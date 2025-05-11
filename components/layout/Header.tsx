"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, MapPin, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ModeToggle } from '@/components/layout/mode-toggle';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md' 
          : 'bg-white dark:bg-gray-900'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-3 md:py-4">
          {/* University Name and Department */}
          <div className="flex flex-col">
            <h1 className="text-sm sm:text-base md:text-lg font-semibold text-emerald-800 dark:text-emerald-400">
              UNIVERSITY OF AGRICULTURE FAISALABAD
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              Department of Computer Science
            </p>
          </div>

          {/* K.Navigator Logo (smaller and in corner) */}
          <div className="absolute right-16 md:right-24 top-4 md:top-5">
            <div className="bg-emerald-600 dark:bg-emerald-700 px-2 py-1 rounded-md shadow-sm transform rotate-[-2deg]">
              <span className="text-xs md:text-sm font-bold text-white">K.Navigator</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Home
            </Link>
            <Link href="/timetable" className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Timetable
            </Link>
            <Link href="/locations" className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Locations
            </Link>
            <Link href="/teachers" className="text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
              Teachers
            </Link>
            <ModeToggle />
            <Link href="/admin" passHref>
              <Button variant="outline" size="sm" className="ml-2">
                <User className="h-4 w-4 mr-1" />
                Admin
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top">
            <ul className="space-y-4">
              <li>
                <Link 
                  href="/" 
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/timetable" 
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Timetable
                </Link>
              </li>
              <li>
                <Link 
                  href="/locations" 
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MapPin className="h-4 w-4 mr-2" />
                  Locations
                </Link>
              </li>
              <li>
                <Link 
                  href="/teachers" 
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Teachers
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin" 
                  className="flex items-center text-gray-700 dark:text-gray-200 hover:text-emerald-600 dark:hover:text-emerald-400"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              </li>
              <li className="pt-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Toggle theme</span>
                  <ModeToggle />
                </div>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;