"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Pencil, Trash2, UserCircle } from 'lucide-react';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

const AdminTeachersTab = () => {
  const [teachersData, setTeachersData] = useState([]);
  const [isAddTeacherOpen, setIsAddTeacherOpen] = useState(false);
  const [isEditTeacherOpen, setIsEditTeacherOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    department: '',
    subjects: '',
    email: '',
    office: '',
    officeHours: ''
  });

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      const response = await fetch('/api/admin/teachers');
      if (response.ok) {
        const data = await response.json();
        setTeachersData(data);
      }
    } catch (error) {
      console.error('Error fetching teachers:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch teachers"
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
  
  const handleAddTeacher = async () => {
    try {
      const subjectsArray = formData.subjects.split(',').map(subject => subject.trim());
      
      const response = await fetch('/api/admin/teachers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subjects: subjectsArray
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Teacher added successfully"
        });
        fetchTeachers();
        setIsAddTeacherOpen(false);
        setFormData({
          name: '',
          designation: '',
          department: '',
          subjects: '',
          email: '',
          office: '',
          officeHours: ''
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add teacher');
      }
    } catch (error) {
      console.error('Error adding teacher:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name,
      designation: teacher.designation,
      department: teacher.department,
      subjects: teacher.subjects.join(', '),
      email: teacher.email,
      office: teacher.office,
      officeHours: teacher.officeHours
    });
    setIsEditTeacherOpen(true);
  };
  
  const handleUpdateTeacher = async () => {
    if (!selectedTeacher) return;
    
    try {
      const subjectsArray = formData.subjects.split(',').map(subject => subject.trim());
      
      const response = await fetch('/api/admin/teachers', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: selectedTeacher._id,
          ...formData,
          subjects: subjectsArray
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Teacher updated successfully"
        });
        fetchTeachers();
        setIsEditTeacherOpen(false);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update teacher');
      }
    } catch (error) {
      console.error('Error updating teacher:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleDeleteTeacher = async (id) => {
    if (confirm('Are you sure you want to delete this teacher?')) {
      try {
        const response = await fetch(`/api/admin/teachers?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Teacher deleted successfully"
          });
          fetchTeachers();
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete teacher');
        }
      } catch (error) {
        console.error('Error deleting teacher:', error);
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
          <CardTitle>Manage Teachers</CardTitle>
          <Dialog open={isAddTeacherOpen} onOpenChange={setIsAddTeacherOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Teacher
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Teacher</DialogTitle>
                <DialogDescription>
                  Enter the details for the new teacher.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="designation" className="text-right">
                    Designation
                  </Label>
                  <Select 
                    value={formData.designation} 
                    onValueChange={(value) => handleSelectChange('designation', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select designation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Professor">Professor</SelectItem>
                      <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                      <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                      <SelectItem value="Lecturer">Lecturer</SelectItem>
                      <SelectItem value="Lab Instructor">Lab Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Input
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subjects" className="text-right">
                    Subjects
                  </Label>
                  <Textarea
                    id="subjects"
                    name="subjects"
                    value={formData.subjects}
                    onChange={handleInputChange}
                    placeholder="Enter subjects separated by commas"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="office" className="text-right">
                    Office
                  </Label>
                  <Input
                    id="office"
                    name="office"
                    value={formData.office}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="officeHours" className="text-right">
                    Office Hours
                  </Label>
                  <Input
                    id="officeHours"
                    name="officeHours"
                    value={formData.officeHours}
                    onChange={handleInputChange}
                    placeholder="e.g., Monday, Wednesday 10:00 AM - 12:00 PM"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddTeacherOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddTeacher} className="bg-emerald-600 hover:bg-emerald-700">
                  Add Teacher
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
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Designation</TableHead>
                  <TableHead className="hidden md:table-cell">Subjects</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="hidden md:table-cell">Office</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {teachersData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No teachers found
                    </TableCell>
                  </TableRow>
                ) : (
                  teachersData.map((teacher) => (
                    <TableRow key={teacher._id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                          {teacher.name}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">{teacher.designation}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell className="hidden md:table-cell">{teacher.office}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditClick(teacher)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteTeacher(teacher._id)}
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

      {/* Edit Teacher Dialog */}
      <Dialog open={isEditTeacherOpen} onOpenChange={setIsEditTeacherOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Teacher</DialogTitle>
            <DialogDescription>
              Update the details for this teacher.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Full Name
              </Label>
              <Input
                id="edit-name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-designation" className="text-right">
                Designation
              </Label>
              <Select 
                value={formData.designation} 
                onValueChange={(value) => handleSelectChange('designation', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select designation" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Professor">Professor</SelectItem>
                  <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                  <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                  <SelectItem value="Lecturer">Lecturer</SelectItem>
                  <SelectItem value="Lab Instructor">Lab Instructor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-department" className="text-right">
                Department
              </Label>
              <Input
                id="edit-department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-subjects" className="text-right">
                Subjects
              </Label>
              <Textarea
                id="edit-subjects"
                name="subjects"
                value={formData.subjects}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-email" className="text-right">
                Email
              </Label>
              <Input
                id="edit-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-office" className="text-right">
                Office
              </Label>
              <Input
                id="edit-office"
                name="office"
                value={formData.office}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-officeHours" className="text-right">
                Office Hours
              </Label>
              <Input
                id="edit-officeHours"
                name="officeHours"
                value={formData.officeHours}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTeacherOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateTeacher} className="bg-emerald-600 hover:bg-emerald-700">
              Update Teacher
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminTeachersTab;