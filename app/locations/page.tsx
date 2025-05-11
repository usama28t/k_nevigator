import React from 'react';
import LocationsMap from '@/components/locations/LocationsMap';
import LocationsList from '@/components/locations/LocationsList';

export const metadata = {
  title: 'Locations - K.Navigator',
  description: 'Find classroom and lab locations in the CS Department at UAF',
};

export default function LocationsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Classroom Locations</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find and navigate to classrooms, labs, and other facilities in the CS department.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <LocationsMap />
        <LocationsList />
      </div>
    </div>
  );
}