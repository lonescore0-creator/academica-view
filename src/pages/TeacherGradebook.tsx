import React, { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Save, Download, Plus, Edit } from "lucide-react";

const TeacherGradebook = () => {
  const [selectedClass, setSelectedClass] = useState("10A");
  
  const classes = [
    { id: "10A", name: "Mathematics - Grade 10A" },
    { id: "10B", name: "Mathematics - Grade 10B" },
    { id: "11", name: "Advanced Mathematics - Grade 11" },
    { id: "12", name: "Calculus - Grade 12" }
  ];

  const students = [
    {
      id: 1,
      name: "Alice Johnson",
      rollNo: "10A001",
      quiz1: 85,
      quiz2: 92,
      assignment1: 88,
      midterm: 87,
      assignment2: 90,
      finalExam: null,
      total: 88.4
    },
    {
      id: 2,
      name: "Bob Smith",
      rollNo: "10A002",
      quiz1: 78,
      quiz2: 84,
      assignment1: 82,
      midterm: 79,
      assignment2: 85,
      finalExam: null,
      total: 81.6
    },
    {
      id: 3,
      name: "Carol Davis",
      rollNo: "10A003",
      quiz1: 95,
      quiz2: 98,
      assignment1: 94,
      midterm: 96,
      assignment2: 97,
      finalExam: null,
      total: 96.0
    },
    {
      id: 4,
      name: "David Wilson",
      rollNo: "10A004",
      quiz1: 73,
      quiz2: 76,
      assignment1: 74,
      midterm: 72,
      assignment2: 78,
      finalExam: null,
      total: 74.6
    },
    {
      id: 5,
      name: "Eva Brown",
      rollNo: "10A005",
      quiz1: 89,
      quiz2: 87,
      assignment1: 91,
      midterm: 88,
      assignment2: 86,
      finalExam: null,
      total: 88.2
    }
  ];

  const assessments = [
    { id: "quiz1", name: "Quiz 1", maxPoints: 100, weight: 10 },
    { id: "quiz2", name: "Quiz 2", maxPoints: 100, weight: 10 },
    { id: "assignment1", name: "Assignment 1", maxPoints: 100, weight: 15 },
    { id: "midterm", name: "Midterm Exam", maxPoints: 100, weight: 25 },
    { id: "assignment2", name: "Assignment 2", maxPoints: 100, weight: 15 },
    { id: "finalExam", name: "Final Exam", maxPoints: 100, weight: 25 }
  ];

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getLetterGrade = (score: number) => {
    if (score >= 90) return "A";
    if (score >= 80) return "B";
    if (score >= 70) return "C";
    if (score >= 60) return "D";
    return "F";
  };

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gradebook</h1>
            <p className="text-muted-foreground">Manage student grades and assessments</p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Assessment
            </Button>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export Grades
            </Button>
          </div>
        </div>

        {/* Class Selection */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <label className="font-medium">Select Class:</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {classes.map((cls) => (
                    <SelectItem key={cls.id} value={cls.id}>
                      {cls.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Grade Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{students.length}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {(students.reduce((sum, s) => sum + s.total, 0) / students.length).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">Class Average</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {Math.max(...students.map(s => s.total)).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">Highest Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.min(...students.map(s => s.total)).toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">Lowest Score</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {students.filter(s => s.total >= 80).length}
              </div>
              <p className="text-sm text-muted-foreground">Above 80%</p>
            </CardContent>
          </Card>
        </div>

        {/* Gradebook Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Grade Entry - {classes.find(c => c.id === selectedClass)?.name}</CardTitle>
              <Button>
                <Save className="h-4 w-4 mr-2" />
                Save All Changes
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[180px]">Student Name</TableHead>
                    <TableHead className="w-[100px]">Roll No</TableHead>
                    {assessments.map((assessment) => (
                      <TableHead key={assessment.id} className="text-center min-w-[100px]">
                        <div>
                          <div className="font-medium">{assessment.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {assessment.maxPoints}pts ({assessment.weight}%)
                          </div>
                        </div>
                      </TableHead>
                    ))}
                    <TableHead className="text-center w-[100px]">Total</TableHead>
                    <TableHead className="text-center w-[80px]">Grade</TableHead>
                    <TableHead className="w-[80px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell className="font-medium">{student.name}</TableCell>
                      <TableCell>{student.rollNo}</TableCell>
                      {assessments.map((assessment) => (
                        <TableCell key={assessment.id} className="text-center">
                          {student[assessment.id as keyof typeof student] !== null ? (
                            <Input
                              type="number"
                              min="0"
                              max={assessment.maxPoints}
                              defaultValue={student[assessment.id as keyof typeof student] as number}
                              className="w-16 text-center"
                            />
                          ) : (
                            <Input
                              type="number"
                              min="0"
                              max={assessment.maxPoints}
                              placeholder="-"
                              className="w-16 text-center"
                            />
                          )}
                        </TableCell>
                      ))}
                      <TableCell className={`text-center font-semibold ${getGradeColor(student.total)}`}>
                        {student.total.toFixed(1)}%
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className={getGradeColor(student.total)}>
                          {getLetterGrade(student.total)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherGradebook;