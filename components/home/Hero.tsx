"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, CalendarClock, Search } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    <section className="py-12 md:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Never Get Lost <span className="text-emerald-600 dark:text-emerald-400">Again</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Easily find your classes, locate rooms, and check your CS department schedule with K.Navigator.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/timetable" passHref>
              <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700">
                <CalendarClock className="mr-2 h-5 w-5" />
                View Timetable
              </Button>
            </Link>
            <Link href="/locations" passHref>
              <Button size="lg" variant="outline">
                <MapPin className="mr-2 h-5 w-5" />
                Find Locations
              </Button>
            </Link>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-xl"
        >
          {/* Hero Image - A stylized campus map or classroom */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 opacity-90 dark:opacity-80"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-6 text-center">
            <CalendarClock className="h-16 w-16 mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">UAF CS Department</h2>
            <p className="text-lg mb-6">Your personal navigation assistant</p>
            <div className="bg-white/20 backdrop-blur-sm p-4 rounded-lg w-full max-w-sm">
              <div className="relative flex items-center">
                <Search className="absolute left-3 h-5 w-5 text-white" />
                <input 
                  type="text" 
                  placeholder="Search for a class or room..." 
                  className="w-full bg-transparent border border-white/30 rounded-full py-2 pl-10 pr-4 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;