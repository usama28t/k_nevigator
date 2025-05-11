import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-4">About K.Navigator</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
              K.Navigator is a specialized tool for Computer Science students at UAF to easily navigate 
              class schedules, find classroom locations, and identify teachers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400 transition">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/timetable" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Timetable
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Classroom Locations
                </Link>
              </li>
              <li>
                <Link href="/teachers" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Teacher Directory
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-gray-600 dark:text-gray-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition">
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-emerald-700 dark:text-emerald-400 mb-4">Contact Information</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">
                  Department of Computer Science,<br />
                  University of Agriculture Faisalabad,<br />
                  Faisalabad, Pakistan
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">+92-41-9200161</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-emerald-600 dark:text-emerald-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">cs@uaf.edu.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} K.Navigator. All rights reserved. Made with ❤️ for UAF Computer Science students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;