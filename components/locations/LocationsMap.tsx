"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const LocationsMap = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const increaseZoom = () => {
    if (zoomLevel < 2) {
      setZoomLevel(zoomLevel + 0.2);
    }
  };
  
  const decreaseZoom = () => {
    if (zoomLevel > 0.6) {
      setZoomLevel(zoomLevel - 0.2);
    }
  };
  
  const resetZoom = () => {
    setZoomLevel(1);
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Department Map</CardTitle>
          <div className="flex space-x-2">
            <Button variant="outline" size="icon" onClick={decreaseZoom}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={resetZoom}>
              <Maximize className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={increaseZoom}>
              <ZoomIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="ground">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="ground">Ground Floor</TabsTrigger>
            <TabsTrigger value="first">1st Floor</TabsTrigger>
            <TabsTrigger value="second">2nd Floor</TabsTrigger>
          </TabsList>

          <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden" style={{ height: "500px" }}>
            <div 
              className="relative w-full h-full transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              {/* Ground Floor */}
              <TabsContent value="ground">
                <div className="absolute inset-10 flex">
                  <div className="relative w-full h-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg">
                    {/* Title */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium text-gray-400">
                      Ground Floor
                    </div>

                    {/* Stairs at top */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 w-24 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-sm flex items-center justify-center">
                      <span className="text-sm">Stairs</span>
                    </div>

                    {/* Left Side */}
                    <div className="absolute left-4 top-4 space-y-4">
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 h-16">
                        <span className="text-sm">Coordinator Office</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 h-24">
                        <span className="text-sm">Lecture Theater</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 h-16">
                        <span className="text-sm">Girls Washroom</span>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="absolute right-4 top-4 w-1/3">
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 h-64">
                        <span className="text-sm">DEAN OFFICES</span>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <div className="flex space-x-2">
                        <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                          <span className="text-sm">Lab 1</span>
                        </div>
                        <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                          <span className="text-sm">Room 1</span>
                        </div>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16 flex items-center justify-center">
                        <span className="text-sm">Stairs</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Lab 2</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Boys Washroom</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* First Floor */}
              <TabsContent value="first">
                <div className="absolute inset-10 flex">
                  <div className="relative w-full h-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg">
                    {/* Title */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium text-gray-400">
                      1st Floor
                    </div>

                    {/* Stairs at top */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 w-24 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-sm flex items-center justify-center">
                      <span className="text-sm">Stairs</span>
                    </div>

                    {/* Left Side */}
                    <div className="absolute left-4 top-4">
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-32 h-16">
                        <span className="text-sm">Room 1</span>
                      </div>
                    </div>

                    {/* Right Side */}
                    <div className="absolute right-4 top-4">
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-32 h-16">
                        <span className="text-sm">Chairman Office</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-48 h-32 mt-4">
                        <span className="text-sm">Lab 4</span>
                      </div>
                    </div>

                    {/* Left Side Labs */}
                    <div className="absolute left-4 top-24">
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-32 h-32">
                        <span className="text-sm">Lab 1</span>
                      </div>
                    </div>

                    {/* Bottom Row */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Room 2</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Lab 2</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16 flex items-center justify-center">
                        <span className="text-sm">Stairs</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Lab 3</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Room 3</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Second Floor */}
              <TabsContent value="second">
                <div className="absolute inset-10 flex">
                  <div className="relative w-full h-full border-2 border-gray-400 dark:border-gray-600 bg-white dark:bg-gray-700 rounded-lg">
                    {/* Title */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-medium text-gray-400">
                      2nd Floor
                    </div>

                    {/* Stairs at top */}
                    <div className="absolute left-1/2 top-4 -translate-x-1/2 w-24 h-10 border-2 border-gray-400 dark:border-gray-500 rounded-sm flex items-center justify-center">
                      <span className="text-sm">Stairs</span>
                    </div>

                    {/* Room 3 Top Left */}
                    <div className="absolute left-4 top-4 border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-16 h-16">
                      <span className="text-sm">Room 3</span>
                    </div>

                    {/* Teacher's Offices */}
                    <div className="absolute right-4 top-4 border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-1/3 h-64">
                      <span className="text-sm">Teacher's Offices</span>
                    </div>

                    {/* Lab 1 */}
                    <div className="absolute left-4 top-24 border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-32 h-32">
                      <span className="text-sm">Lab 1</span>
                    </div>

                    {/* Bottom Row */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Room 1</span>
                      </div>
                      <div className="flex space-x-2">
                        <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                          <span className="text-sm">Lab 2</span>
                        </div>
                        <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16 flex items-center justify-center">
                          <span className="text-sm">Stairs</span>
                        </div>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Lab 3</span>
                      </div>
                      <div className="border-2 border-gray-400 dark:border-gray-500 rounded-sm p-2 w-24 h-16">
                        <span className="text-sm">Room 2</span>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default LocationsMap;