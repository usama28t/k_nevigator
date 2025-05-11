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

const TeacherFilter = () => {
  const [designation, setDesignation] = useState('');
  const [subject, setSubject] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilter = () => {
    // In a real application, this would filter the teachers data
    console.log('Filtering with:', { designation, subject, searchQuery });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center">
          <Filter className="h-5 w-5 mr-2" />
          Filter Teachers
        </h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            setDesignation('');
            setSubject('');
            setSearchQuery('');
          }}
        >
          Reset Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Designation</label>
          <Select value={designation} onValueChange={setDesignation}>
            <SelectTrigger>
              <SelectValue placeholder="Select Designation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="professor">Professor</SelectItem>
              <SelectItem value="associate-professor">Associate Professor</SelectItem>
              <SelectItem value="assistant-professor">Assistant Professor</SelectItem>
              <SelectItem value="lecturer">Lecturer</SelectItem>
              <SelectItem value="lab-instructor">Lab Instructor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Subject</label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger>
              <SelectValue placeholder="Select Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="programming">Programming</SelectItem>
              <SelectItem value="database">Database Systems</SelectItem>
              <SelectItem value="algorithms">Algorithms</SelectItem>
              <SelectItem value="networks">Computer Networks</SelectItem>
              <SelectItem value="ai">Artificial Intelligence</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email..."
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

export default TeacherFilter;