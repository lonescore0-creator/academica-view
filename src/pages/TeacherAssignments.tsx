import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, FileText, Plus, Eye, Edit, Download } from "lucide-react";

const TeacherAssignments = () => {
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  const assignments = [
    {
      id: 1,
      title: "Quadratic Equations Worksheet",
      class: "Grade 10A",
      dueDate: "2024-01-20",
      assignedDate: "2024-01-10",
      totalPoints: 50,
      submitted: 24,
      totalStudents: 28,
      status: "active",
      description: "Solve problems 1-15 covering quadratic equations and graphing"
    },
    {
      id: 2,
      title: "Calculus Integration Problems",
      class: "Grade 12",
      dueDate: "2024-01-25",
      assignedDate: "2024-01-12",
      totalPoints: 75,
      submitted: 15,
      totalStudents: 19,
      status: "active",
      description: "Practice integration techniques including substitution and parts"
    },
    {
      id: 3,
      title: "Probability Theory Essay",
      class: "Grade 11",
      dueDate: "2024-01-15",
      assignedDate: "2024-01-05",
      totalPoints: 100,
      submitted: 22,
      totalStudents: 22,
      status: "grading",
      description: "Write a 500-word essay on real-world applications of probability"
    },
    {
      id: 4,
      title: "Geometry Proofs Assignment",
      class: "Grade 10B", 
      dueDate: "2024-01-12",
      assignedDate: "2024-01-02",
      totalPoints: 60,
      submitted: 26,
      totalStudents: 26,
      status: "completed",
      description: "Complete geometric proofs for triangles and parallel lines"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-blue-500";
      case "grading": return "bg-yellow-500";
      case "completed": return "bg-green-500";
      case "overdue": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getSubmissionRate = (submitted: number, total: number) => {
    return Math.round((submitted / total) * 100);
  };

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Assignments</h1>
            <p className="text-muted-foreground">Create and manage assignments for your classes</p>
          </div>
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create Assignment
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Assignment</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Assignment Title</label>
                  <Input placeholder="Enter assignment title" />
                </div>
                <div>
                  <label className="text-sm font-medium">Class</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10A">Mathematics - Grade 10A</SelectItem>
                      <SelectItem value="10B">Mathematics - Grade 10B</SelectItem>
                      <SelectItem value="11">Advanced Mathematics - Grade 11</SelectItem>
                      <SelectItem value="12">Calculus - Grade 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Due Date</label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="text-sm font-medium">Total Points</label>
                  <Input type="number" placeholder="100" />
                </div>
                <div>
                  <label className="text-sm font-medium">Description</label>
                  <Textarea placeholder="Assignment description and instructions" />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">Create Assignment</Button>
                  <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Assignment Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{assignments.length}</div>
              <p className="text-sm text-muted-foreground">Total Assignments</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {assignments.filter(a => a.status === "active").length}
              </div>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {assignments.filter(a => a.status === "grading").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending Grading</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {assignments.filter(a => a.status === "completed").length}
              </div>
              <p className="text-sm text-muted-foreground">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <p className="text-muted-foreground">{assignment.class}</p>
                  </div>
                  <Badge className={`${getStatusColor(assignment.status)} text-white`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{assignment.description}</p>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Assigned: {formatDate(assignment.assignedDate)}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    <span>{assignment.totalPoints} points</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">
                      {assignment.submitted}/{assignment.totalStudents} submitted
                    </span>
                    <span className="text-muted-foreground ml-1">
                      ({getSubmissionRate(assignment.submitted, assignment.totalStudents)}%)
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Submission Progress</span>
                    <span>{getSubmissionRate(assignment.submitted, assignment.totalStudents)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${getSubmissionRate(assignment.submitted, assignment.totalStudents)}%` }}
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Submissions
                  </Button>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  {assignment.status === "completed" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Export Results
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherAssignments;