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
import { Plus, Pencil, Trash2, Bell, Info, AlertTriangle } from 'lucide-react';
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
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from "@/hooks/use-toast";

const AdminUpdatesTab = () => {
  const [updatesData, setUpdatesData] = useState([]);
  const [isAddUpdateOpen, setIsAddUpdateOpen] = useState(false);
  const [isEditUpdateOpen, setIsEditUpdateOpen] = useState(false);
  const [selectedUpdate, setSelectedUpdate] = useState(null);
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    type: '',
    priority: ''
  });

  useEffect(() => {
    fetchUpdates();
  }, []);

  const fetchUpdates = async () => {
    try {
      const response = await fetch('/api/admin/updates');
      if (response.ok) {
        const data = await response.json();
        setUpdatesData(data);
      }
    } catch (error) {
      console.error('Error fetching updates:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch updates"
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
  
  const handleAddUpdate = async () => {
    try {
      const response = await fetch('/api/admin/updates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Update added successfully"
        });
        fetchUpdates();
        setIsAddUpdateOpen(false);
        setFormData({
          title: '',
          description: '',
          date: '',
          type: '',
          priority: ''
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add update');
      }
    } catch (error) {
      console.error('Error adding update:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleEditClick = (update) => {
    setSelectedUpdate(update);
    setFormData({
      title: update.title,
      description: update.description,
      date: update.date,
      type: update.type,
      priority: update.priority
    });
    setIsEditUpdateOpen(true);
  };
  
  const handleUpdateUpdate = async () => {
    if (!selectedUpdate) return;
    
    try {
      const response = await fetch(`/api/admin/updates?id=${selectedUpdate._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Update modified successfully"
        });
        fetchUpdates();
        setIsEditUpdateOpen(false);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to modify update');
      }
    } catch (error) {
      console.error('Error modifying update:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleDeleteUpdate = async (id) => {
    if (confirm('Are you sure you want to delete this update?')) {
      try {
        const response = await fetch(`/api/admin/updates?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Update deleted successfully"
          });
          fetchUpdates();
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete update');
        }
      } catch (error) {
        console.error('Error deleting update:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        });
      }
    }
  };

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge>Medium Priority</Badge>;
      case 'low':
        return <Badge variant="secondary">Low Priority</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'location':
        return <Info className="h-4 w-4 text-blue-500" />;
      case 'schedule':
        return <AlertTriangle className="h-4 w-4 text-amber-500" />;
      case 'teacher':
        return <Bell className="h-4 w-4 text-purple-500" />;
      default:
        return <Info className="h-4 w-4" />;
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Updates</CardTitle>
          <Dialog open={isAddUpdateOpen} onOpenChange={setIsAddUpdateOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Update
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Update</DialogTitle>
                <DialogDescription>
                  Create a new update to notify users about changes.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Title
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
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    name="date"
                    type="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select 
                    value={formData.type} 
                    onValueChange={(value) => handleSelectChange('type', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="location">Location Change</SelectItem>
                      <SelectItem value="schedule">Schedule Change</SelectItem>
                      <SelectItem value="teacher">Teacher Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select 
                    value={formData.priority} 
                    onValueChange={(value) => handleSelectChange('priority', value)}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddUpdateOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddUpdate} className="bg-emerald-600 hover:bg-emerald-700">
                  Add Update
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
                  <TableHead>Type</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {updatesData.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      No updates found
                    </TableCell>
                  </TableRow>
                ) : (
                  updatesData.map((update) => (
                    <TableRow key={update._id}>
                      <TableCell>
                        <div className="flex items-center">
                          {getTypeIcon(update.type)}
                          <span className="ml-2 capitalize">{update.type}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{update.title}</TableCell>
                      <TableCell className="hidden md:table-cell max-w-xs truncate">
                        {update.description}
                      </TableCell>
                      <TableCell>{update.date}</TableCell>
                      <TableCell>{getPriorityBadge(update.priority)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleEditClick(update)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteUpdate(update._id)}
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

      {/* Edit Update Dialog */}
      <Dialog open={isEditUpdateOpen} onOpenChange={setIsEditUpdateOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Update</DialogTitle>
            <DialogDescription>
              Modify the details of this update.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
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
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-date" className="text-right">
                Date
              </Label>
              <Input
                id="edit-date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Type
              </Label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleSelectChange('type', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="location">Location Change</SelectItem>
                  <SelectItem value="schedule">Schedule Change</SelectItem>
                  <SelectItem value="teacher">Teacher Update</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-priority" className="text-right">
                Priority
              </Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => handleSelectChange('priority', value)}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditUpdateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateUpdate} className="bg-emerald-600 hover:bg-emerald-700">
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUpdatesTab;