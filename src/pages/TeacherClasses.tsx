import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Clock, BookOpen, Calendar, Eye } from "lucide-react";

const TeacherClasses = () => {
  const classes = [
    {
      id: 1,
      name: "Mathematics - Grade 10A",
      subject: "Mathematics",
      grade: "10A",
      students: 28,
      schedule: "Mon, Wed, Fri - 08:00-09:00",
      room: "Room 201",
      semester: "Spring 2024"
    },
    {
      id: 2,
      name: "Mathematics - Grade 10B", 
      subject: "Mathematics",
      grade: "10B",
      students: 26,
      schedule: "Tue, Thu - 09:15-10:15",
      room: "Room 201",
      semester: "Spring 2024"
    },
    {
      id: 3,
      name: "English Language - Grade 11",
      subject: "English Language",
      grade: "11",
      students: 22,
      schedule: "Mon, Wed - 10:30-11:30",
      room: "Room 203",
      semester: "Spring 2024"
    },
    {
      id: 4,
      name: "Liberian History - Grade 12",
      subject: "Liberian History",
      grade: "12",
      students: 19,
      schedule: "Tue, Thu, Fri - 11:45-12:45",
      room: "Room 205",
      semester: "Spring 2024"
    }
  ];

  const recentActivities = [
    { class: "Grade 10A", activity: "Quiz submitted", time: "2 hours ago" },
    { class: "Grade 11", activity: "Assignment graded", time: "4 hours ago" },
    { class: "Grade 10B", activity: "Attendance marked", time: "1 day ago" },
    { class: "Grade 12", activity: "New material uploaded", time: "2 days ago" }
  ];

  const totalStudents = classes.reduce((sum, cls) => sum + cls.students, 0);

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Classes</h1>
          <p className="text-muted-foreground">Manage your classes and student information</p>
        </div>

        {/* Class Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{classes.length}</div>
              <p className="text-sm text-muted-foreground">Total Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalStudents}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">4</div>
              <p className="text-sm text-muted-foreground">Active Courses</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">95%</div>
              <p className="text-sm text-muted-foreground">Avg Attendance</p>
            </CardContent>
          </Card>
        </div>

        {/* Class Cards */}
        <div className="grid gap-6">
          <h2 className="text-xl font-semibold">Your Classes</h2>
          {classes.map((classItem) => (
            <Card key={classItem.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{classItem.name}</CardTitle>
                    <p className="text-muted-foreground">{classItem.semester}</p>
                  </div>
                  <Badge variant="outline">{classItem.subject}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{classItem.students} Students</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{classItem.schedule}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{classItem.room}</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Students
                  </Button>
                  <Button variant="outline" size="sm">Take Attendance</Button>
                  <Button variant="outline" size="sm">Grade Book</Button>
                  <Button variant="outline" size="sm">Assignments</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Class Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div>
                      <p className="font-medium">{activity.class}</p>
                      <p className="text-sm text-muted-foreground">{activity.activity}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{activity.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherClasses;