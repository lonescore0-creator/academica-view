import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, FileText, Download } from "lucide-react";

const StudentAssignments = () => {
  const assignments = [
    {
      id: 1,
      title: "Algebra Problem Set 8",
      subject: "Mathematics",
      dueDate: "2024-01-15",
      status: "pending",
      description: "Complete problems 1-15 from Chapter 8 - Linear Equations",
      points: 50
    },
    {
      id: 2,
      title: "Essay on Liberian Independence",
      subject: "Liberian History",
      dueDate: "2024-01-18",
      status: "submitted",
      description: "Write a 800-word essay on the founding of Liberia and its significance",
      points: 100
    },
    {
      id: 3,
      title: "Physics Lab Report - Momentum",
      subject: "Physics",
      dueDate: "2024-01-20",
      status: "pending",
      description: "Document findings from the momentum conservation experiment",
      points: 75
    },
    {
      id: 4,
      title: "English Grammar Quiz",
      subject: "English Language",
      dueDate: "2024-01-22",
      status: "graded",
      description: "Quiz covering verb tenses and sentence structure",
      points: 30,
      score: 28
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-500";
      case "submitted": return "bg-blue-500";
      case "graded": return "bg-green-500";
      case "overdue": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Assignments</h1>
          <p className="text-muted-foreground">Track your assignments and submissions</p>
        </div>

        {/* Assignment Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">2</div>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">1</div>
                <p className="text-sm text-muted-foreground">Submitted</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">1</div>
                <p className="text-sm text-muted-foreground">Graded</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">93%</div>
                <p className="text-sm text-muted-foreground">Avg Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments List */}
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <Card key={assignment.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{assignment.title}</CardTitle>
                    <p className="text-muted-foreground">{assignment.subject}</p>
                  </div>
                  <Badge className={`${getStatusColor(assignment.status)} text-white`}>
                    {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{assignment.description}</p>
                
                <div className="flex items-center space-x-6 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>Due: {formatDate(assignment.dueDate)}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{assignment.points} points</span>
                  </div>
                  {assignment.score && (
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Score: {assignment.score}/{assignment.points}</span>
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  {assignment.status === "pending" && (
                    <Button size="sm">Submit Assignment</Button>
                  )}
                  {assignment.status === "graded" && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Download Feedback
                    </Button>
                  )}
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAssignments;