import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  BookOpen, 
  Calendar, 
  Clock,
  FileText,
  Plus,
  Eye,
  Edit
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const TeacherDashboard = () => {
  const teacherData = {
    name: "Dr. Michael Chen",
    subject: "Mathematics",
    employeeId: "EMP001",
    classes: [
      { name: "Grade 10-A", students: 28, subject: "Mathematics" },
      { name: "Grade 10-B", students: 25, subject: "Mathematics" },
      { name: "Grade 11-A", students: 22, subject: "Advanced Math" }
    ],
    totalStudents: 75,
    pendingGrades: 12,
    upcomingClasses: [
      { class: "Grade 10-A", time: "09:00 AM", subject: "Algebra", room: "M101" },
      { class: "Grade 11-A", time: "11:00 AM", subject: "Calculus", room: "M103" },
      { class: "Grade 10-B", time: "02:00 PM", subject: "Geometry", room: "M102" }
    ],
    recentActivities: [
      { activity: "Uploaded Grade 10-A test results", time: "2 hours ago" },
      { activity: "Created assignment for Grade 11-A", time: "1 day ago" },
      { activity: "Reviewed Grade 10-B homework", time: "2 days ago" }
    ]
  };

  return (
    <DashboardLayout userRole="teacher">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold">Welcome, {teacherData.name}</h1>
          <p className="text-white/80 mt-2">
            {teacherData.subject} Teacher | Employee ID: {teacherData.employeeId}
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Total Students</p>
                  <p className="text-2xl font-bold text-primary">{teacherData.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Classes</p>
                  <p className="text-2xl font-bold">{teacherData.classes.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Grades</p>
                  <p className="text-2xl font-bold text-orange-600">{teacherData.pendingGrades}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Today's Classes</p>
                  <p className="text-2xl font-bold text-green-600">{teacherData.upcomingClasses.length}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* My Classes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      My Classes
                    </CardTitle>
                    <CardDescription>Manage your assigned classes</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Assignment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {teacherData.classes.map((classItem, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{classItem.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {classItem.students} students • {classItem.subject}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Today's Schedule & Activities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Today's Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teacherData.upcomingClasses.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{schedule.class}</p>
                        <p className="text-sm text-muted-foreground">{schedule.subject} • Room {schedule.room}</p>
                      </div>
                      <Badge variant="outline">{schedule.time}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {teacherData.recentActivities.map((activity, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <p className="text-sm font-medium">{activity.activity}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Create Assignment</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Enter Grades</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">View Students</span>
                </Button>
                <Button className="h-20 flex flex-col gap-2" variant="outline">
                  <Calendar className="h-6 w-6" />
                  <span className="text-sm">Schedule Class</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default TeacherDashboard;