import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const StudentGrades = () => {
  const subjects = [
    { name: "Mathematics", grade: "A", percentage: 92, teacher: "Dr. Michael Chen" },
    { name: "English Literature", grade: "B+", percentage: 87, teacher: "Ms. Sarah Wilson" },
    { name: "Physics", grade: "A-", percentage: 89, teacher: "Mr. David Brown" },
    { name: "Chemistry", grade: "B", percentage: 84, teacher: "Dr. Emily Davis" },
    { name: "Biology", grade: "A", percentage: 91, teacher: "Ms. Jennifer Miller" },
    { name: "History", grade: "B+", percentage: 86, teacher: "Mr. Robert Johnson" },
  ];

  const getGradeColor = (grade: string) => {
    if (grade.startsWith("A")) return "bg-green-500";
    if (grade.startsWith("B")) return "bg-blue-500";
    if (grade.startsWith("C")) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Grades</h1>
          <p className="text-muted-foreground">View your academic performance and grades</p>
        </div>

        {/* Overall Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Overall Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">88.5%</div>
                <p className="text-muted-foreground">Overall Average</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">A-</div>
                <p className="text-muted-foreground">Current Grade</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">5/6</div>
                <p className="text-muted-foreground">Subjects Passed</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Grades */}
        <div className="grid gap-4">
          <h2 className="text-xl font-semibold">Subject Performance</h2>
          {subjects.map((subject, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{subject.name}</h3>
                    <p className="text-muted-foreground text-sm">Teacher: {subject.teacher}</p>
                  </div>
                  <Badge className={`${getGradeColor(subject.grade)} text-white`}>
                    {subject.grade}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{subject.percentage}%</span>
                  </div>
                  <Progress value={subject.percentage} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentGrades;