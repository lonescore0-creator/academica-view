import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  Calendar, 
  Users, 
  BookOpen, 
  Clock,
  TrendingUp,
  Plus,
  Edit
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const VicePrincipalDashboard = () => {
  const vpData = {
    totalTeachers: 42,
    totalClasses: 24,
    averageGrades: 85.3,
    scheduleCompliance: 96.8,
    gradeDistribution: [
      { grade: "A", count: 186, percentage: 35 },
      { grade: "B", count: 158, percentage: 30 },
      { grade: "C", count: 132, percentage: 25 },
      { grade: "D", count: 53, percentage: 10 }
    ],
    recentScheduleChanges: [
      { teacher: "Prof. Moses Konneh", subject: "Mathematics", change: "Room Changed", date: "2024-02-10" },
      { teacher: "Mrs. Grace Pewee", subject: "English", change: "Time Adjusted", date: "2024-02-09" },
      { teacher: "Mr. David Tubman", subject: "Science", change: "Class Added", date: "2024-02-08" }
    ],
    pendingApprovals: [
      { type: "Grade Submission", teacher: "Mrs. Sarah Dukuly", subject: "History", deadline: "Today" },
      { type: "Schedule Request", teacher: "Mr. John Varney", subject: "Chemistry", deadline: "Tomorrow" },
      { type: "Curriculum Update", teacher: "Prof. Mary Gaye", subject: "Biology", deadline: "2024-02-15" }
    ]
  };

  return (
    <DashboardLayout userRole="vice-principal">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold">Vice Principal Dashboard</h1>
          <p className="text-white/80 mt-2">
            Academic oversight, grade tracking, and schedule management
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
                  <p className="text-muted-foreground text-sm">Teachers</p>
                  <p className="text-2xl font-bold text-primary">{vpData.totalTeachers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Classes</p>
                  <p className="text-2xl font-bold text-blue-600">{vpData.totalClasses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Average Grade</p>
                  <p className="text-2xl font-bold text-green-600">{vpData.averageGrades}%</p>
                </div>
                <BarChart3 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Schedule Compliance</p>
                  <p className="text-2xl font-bold text-purple-600">{vpData.scheduleCompliance}%</p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grade Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Grade Distribution
                </CardTitle>
                <CardDescription>Current semester performance overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {vpData.gradeDistribution.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Grade {item.grade}</span>
                        <span className="text-sm text-muted-foreground">{item.count} students</span>
                      </div>
                      <Progress value={item.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Generate Grade Report
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Schedule Changes & Pending Approvals */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            {/* Recent Schedule Changes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Recent Changes
                </CardTitle>
                <CardDescription>Latest schedule modifications</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vpData.recentScheduleChanges.map((change, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{change.teacher}</p>
                        <p className="text-xs text-muted-foreground">{change.subject} • {change.change}</p>
                      </div>
                      <Badge variant="outline">{change.date}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Pending Approvals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Pending Approvals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {vpData.pendingApprovals.map((approval, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{approval.type}</p>
                        <p className="text-xs text-muted-foreground">{approval.teacher} • {approval.subject}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={approval.deadline === 'Today' ? 'destructive' : 'outline'}>
                          {approval.deadline}
                        </Badge>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
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

export default VicePrincipalDashboard;