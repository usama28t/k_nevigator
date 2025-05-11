import React from 'react';
import TeachersList from '@/components/teachers/TeachersList';
import TeacherFilter from '@/components/teachers/TeacherFilter';

export const metadata = {
  title: 'Teachers - K.Navigator',
  description: 'Find information about teachers in the CS Department at UAF',
};

export default function TeachersPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Teacher Directory</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Find information about teachers, their office hours, and contact details.
        </p>
      </div>
      
      <TeacherFilter />
      <TeachersList />
    </div>
  );
}