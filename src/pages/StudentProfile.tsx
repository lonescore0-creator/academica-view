import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Calendar, Edit, Download, User, GraduationCap } from "lucide-react";

const StudentProfile = () => {
  const studentInfo = {
    id: "STU001",
    name: "Sarah Johnson",
    email: "sarah.johnson@lifeinternational.edu",
    phone: "+1 (555) 123-4567",
    grade: "Grade 10-A",
    section: "A",
    rollNumber: "10A023",
    dateOfBirth: "2008-05-15",
    address: "123 Oak Street, Springfield, IL 62701",
    parentName: "Michael Johnson",
    parentEmail: "michael.johnson@email.com",
    parentPhone: "+1 (555) 987-6543",
    emergencyContact: "+1 (555) 456-7890",
    bloodGroup: "O+",
    admissionDate: "2022-08-15"
  };

  const academicInfo = {
    currentGPA: 3.8,
    totalCredits: 28,
    attendancePercentage: 95,
    rank: 5,
    totalStudents: 45
  };

  const subjects = [
    "Mathematics", "English Literature", "Physics", "Chemistry", "Biology", "History"
  ];

  const achievements = [
    { title: "Mathematics Olympiad - Regional Winner", date: "2023-11", category: "Academic" },
    { title: "Science Fair - Second Place", date: "2023-09", category: "Academic" },
    { title: "Basketball Team Captain", date: "2023-08", category: "Sports" },
    { title: "Debate Competition - Best Speaker", date: "2023-06", category: "Extracurricular" }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">View and manage your personal information</p>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">SJ</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{studentInfo.name}</h2>
                    <div className="flex items-center space-x-4 text-muted-foreground mt-1">
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{studentInfo.grade}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-4 w-4" />
                        <span>Roll No: {studentInfo.rollNumber}</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="mt-2">Student ID: {studentInfo.id}</Badge>
                  </div>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Academic Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{academicInfo.currentGPA}</div>
              <p className="text-sm text-muted-foreground">Current GPA</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{academicInfo.attendancePercentage}%</div>
              <p className="text-sm text-muted-foreground">Attendance</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{academicInfo.rank}</div>
              <p className="text-sm text-muted-foreground">Class Rank</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{academicInfo.totalCredits}</div>
              <p className="text-sm text-muted-foreground">Total Credits</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                  <p className="mt-1">{studentInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="mt-1">{formatDate(studentInfo.dateOfBirth)} ({calculateAge(studentInfo.dateOfBirth)} years)</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{studentInfo.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{studentInfo.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p>{studentInfo.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Blood Group</label>
                  <p className="mt-1">{studentInfo.bloodGroup}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Admission Date</label>
                  <p className="mt-1">{formatDate(studentInfo.admissionDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Parent/Guardian Information */}
          <Card>
            <CardHeader>
              <CardTitle>Parent/Guardian Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Parent/Guardian Name</label>
                <p className="mt-1">{studentInfo.parentName}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Parent Email</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{studentInfo.parentEmail}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Parent Phone</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{studentInfo.parentPhone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{studentInfo.emergencyContact}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Subjects */}
        <Card>
          <CardHeader>
            <CardTitle>Current Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {subjects.map((subject, index) => (
                <Badge key={index} variant="outline" className="justify-center py-2">
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Achievements & Awards</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Certificate
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{achievement.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(achievement.date)}</span>
                      </div>
                      <Badge variant="outline">{achievement.category}</Badge>
                    </div>
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

export default StudentProfile;