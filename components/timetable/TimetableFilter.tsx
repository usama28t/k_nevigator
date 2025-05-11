"use client";

import React, { useState } from 'react';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter } from 'lucide-react';

const TimetableFilter = () => {
  const [semester, setSemester] = useState('');
  const [day, setDay] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilter = () => {
    // In a real application, this would filter the timetable data
    console.log('Filtering with:', { semester, day, searchQuery });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Options
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setSemester('');
            setDay('');
            setSearchQuery('');
          }}
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Semester</label>
          <Select value={semester} onValueChange={setSemester}>
            <SelectTrigger>
              <SelectValue placeholder="Select Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1st Semester</SelectItem>
              <SelectItem value="2">2nd Semester</SelectItem>
              <SelectItem value="3">3rd Semester</SelectItem>
              <SelectItem value="4">4th Semester</SelectItem>
              <SelectItem value="5">5th Semester</SelectItem>
              <SelectItem value="6">6th Semester</SelectItem>
              <SelectItem value="7">7th Semester</SelectItem>
              <SelectItem value="8">8th Semester</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Day</label>
          <Select value={day} onValueChange={setDay}>
            <SelectTrigger>
              <SelectValue placeholder="Select Day" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monday">Monday</SelectItem>
              <SelectItem value="tuesday">Tuesday</SelectItem>
              <SelectItem value="wednesday">Wednesday</SelectItem>
              <SelectItem value="thursday">Thursday</SelectItem>
              <SelectItem value="friday">Friday</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by course, teacher, room..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <Button 
          className="bg-emerald-600 hover:bg-emerald-700"
          onClick={handleFilter}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default TimetableFilter;