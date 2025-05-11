import React from 'react';
import { CalendarClock, MapPin, Users, Clock, Building, BookOpen, Compass, Bookmark } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <CalendarClock className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Class Schedules',
      description: 'View detailed timetables for all CS classes with accurate timing information.'
    },
    {
      icon: <MapPin className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Room Locations',
      description: 'Never get lost again with precise classroom and lab location information.'
    },
    {
      icon: <Users className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Teacher Directory',
      description: 'Find information about your instructors, including office hours and contact details.'
    },
    {
      icon: <Building className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Building Navigation',
      description: 'Navigate easily through different buildings in the CS department.'
    },
    {
      icon: <Clock className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Real-time Updates',
      description: 'Stay informed with real-time updates about schedule changes or room reassignments.'
    },
    {
      icon: <BookOpen className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Course Information',
      description: 'Access detailed information about courses, prerequisites, and required materials.'
    },
    {
      icon: <Compass className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Interactive Maps',
      description: 'Use interactive maps to find the shortest path to your next class.'
    },
    {
      icon: <Bookmark className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />,
      title: 'Saved Favorites',
      description: 'Save your regular classes for quick access to schedule and location information.'
    }
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Why Use K.Navigator?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our platform offers everything CS students need to navigate their academic journey efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 transition-all hover:shadow-md hover:border-emerald-200 dark:hover:border-emerald-800"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;