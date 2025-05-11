"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
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
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { useToast } from "@/hooks/use-toast";

const AdminLocationsTab = () => {
  const [classroomsData, setClassroomsData] = useState([]);
  const [labsData, setLabsData] = useState([]);
  const [officesData, setOfficesData] = useState([]);
  const [isAddLocationOpen, setIsAddLocationOpen] = useState(false);
  const [isEditLocationOpen, setIsEditLocationOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [locationType, setLocationType] = useState('classroom');
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    building: '',
    floor: '',
    capacity: '',
    facilities: '',
    occupant: ''
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch('/api/admin/locations');
      if (response.ok) {
        const data = await response.json();
        setClassroomsData(data.filter(loc => loc.type === 'classroom'));
        setLabsData(data.filter(loc => loc.type === 'lab'));
        setOfficesData(data.filter(loc => loc.type === 'office'));
      }
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to fetch locations"
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
  
  const handleAddLocation = async () => {
    try {
      const response = await fetch('/api/admin/locations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type: locationType,
          capacity: formData.capacity ? parseInt(formData.capacity) : undefined
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Location added successfully"
        });
        fetchLocations();
        setIsAddLocationOpen(false);
        setFormData({
          name: '',
          building: '',
          floor: '',
          capacity: '',
          facilities: '',
          occupant: ''
        });
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to add location');
      }
    } catch (error) {
      console.error('Error adding location:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleEditClick = (location) => {
    setSelectedLocation(location);
    setLocationType(location.type);
    setFormData({
      name: location.name,
      building: location.building,
      floor: location.floor,
      capacity: location.capacity?.toString() || '',
      facilities: location.facilities || '',
      occupant: location.occupant || ''
    });
    setIsEditLocationOpen(true);
  };
  
  const handleUpdateLocation = async () => {
    if (!selectedLocation) return;
    
    try {
      const response = await fetch('/api/admin/locations', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: selectedLocation._id,
          ...formData,
          type: locationType,
          capacity: formData.capacity ? parseInt(formData.capacity) : undefined
        }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Location updated successfully"
        });
        fetchLocations();
        setIsEditLocationOpen(false);
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update location');
      }
    } catch (error) {
      console.error('Error updating location:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message
      });
    }
  };
  
  const handleDeleteLocation = async (id) => {
    if (confirm('Are you sure you want to delete this location?')) {
      try {
        const response = await fetch(`/api/admin/locations?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          toast({
            title: "Success",
            description: "Location deleted successfully"
          });
          fetchLocations();
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Failed to delete location');
        }
      } catch (error) {
        console.error('Error deleting location:', error);
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
          <CardTitle>Manage Locations</CardTitle>
          <Dialog open={isAddLocationOpen} onOpenChange={setIsAddLocationOpen}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Location</DialogTitle>
                <DialogDescription>
                  Enter the details for the new location.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="location-type" className="text-right">
                    Location Type
                  </Label>
                  <Select 
                    value={locationType} 
                    onValueChange={setLocationType}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="classroom">Classroom</SelectItem>
                      <SelectItem value="lab">Lab</SelectItem>
                      <SelectItem value="office">Office</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
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
                  <Label htmlFor="building" className="text-right">
                    Building
                  </Label>
                  <Input
                    id="building"
                    name="building"
                    value={formData.building}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="floor" className="text-right">
                    Floor
                  </Label>
                  <Input
                    id="floor"
                    name="floor"
                    value={formData.floor}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                {locationType !== 'office' && (
                  <>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="capacity" className="text-right">
                        Capacity
                      </Label>
                      <Input
                        id="capacity"
                        name="capacity"
                        type="number"
                        value={formData.capacity}
                        onChange={handleInputChange}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="facilities" className="text-right">
                        Facilities
                      </Label>
                      <Input
                        id="facilities"
                        name="facilities"
                        value={formData.facilities}
                        onChange={handleInputChange}
                        placeholder="e.g., Projector, Air Conditioning"
                        className="col-span-3"
                      />
                    </div>
                  </>
                )}
                {locationType === 'office' && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="occupant" className="text-right">
                      Occupant
                    </Label>
                    <Input
                      id="occupant"
                      name="occupant"
                      value={formData.occupant}
                      onChange={handleInputChange}
                      className="col-span-3"
                    />
                  </div>
                )}
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddLocationOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddLocation} className="bg-emerald-600 hover:bg-emerald-700">
                  Add Location
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="classrooms">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="classrooms">Classrooms</TabsTrigger>
              <TabsTrigger value="labs">Labs</TabsTrigger>
              <TabsTrigger value="offices">Offices</TabsTrigger>
            </TabsList>
            
            <TabsContent value="classrooms">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Building</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead className="hidden md:table-cell">Facilities</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {classroomsData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No classrooms found
                        </TableCell>
                      </TableRow>
                    ) : (
                      classroomsData.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.building}</TableCell>
                          <TableCell>{item.floor}</TableCell>
                          <TableCell>{item.capacity}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.facilities}</TableCell>
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
                                onClick={() => handleDeleteLocation(item._id)}
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
            </TabsContent>
            
            <TabsContent value="labs">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Building</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead className="hidden md:table-cell">Facilities</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {labsData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                          No labs found
                        </TableCell>
                      </TableRow>
                    ) : (
                      labsData.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.building}</TableCell>
                          <TableCell>{item.floor}</TableCell>
                          <TableCell>{item.capacity}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.facilities}</TableCell>
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
                                onClick={() => handleDeleteLocation(item._id)}
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
            </TabsContent>
            
            <TabsContent value="offices">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead className="hidden md:table-cell">Building</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Occupant</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {officesData.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                          No offices found
                        </TableCell>
                      </TableRow>
                    ) : (
                      officesData.map((item) => (
                        <TableRow key={item._id}>
                          <TableCell className="font-medium">{item.name}</TableCell>
                          <TableCell className="hidden md:table-cell">{item.building}</TableCell>
                          <TableCell>{item.floor}</TableCell>
                          <TableCell>{item.occupant}</TableCell>
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
                                onClick={() => handleDeleteLocation(item._id)}
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
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Edit Location Dialog */}
      <Dialog open={isEditLocationOpen} onOpenChange={setIsEditLocationOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Update the details for this location.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-name" className="text-right">
                Name
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
              <Label htmlFor="edit-building" className="text-right">
                Building
              </Label>
              <Input
                id="edit-building"
                name="building"
                value={formData.building}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-floor" className="text-right">
                Floor
              </Label>
              <Input
                id="edit-floor"
                name="floor"
                value={formData.floor}
                onChange={handleInputChange}
                className="col-span-3"
              />
            </div>
            {locationType !== 'office' && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-capacity" className="text-right">
                    Capacity
                  </Label>
                  <Input
                    id="edit-capacity"
                    name="capacity"
                    type="number"
                    value={formData.capacity}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-facilities" className="text-right">
                    Facilities
                  </Label>
                  <Input
                    id="edit-facilities"
                    name="facilities"
                    value={formData.facilities}
                    onChange={handleInputChange}
                    className="col-span-3"
                  />
                </div>
              </>
            )}
            {locationType === 'office' && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-occupant" className="text-right">
                  Occupant
                </Label>
                <Input
                  id="edit-occupant"
                  name="occupant"
                  value={formData.occupant}
                  onChange={handleInputChange}
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditLocationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateLocation} className="bg-emerald-600 hover:bg-emerald-700">
              Update Location
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminLocationsTab;