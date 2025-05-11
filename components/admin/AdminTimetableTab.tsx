"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

const AdminTimetableTab = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);
  const [isEditClassOpen, setIsEditClassOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    course: '',
    title: '',
    day: '',
    time: '',
    room: '',
    teacher: '',
    semester: ''
  });

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = async () => {
    try {
      const response = await fetch('/api/admin/timetable');
      if (response.ok) {
        const data = await response.json();
        setTimetableData(data);
      }
    } catch (error) {
      console.error('Error fetching timetable:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch timetable data"
      });
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };
  
  const handleAddClass = async () => {
    try {
      const response = await fetch('/api/admin/timetable', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          semester: parseInt(formData.semester)
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Class added successfully"
        });
        fetchTimetableData();
        setIsAddClassOpen(false);
        setFormData({
          course: '',
          title: '',
          day: '',
          time: '',
          room: '',
          teacher: '',
          semester: ''
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add class');
      }
    } catch (error) {
      console.error('Error adding class:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleEditClick = (classItem) => {
    setSelectedClass(classItem);
    setFormData({
      course: classItem.course,
      title: classItem.title,
      day: classItem.day,
      time: classItem.time,
      room: classItem.room,
      teacher: classItem.teacher,
      semester: classItem.semester.toString()
    });
    setIsEditClassOpen(true);
  };
  
  const handleUpdateClass = async () => {
    if (!selectedClass) return;
    
    try {
      const response = await fetch(`/api/admin/timetable?id=${selectedClass._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          semester: parseInt(formData.semester)
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Class updated successfully"
        });
        fetchTimetableData();
        setIsEditClassOpen(false);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update class');
      }
    } catch (error) {
      console.error('Error updating class:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleDeleteClass = async (id) => {
    if (confirm('Are you sure you want to delete this class?')) {
      try {
        const response = await fetch(`/api/admin/timetable?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Class deleted successfully"
          });
          fetchTimetableData();
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete class');
        }
      } catch (error) {
        console.error('Error deleting class:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        });
      }
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Timetable</CardTitle>
          <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Class
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Class</DialogTitle>
                <DialogDescription>
                  Enter the details for the new class to add to the timetable.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="semester" className="text-right">
                    Semester
                  </Label>
                  <Select 
                    value={formData.semester} 
                    onValueChange={(value) => handleSelectChange('semester', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                        <SelectItem key={semester} value={semester.toString()}>
                          Semester {semester}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="course" className="text-right">
                    Course Code
                  </Label>
                  <Input
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Course Title
                  </Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">
                    Day
                  </Label>
                  <Select 
                    value={formData.day} 
                    onValueChange={(value) => handleSelectChange('day', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select day" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Monday">Monday</SelectItem>
                      <SelectItem value="Tuesday">Tuesday</SelectItem>
                      <SelectItem value="Wednesday">Wednesday</SelectItem>
                      <SelectItem value="Thursday">Thursday</SelectItem>
                      <SelectItem value="Friday">Friday</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    placeholder="e.g., 9:00 AM - 10:30 AM"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room
                  </Label>
                  <Input
                    id="room"
                    name="room"
                    value={formData.room}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="teacher" className="text-right">
                    Teacher
                  </Label>
                  <Input
                    id="teacher"
                    name="teacher"
                    value={formData.teacher}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddClassOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddClass} className="bg-emerald-600 hover:bg-emerald-700">
                  Add Class
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead className="hidden md:table-cell">Title</TableHead>
                  <TableHead>Day</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead className="hidden md:table-cell">Room</TableHead>
                  <TableHead className="hidden md:table-cell">Teacher</TableHead>
                  <TableHead>Semester</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {timetableData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      No classes scheduled
                    </TableCell>
                  </TableRow>
                ) : (
                  timetableData.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell className="font-medium">{item.course}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.title}</TableCell>
                      <TableCell>{item.day}</TableCell>
                      <TableCell>{item.time}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.room}</TableCell>
                      <TableCell className="hidden md:table-cell">{item.teacher}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">Semester {item.semester}</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditClick(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteClass(item._id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Class Dialog */}
      <Dialog open={isEditClassOpen} onOpenChange={setIsEditClassOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Class</DialogTitle>
            <DialogDescription>
              Update the details for this class.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-semester" className="text-right">
                Semester
              </Label>
              <Select 
                value={formData.semester} 
                onValueChange={(value) => handleSelectChange('semester', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((semester) => (
                    <SelectItem key={semester} value={semester.toString()}>
                      Semester {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-course" className="text-right">
                Course Code
              </Label>
              <Input
                id="edit-course"
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Course Title
              </Label>
              <Input
                id="edit-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-day" className="text-right">
                Day
              </Label>
              <Select 
                value={formData.day} 
                onValueChange={(value) => handleSelectChange('day', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Monday">Monday</SelectItem>
                  <SelectItem value="Tuesday">Tuesday</SelectItem>
                  <SelectItem value="Wednesday">Wednesday</SelectItem>
                  <SelectItem value="Thursday">Thursday</SelectItem>
                  <SelectItem value="Friday">Friday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-time" className="text-right">
                Time
              </Label>
              <Input
                id="edit-time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-room" className="text-right">
                Room
              </Label>
              <Input
                id="edit-room"
                name="room"
                value={formData.room}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-teacher" className="text-right">
                Teacher
              </Label>
              <Input
                id="edit-teacher"
                name="teacher"
                value={formData.teacher}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditClassOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateClass} className="bg-emerald-600 hover:bg-emerald-700">
              Update Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTimetableTab;