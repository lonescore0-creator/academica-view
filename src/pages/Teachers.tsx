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
import { Plus, Search, Edit, Trash2, Eye, Filter, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  experience: number;
  qualification: string;
  status: "Active" | "Inactive";
}

const Teachers = () => {
  const { toast } = useToast();
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "1",
      name: "Dr. Sarah Williams",
      subject: "Mathematics",
      email: "sarah.williams@eastwood.edu",
      phone: "+1 (555) 111-2222",
      experience: 8,
      qualification: "PhD Mathematics",
      status: "Active"
    },
    {
      id: "2",
      name: "Mr. John Davis",
      subject: "Physics",
      email: "john.davis@eastwood.edu",
      phone: "+1 (555) 222-3333",
      experience: 12,
      qualification: "MSc Physics",
      status: "Active"
    },
    {
      id: "3",
      name: "Ms. Emily Brown",
      subject: "English Literature",
      email: "emily.brown@eastwood.edu",
      phone: "+1 (555) 333-4444",
      experience: 6,
      qualification: "MA English",
      status: "Active"
    },
    {
      id: "4",
      name: "Dr. Michael Chen",
      subject: "Chemistry",
      email: "michael.chen@eastwood.edu",
      phone: "+1 (555) 444-5555",
      experience: 15,
      qualification: "PhD Chemistry",
      status: "Inactive"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    subject: "",
    email: "",
    phone: "",
    experience: "",
    qualification: ""
  });

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "English Literature", 
    "History", "Geography", "Computer Science", "Art", "Music", "Physical Education"
  ];

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = subjectFilter === "all" || teacher.subject === subjectFilter;
    return matchesSearch && matchesSubject;
  });

  const handleAddTeacher = (e: React.FormEvent) => {
    e.preventDefault();
    const newTeacher: Teacher = {
      id: (teachers.length + 1).toString(),
      name: formData.name,
      subject: formData.subject,
      email: formData.email,
      phone: formData.phone,
      experience: parseInt(formData.experience),
      qualification: formData.qualification,
      status: "Active"
    };
    
    setTeachers([...teachers, newTeacher]);
    setFormData({
      name: "",
      subject: "",
      email: "",
      phone: "",
      experience: "",
      qualification: ""
    });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Teacher Added",
      description: `${newTeacher.name} has been successfully added to the faculty.`,
    });
  };

  const handleDeleteTeacher = (id: string) => {
    const teacherToDelete = teachers.find(t => t.id === id);
    setTeachers(teachers.filter(t => t.id !== id));
    
    toast({
      title: "Teacher Removed",
      description: `${teacherToDelete?.name} has been removed from the faculty.`,
      variant: "destructive",
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <DashboardLayout
      title="Teacher Management"
      description="Manage faculty information, assignments, and schedules"
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Teachers ({filteredTeachers.length})
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Teacher
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add New Teacher</DialogTitle>
                    <DialogDescription>
                      Enter the teacher's information below.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleAddTeacher} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Enter teacher's full name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Select onValueChange={(value) => setFormData({...formData, subject: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select subject" />
                        </SelectTrigger>
                        <SelectContent>
                          {subjects.map(subject => (
                            <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="teacher@eastwood.edu"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="experience">Experience (Years)</Label>
                      <Input
                        id="experience"
                        name="experience"
                        type="number"
                        value={formData.experience}
                        onChange={handleInputChange}
                        placeholder="5"
                        min="0"
                        max="50"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="qualification">Qualification</Label>
                      <Input
                        id="qualification"
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleInputChange}
                        placeholder="MSc Mathematics"
                        required
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button type="submit" className="flex-1 bg-gradient-primary">
                        Add Teacher
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
                  placeholder="Search teachers by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  {subjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Teachers Table */}
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
                      <th>Subject</th>
                      <th>Contact</th>
                      <th>Experience</th>
                      <th>Qualification</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTeachers.map((teacher, index) => (
                      <motion.tr
                        key={teacher.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="font-medium">{teacher.name}</td>
                        <td className="text-primary">{teacher.subject}</td>
                        <td>
                          <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <Phone className="h-3 w-3 text-muted-foreground" />
                              <span className="text-muted-foreground">{teacher.phone}</span>
                            </div>
                          </div>
                        </td>
                        <td>{teacher.experience} years</td>
                        <td>{teacher.qualification}</td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            teacher.status === "Active" 
                              ? "bg-success/10 text-success" 
                              : "bg-destructive/10 text-destructive"
                          }`}>
                            {teacher.status}
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
                              onClick={() => handleDeleteTeacher(teacher.id)}
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

export default Teachers;