import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, 
  Calendar, 
  DollarSign, 
  FileText, 
  Clock,
  Award,
  Bell,
  Download
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const StudentDashboard = () => {
  const studentData = {
    name: "Sarah Johnson",
    class: "Grade 10-A",
    rollNumber: "2024001",
    subjects: [
      { name: "Mathematics", grade: "A", percentage: 92 },
      { name: "Physics", grade: "A-", percentage: 88 },
      { name: "Chemistry", grade: "B+", percentage: 85 },
      { name: "English", grade: "A", percentage: 94 },
      { name: "History", grade: "B", percentage: 82 }
    ],
    attendance: 94,
    feeBalance: 2500,
    upcomingTests: [
      { subject: "Mathematics", date: "2024-02-15", type: "Unit Test" },
      { subject: "Physics", date: "2024-02-18", type: "Lab Exam" }
    ],
    recentAnnouncements: [
      { title: "Science Fair 2024", date: "2024-02-10", content: "Registration open until Feb 20th" },
      { title: "Parent-Teacher Meet", date: "2024-02-08", content: "Scheduled for Feb 25th" }
    ]
  };

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold">Welcome back, {studentData.name}!</h1>
          <p className="text-white/80 mt-2">
            Class: {studentData.class} | Roll No: {studentData.rollNumber}
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
                  <p className="text-muted-foreground text-sm">Overall Grade</p>
                  <p className="text-2xl font-bold text-primary">A-</p>
                </div>
                <Award className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Attendance</p>
                  <p className="text-2xl font-bold text-green-600">{studentData.attendance}%</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Fee Balance</p>
                  <p className="text-2xl font-bold text-orange-600">${studentData.feeBalance}</p>
                </div>
                <DollarSign className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Subjects</p>
                  <p className="text-2xl font-bold">{studentData.subjects.length}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Current Grades */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Current Grades
                </CardTitle>
                <CardDescription>Your performance in all subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.subjects.map((subject, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{subject.name}</p>
                        <p className="text-sm text-muted-foreground">{subject.percentage}%</p>
                      </div>
                      <Badge variant={subject.grade.includes('A') ? 'default' : subject.grade.includes('B') ? 'secondary' : 'outline'}>
                        {subject.grade}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Report Card
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Tests & Announcements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Upcoming Tests */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Tests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.upcomingTests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{test.subject}</p>
                        <p className="text-sm text-muted-foreground">{test.type}</p>
                      </div>
                      <Badge variant="outline">{test.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Announcements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Announcements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.recentAnnouncements.map((announcement, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-medium text-sm">{announcement.title}</p>
                        <Badge variant="outline">{announcement.date}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;