import React from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, UserCheck, DollarSign, FileText, TrendingUp, Calendar, AlertTriangle } from "lucide-react";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Students",
      value: "1,247",
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Teachers",
      value: "89",
      change: "+3%",
      trend: "up",
      icon: UserCheck,
      color: "text-green-600"
    },
    {
      title: "Fees Collected",
      value: "$245,680",
      change: "+18%",
      trend: "up",
      icon: DollarSign,
      color: "text-yellow-600"
    },
    {
      title: "Pending Reports",
      value: "23",
      change: "-5%",
      trend: "down",
      icon: FileText,
      color: "text-red-600"
    }
  ];

  const recentActivities = [
    { action: "New student enrollment", name: "Sarah Johnson", time: "2 minutes ago", type: "enrollment" },
    { action: "Grade submitted", name: "Math - Class 10A", time: "15 minutes ago", type: "grade" },
    { action: "Fee payment received", name: "John Smith", time: "1 hour ago", type: "payment" },
    { action: "Teacher added", name: "Dr. Michael Brown", time: "3 hours ago", type: "teacher" },
    { action: "Report generated", name: "Monthly Attendance", time: "5 hours ago", type: "report" }
  ];

  const upcomingEvents = [
    { title: "Parent-Teacher Conference", date: "Sep 15, 2024", time: "9:00 AM" },
    { title: "Mid-term Examinations", date: "Sep 20, 2024", time: "All Day" },
    { title: "Science Fair", date: "Sep 25, 2024", time: "2:00 PM" },
    { title: "Sports Day", date: "Oct 2, 2024", time: "8:00 AM" }
  ];

  return (
    <DashboardLayout
      title="Dashboard"
      description="Welcome back! Here's what's happening at Eastwood Academy today."
    >
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="dashboard-card hover:shadow-medium transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-3xl font-bold text-foreground mt-2">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp className={`h-4 w-4 mr-1 ${stat.color}`} />
                        <span className={`text-sm font-medium ${stat.color}`}>
                          {stat.change} from last month
                        </span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg bg-secondary ${stat.color}`}>
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-primary" />
                  Recent Activities
                </CardTitle>
                <CardDescription>Latest updates from your school</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.name}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View All Activities
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Events
                </CardTitle>
                <CardDescription>Important dates to remember</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingEvents.map((event, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{event.title}</p>
                      <p className="text-sm text-muted-foreground">{event.time}</p>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{event.date}</span>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  View Calendar
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="dashboard-card">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks you might want to perform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col bg-gradient-primary">
                  <Users className="h-6 w-6 mb-2" />
                  Add Student
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <UserCheck className="h-6 w-6 mb-2" />
                  Add Teacher
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <FileText className="h-6 w-6 mb-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <DollarSign className="h-6 w-6 mb-2" />
                  Record Payment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;