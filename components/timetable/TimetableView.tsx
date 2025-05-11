"use client";

import React, { useState } from 'react';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, User, BookOpen, Info } from 'lucide-react';

const TimetableView = () => {
  const [view, setView] = useState<'list' | 'grid'>('list');
  
  const getClassTypeBadge = (type: string) => {
    switch (type.toLowerCase()) {
      case 'lecture':
        return <Badge variant="outline" className="border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-400">Lecture</Badge>;
      case 'lab':
        return <Badge variant="outline" className="border-green-300 text-green-700 dark:border-green-700 dark:text-green-400">Lab</Badge>;
      case 'tutorial':
        return <Badge variant="outline" className="border-purple-300 text-purple-700 dark:border-purple-700 dark:text-purple-400">Tutorial</Badge>;
      default:
        return <Badge variant="outline">Other</Badge>;
    }
  };

  const getSemesterBadge = (semester: number) => {
    return (
      <Badge variant="secondary" className="ml-2">
        Semester {semester}
      </Badge>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Weekly Schedule</h3>
        <div className="flex space-x-2">
          <Button 
            variant={view === 'list' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setView('list')}
          >
            List View
          </Button>
          <Button 
            variant={view === 'grid' ? 'default' : 'outline'} 
            size="sm" 
            onClick={() => setView('grid')}
          >
            Grid View
          </Button>
        </div>
      </div>

      <Tabs defaultValue="monday" className="w-full">
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="monday">Monday</TabsTrigger>
          <TabsTrigger value="tuesday">Tuesday</TabsTrigger>
          <TabsTrigger value="wednesday">Wednesday</TabsTrigger>
          <TabsTrigger value="thursday">Thursday</TabsTrigger>
          <TabsTrigger value="friday">Friday</TabsTrigger>
        </TabsList>

        {['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].map((day) => (
          <TabsContent key={day} value={day} className="space-y-4">
            <Card className="p-4">
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No classes scheduled for {day.charAt(0).toUpperCase() + day.slice(1)}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TimetableView;