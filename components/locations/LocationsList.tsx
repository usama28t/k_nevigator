"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Search, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const LocationsList = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Locations Directory</CardTitle>
        <div className="relative mt-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search locations..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="classrooms">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
            <TabsTrigger value="labs">Labs</TabsTrigger>
            <TabsTrigger value="offices">Offices</TabsTrigger>
          </TabsList>
          
          {['classrooms', 'labs', 'offices'].map((type) => (
            <TabsContent key={type} value={type} className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
              <div className="text-center text-gray-500 dark:text-gray-400 py-8">
                No {type} found
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocationsList;