"use client";

import React, { useState } from 'react';
import { Search, MapPin, Clock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock results - in a real app, this would come from your API
  const mockClasses = [
    { id: 1, course: 'CS-101', name: 'Introduction to Programming', location: 'Room 101', time: '9:00 AM - 10:30 AM', days: 'Mon, Wed', teacher: 'Dr. Ahmed Khan' },
    { id: 2, course: 'CS-201', name: 'Data Structures', location: 'Lab 3', time: '11:00 AM - 12:30 PM', days: 'Tue, Thu', teacher: 'Dr. Fatima Ali' },
    { id: 3, course: 'CS-301', name: 'Database Systems', location: 'Room 204', time: '2:00 PM - 3:30 PM', days: 'Mon, Wed, Fri', teacher: 'Prof. Muhammad Usman' },
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800/50 rounded-xl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Find What You Need</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Quickly search for classes, rooms, or teachers to get all the information you need.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search for a class, room, or teacher..."
              className="pl-10 py-6 text-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700">
              Search
            </Button>
          </div>

          <Tabs defaultValue="classes">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="classes">Classes</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="teachers">Teachers</TabsTrigger>
            </TabsList>
            
            <TabsContent value="classes" className="mt-6">
              <div className="grid gap-4">
                {mockClasses.map((cls) => (
                  <Card key={cls.id} className="overflow-hidden transition-all hover:shadow-md">
                    <CardHeader className="bg-emerald-50 dark:bg-emerald-900/20 pb-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-emerald-700 dark:text-emerald-400">{cls.course}</CardTitle>
                          <CardDescription className="text-base font-medium text-gray-800 dark:text-gray-200">{cls.name}</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                          <span className="text-sm">{cls.location}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                          <span className="text-sm">{cls.time} ({cls.days})</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400 mr-2" />
                          <span className="text-sm">{cls.teacher}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="rooms" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Rooms</CardTitle>
                  <CardDescription>
                    Find available rooms and their locations.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Search for a room to see its details, location, and schedule.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="teachers" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Teachers</CardTitle>
                  <CardDescription>
                    Find teachers and their class schedules.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Search for a teacher to see their contact information and teaching schedule.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;