"use client";

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, User, Lock, Bell } from 'lucide-react';
import AdminTimetableTab from '@/components/admin/AdminTimetableTab';
import AdminLocationsTab from '@/components/admin/AdminLocationsTab';
import AdminTeachersTab from '@/components/admin/AdminTeachersTab';
import AdminUpdatesTab from '@/components/admin/AdminUpdatesTab';
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsLoggedIn(true);
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        router.refresh();
      } else {
        toast({
          variant: "destructive",
          title: "Error",
          description: data.error || "Invalid credentials",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "An error occurred during login",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[80vh]">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your credentials to access the admin panel
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    className="pl-9"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="pl-9"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Admin Panel</h1>
          <p className="text-gray-600 dark:text-gray-300">
            Manage timetables, locations, teachers, and updates.
          </p>
        </div>
        <Button variant="outline" onClick={() => setIsLoggedIn(false)}>Logout</Button>
      </div>

      <Tabs defaultValue="timetable" className="w-full">
        <TabsList className="grid grid-cols-4 w-full max-w-2xl mx-auto mb-8">
          <TabsTrigger value="timetable" className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            Timetable
          </TabsTrigger>
          <TabsTrigger value="locations" className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            Locations
          </TabsTrigger>
          <TabsTrigger value="teachers" className="flex items-center">
            <User className="h-4 w-4 mr-2" />
            Teachers
          </TabsTrigger>
          <TabsTrigger value="updates" className="flex items-center">
            <Bell className="h-4 w-4 mr-2" />
            Updates
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="timetable">
          <AdminTimetableTab />
        </TabsContent>
        
        <TabsContent value="locations">
          <AdminLocationsTab />
        </TabsContent>
        
        <TabsContent value="teachers">
          <AdminTeachersTab />
        </TabsContent>

        <TabsContent value="updates">
          <AdminUpdatesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminPage;