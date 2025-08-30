import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Search, Edit, Trash2, Eye, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Student {
  id: string;
  name: string;
  class: string;
  age: number;
  parentContact: string;
  email: string;
  address: string;
  status: "Active" | "Inactive";
}

const Students = () => {
  const { toast } = useToast();
  const [students, setStudents] = useState<Student[]>([
    {
      id: "1",
      name: "Alice Johnson",
      class: "10A",
      age: 16,
      parentContact: "+1 (555) 123-4567",
      email: "alice.johnson@email.com",
      address: "123 Main St, City, State",
      status: "Active"
    },
    {
      id: "2",
      name: "Bob Smith",
      class: "9B",
      age: 15,
      parentContact: "+1 (555) 234-5678",
      email: "bob.smith@email.com",
      address: "456 Oak Ave, City, State",
      status: "Active"
    },
    {
      id: "3",
      name: "Carol Davis",
      class: "11A",
      age: 17,
      parentContact: "+1 (555) 345-6789",
      email: "carol.davis@email.com",
      address: "789 Pine Rd, City, State",
      status: "Active"
    },
    {
      id: "4",
      name: "David Wilson",
      class: "8C",
      age: 14,
      parentContact: "+1 (555) 456-7890",
      email: "david.wilson@email.com",
      address: "321 Elm St, City, State",
      status: "Inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [classFilter, setClassFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    age: "",
    parentContact: "",
    email: "",
    address: ""
  });

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = classFilter === "all" || student.class === classFilter;
    return matchesSearch && matchesClass;
  });

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const newStudent: Student = {
      id: (students.length + 1).toString(),
      name: formData.name,
      class: formData.class,
      age: parseInt(formData.age),
      parentContact: formData.parentContact,
      email: formData.email,
      address: formData.address,
      status: "Active"
    };
    
    setStudents([...students, newStudent]);
    setFormData({
      name: "",
      class: "",
      age: "",
      parentContact: "",
      email: "",
      address: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Student Added",
      description: `${newStudent.name} has been successfully added to the system.`,
    });
  };

  const handleDeleteStudent = (id: string) => {
    const studentToDelete = students.find(s => s.id === id);
    setStudents(students.filter(s => s.id !== id));
    
    toast({
      title: "Student Removed",
      description: `${studentToDelete?.name} has been removed from the system.`,
      variant: "destructive",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const classes = ["8A", "8B", "8C", "9A", "9B", "9C", "10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B"];

  return (
    <DashboardLayout
      title="Student Management"
      description="Manage student information, enrollment, and records"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Students ({filteredStudents.length})
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Student</DialogTitle>
                    <DialogDescription>
                      Enter the student's information below.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddStudent} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter student's full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="class">Class</Label>
                      <Select onValueChange={(value) => setFormData({...formData, class: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select class" />
                        </SelectTrigger>
                        <SelectContent>
                          {classes.map(cls => (
                            <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="age">Age</Label>
                      <Input
                        id="age"
                        name="age"
                        type="number"
                        value={formData.age}
                        onChange={handleInputChange}
                        placeholder="Enter age"
                        min="5"
                        max="20"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="student@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="parentContact">Parent Contact</Label>
                      <Input
                        id="parentContact"
                        name="parentContact"
                        value={formData.parentContact}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="123 Main St, City, State"
                        required
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1 bg-gradient-primary">
                        Add Student
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAddDialogOpen(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={classFilter} onValueChange={setClassFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by class" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.map(cls => (
                    <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Class</th>
                      <th>Age</th>
                      <th>Parent Contact</th>
                      <th>Email</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="font-medium">{student.name}</td>
                        <td>{student.class}</td>
                        <td>{student.age}</td>
                        <td>{student.parentContact}</td>
                        <td className="text-muted-foreground">{student.email}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            student.status === "Active" 
                              ? "bg-success/10 text-success" 
                              : "bg-destructive/10 text-destructive"
                          }`}>
                            {student.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => handleDeleteStudent(student.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Students;