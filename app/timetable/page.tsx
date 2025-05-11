import React from 'react';
import TimetableView from '@/components/timetable/TimetableView';
import TimetableFilter from '@/components/timetable/TimetableFilter';

export const metadata = {
  title: 'Timetable - K.Navigator',
  description: 'View and navigate class schedules for CS Department at UAF',
};

export default function TimetablePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Class Timetable</h1>
        <p className="text-gray-600 dark:text-gray-300">
          View and navigate through the CS department class schedule.
        </p>
      </div>
      
      <TimetableFilter />
      <TimetableView />
    </div>
  );
}