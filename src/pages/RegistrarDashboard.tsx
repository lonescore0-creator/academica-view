import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  UserCheck, 
  FileText, 
  Calendar, 
  BookOpen,
  TrendingUp,
  Download,
  Plus
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const RegistrarDashboard = () => {
  const registrarData = {
    totalStudents: 1247,
    newEnrollments: 45,
    pendingTranscripts: 12,
    activeClasses: 24,
    recentEnrollments: [
      { name: "Agnes Kolleh", grade: "Grade 9", date: "2024-02-10", status: "Completed" },
      { name: "Moses Dukuly", grade: "Grade 11", date: "2024-02-09", status: "Pending" },
      { name: "Grace Pewee", grade: "Grade 10", date: "2024-02-08", status: "Completed" }
    ],
    pendingRequests: [
      { type: "Transcript Request", student: "Sarah Konneh", date: "2024-02-10" },
      { type: "Transfer Certificate", student: "John Varney", date: "2024-02-09" },
      { type: "Grade Report", student: "Mary Gaye", date: "2024-02-08" }
    ]
  };

  return (
    <DashboardLayout userRole="registrar">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-primary rounded-xl p-6 text-white"
        >
          <h1 className="text-2xl font-bold">Registrar Dashboard</h1>
          <p className="text-white/80 mt-2">
            Manage student records, enrollments, and academic documentation
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
                  <p className="text-2xl font-bold text-primary">{registrarData.totalStudents}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">New Enrollments</p>
                  <p className="text-2xl font-bold text-green-600">{registrarData.newEnrollments}</p>
                </div>
                <UserCheck className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Pending Requests</p>
                  <p className="text-2xl font-bold text-orange-600">{registrarData.pendingTranscripts}</p>
                </div>
                <FileText className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Active Classes</p>
                  <p className="text-2xl font-bold">{registrarData.activeClasses}</p>
                </div>
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Enrollments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Recent Enrollments
                </CardTitle>
                <CardDescription>Latest student registrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrarData.recentEnrollments.map((enrollment, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium">{enrollment.name}</p>
                        <p className="text-sm text-muted-foreground">{enrollment.grade} • {enrollment.date}</p>
                      </div>
                      <Badge variant={enrollment.status === 'Completed' ? 'default' : 'secondary'}>
                        {enrollment.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  New Enrollment
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Pending Requests */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Pending Requests
                </CardTitle>
                <CardDescription>Documents awaiting processing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {registrarData.pendingRequests.map((request, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{request.type}</p>
                        <p className="text-sm text-muted-foreground">{request.student} • {request.date}</p>
                      </div>
                      <Button size="sm" variant="outline">
                        Process
                      </Button>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RegistrarDashboard;