import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Download, FileText, BarChart3, PieChart, TrendingUp } from "lucide-react";

const TeacherReports = () => {
  const classReports = [
    {
      class: "Grade 10A - Mathematics",
      students: 28,
      avgGrade: 85.4,
      passRate: 92.9,
      attendanceRate: 94.2,
      topPerformer: "Carol Davis (96.0%)",
      improvement: "+3.2%"
    },
    {
      class: "Grade 10B - Mathematics", 
      students: 26,
      avgGrade: 82.1,
      passRate: 88.5,
      attendanceRate: 91.8,
      topPerformer: "Mike Wilson (93.5%)",
      improvement: "+1.8%"
    },
    {
      class: "Grade 11 - Advanced Mathematics",
      students: 22,
      avgGrade: 87.9,
      passRate: 95.5,
      attendanceRate: 96.1,
      topPerformer: "Emma Thompson (98.2%)",
      improvement: "+4.1%"
    },
    {
      class: "Grade 12 - Calculus",
      students: 19,
      avgGrade: 89.3,
      passRate: 94.7,
      attendanceRate: 97.4,
      topPerformer: "Alex Johnson (97.8%)",
      improvement: "+2.9%"
    }
  ];

  const assessmentReports = [
    {
      type: "Quiz 1",
      class: "Grade 10A",
      avgScore: 85.2,
      highScore: 98,
      lowScore: 67,
      completionRate: 100
    },
    {
      type: "Midterm Exam",
      class: "Grade 11",
      avgScore: 87.9,
      highScore: 96,
      lowScore: 72,
      completionRate: 100
    },
    {
      type: "Assignment 2",
      class: "Grade 12",
      avgScore: 91.4,
      highScore: 100,
      lowScore: 78,
      completionRate: 94.7
    }
  ];

  const getGradeColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getImprovementColor = (improvement: string) => {
    return improvement.startsWith("+") ? "text-green-600" : "text-red-600";
  };

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">View detailed performance reports for your classes</p>
          </div>
          <div className="flex space-x-2">
            <Select defaultValue="current">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Semester</SelectItem>
                <SelectItem value="previous">Previous Semester</SelectItem>
                <SelectItem value="year">Academic Year</SelectItem>
              </SelectContent>
            </Select>
            <Button>
              <Download className="h-4 w-4 mr-2" />
              Export All Reports
            </Button>
          </div>
        </div>

        {/* Overall Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">95</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">86.2%</div>
              <p className="text-sm text-muted-foreground">Overall Average</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">92.9%</div>
              <p className="text-sm text-muted-foreground">Pass Rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">94.9%</div>
              <p className="text-sm text-muted-foreground">Attendance Rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Class Performance Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Class Performance Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {classReports.map((report, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-lg">{report.class}</h3>
                      <p className="text-muted-foreground">{report.students} students</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline">
                        {report.improvement} from last term
                      </Badge>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        Detailed Report
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Average Grade</span>
                        <span className={getGradeColor(report.avgGrade)}>{report.avgGrade}%</span>
                      </div>
                      <Progress value={report.avgGrade} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Pass Rate</span>
                        <span className="text-green-600">{report.passRate}%</span>
                      </div>
                      <Progress value={report.passRate} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Attendance</span>
                        <span className="text-blue-600">{report.attendanceRate}%</span>
                      </div>
                      <Progress value={report.attendanceRate} className="h-2" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Top Performer</p>
                      <p className="font-medium text-sm">{report.topPerformer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Assessment Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChart className="h-5 w-5" />
              <span>Recent Assessment Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {assessmentReports.map((assessment, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{assessment.type} - {assessment.class}</h3>
                    <div className="grid grid-cols-4 gap-4 text-sm text-muted-foreground mt-2">
                      <div>Avg: <span className={getGradeColor(assessment.avgScore)}>{assessment.avgScore}%</span></div>
                      <div>High: <span className="text-green-600">{assessment.highScore}%</span></div>
                      <div>Low: <span className="text-red-600">{assessment.lowScore}%</span></div>
                      <div>Completed: <span className="text-blue-600">{assessment.completionRate}%</span></div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Performance Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Performance Trends</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-4">Grade Distribution Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">A Grades (90%+)</span>
                    <span className="text-green-600 font-medium">32% ↑</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">B Grades (80-89%)</span>
                    <span className="text-blue-600 font-medium">48% ↑</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">C Grades (70-79%)</span>
                    <span className="text-yellow-600 font-medium">15% ↓</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Below 70%</span>
                    <span className="text-red-600 font-medium">5% ↓</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h3 className="font-medium mb-4">Attendance Trends</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Perfect Attendance</span>
                    <span className="text-green-600 font-medium">23 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">95%+ Attendance</span>
                    <span className="text-blue-600 font-medium">67 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Below 90%</span>
                    <span className="text-orange-600 font-medium">5 students</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">At Risk (Below 80%)</span>
                    <span className="text-red-600 font-medium">0 students</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherReports;