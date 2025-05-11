"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';

const degrees = [
  { code: 'BSIT', name: 'Bachelor of Science in Information Technology' },
  { code: 'BSCS', name: 'Bachelor of Science in Computer Science' },
  { code: 'BSSE', name: 'Bachelor of Science in Software Engineering' },
  { code: 'BSBI', name: 'Bachelor of Science in Business Informatics' },
  { code: 'BSAI', name: 'Bachelor of Science in Artificial Intelligence' }
];

const semesters = Array.from({ length: 8 }, (_, i) => i + 1);

const CourseManagement = () => {
  const [selectedDegree, setSelectedDegree] = useState('BSIT');
  const [selectedSemester, setSelectedSemester] = useState('1');
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    creditHours: '',
    prerequisites: '',
    type: 'Core',
    description: '',
    semester: '1'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddCourse = () => {
    // TODO: Implement course addition logic
    console.log('Adding course:', {
      ...formData,
      degreeCode: selectedDegree,
      semester: parseInt(formData.semester)
    });
    setIsAddCourseOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Course Management</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Manage courses and their allocations across different degree programs.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Course Allocation</CardTitle>
          <Dialog open={isAddCourseOpen} onOpenChange={setIsAddCourseOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Course
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Course</DialogTitle>
                <DialogDescription>
                  Enter the course details below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="semester" className="text-right">Semester</Label>
                  <Select
                    value={formData.semester}
                    onValueChange={(value) => handleSelectChange('semester', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {semesters.map((sem) => (
                        <SelectItem key={sem} value={sem.toString()}>
                          Semester {sem}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="code" className="text-right">Course Code</Label>
                  <Input
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">Course Title</Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="creditHours" className="text-right">Credit Hours</Label>
                  <Input
                    id="creditHours"
                    name="creditHours"
                    type="number"
                    value={formData.creditHours}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="prerequisites" className="text-right">Prerequisites</Label>
                  <Input
                    id="prerequisites"
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleInputChange}
                    placeholder="Comma separated course codes"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">Course Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Core">Core</SelectItem>
                      <SelectItem value="Elective">Elective</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddCourseOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddCourse} className="bg-emerald-600 hover:bg-emerald-700">
                  Add Course
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue={selectedDegree} onValueChange={setSelectedDegree} className="w-full">
            <TabsList className="grid grid-cols-5 mb-4">
              {degrees.map((degree) => (
                <TabsTrigger key={degree.code} value={degree.code}>
                  {degree.code}
                </TabsTrigger>
              ))}
            </TabsList>

            {degrees.map((degree) => (
              <TabsContent key={degree.code} value={degree.code}>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{degree.name}</h3>
                </div>

                <Tabs defaultValue="1" onValueChange={setSelectedSemester}>
                  <TabsList className="grid grid-cols-8 mb-4">
                    {semesters.map((semester) => (
                      <TabsTrigger key={semester} value={semester.toString()}>
                        Semester {semester}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {semesters.map((semester) => (
                    <TabsContent key={semester} value={semester.toString()}>
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Code</TableHead>
                              <TableHead>Title</TableHead>
                              <TableHead>Credit Hours</TableHead>
                              <TableHead>Prerequisites</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            <TableRow>
                              <TableCell className="font-medium">CS-101</TableCell>
                              <TableCell>Introduction to Computing</TableCell>
                              <TableCell>3</TableCell>
                              <TableCell>None</TableCell>
                              <TableCell>
                                <Badge variant="outline">Core</Badge>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon">
                                    <Pencil className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon">
                                    <Trash2 className="h-4 w-4 text-red-500" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseManagement;