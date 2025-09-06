import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  Shield, 
  AlertTriangle, 
  Heart, 
  ClipboardCheck,
  TrendingDown,
  Plus,
  Eye
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const DeanDashboard = () => {
  const deanData = {
    totalStudents: 1247,
    disciplinaryActions: 8,
    counselingSessions: 23,
    attendanceRate: 94.2,
    recentIncidents: [
      { student: "Samuel Weah", type: "Tardiness", date: "2024-02-10", status: "Resolved" },
      { student: "Ruth Konneh", type: "Academic Support", date: "2024-02-09", status: "Ongoing" },
      { student: "David Clarke", type: "Behavior Issue", date: "2024-02-08", status: "Under Review" }
    ],
    counselingSchedule: [
      { student: "Mary Dukuly", time: "10:00 AM", type: "Academic Guidance", date: "Today" },
      { student: "John Pewee", time: "2:00 PM", type: "Personal Counseling", date: "Today" },
      { student: "Grace Tubman", time: "9:00 AM", type: "Career Guidance", date: "Tomorrow" }
    ]
  };

  return (
    <DashboardLayout userRole="dean">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold">Dean of Students Dashboard</h1>
          <p className="text-white/80 mt-2">
            Monitor student welfare, discipline, and counseling services
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
                  <p className="text-2xl font-bold text-primary">{deanData.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Cases</p>
                  <p className="text-2xl font-bold text-orange-600">{deanData.disciplinaryActions}</p>
                </div>
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Counseling Sessions</p>
                  <p className="text-2xl font-bold text-green-600">{deanData.counselingSessions}</p>
                </div>
                <Heart className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Attendance Rate</p>
                  <p className="text-2xl font-bold text-blue-600">{deanData.attendanceRate}%</p>
                </div>
                <ClipboardCheck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Incidents */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Recent Cases
                </CardTitle>
                <CardDescription>Latest student affairs incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deanData.recentIncidents.map((incident, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{incident.student}</p>
                        <p className="text-sm text-muted-foreground">{incident.type} • {incident.date}</p>
                      </div>
                      <Badge variant={
                        incident.status === 'Resolved' ? 'default' : 
                        incident.status === 'Ongoing' ? 'secondary' : 'outline'
                      }>
                        {incident.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Case
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Counseling Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Counseling Schedule
                </CardTitle>
                <CardDescription>Upcoming counseling sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deanData.counselingSchedule.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{session.student}</p>
                        <p className="text-sm text-muted-foreground">{session.type} • {session.time}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline">{session.date}</Badge>
                        <Button size="sm" variant="ghost" className="ml-2">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Schedule Session
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DeanDashboard;