"use client";

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Mail, 
  Clock, 
  MapPin, 
  PhoneCall, 
  BookOpen, 
  Calendar 
} from 'lucide-react';

const TeachersList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Card className="p-4">
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No teachers found
        </div>
      </Card>
    </div>
  );
};

export default TeachersList;