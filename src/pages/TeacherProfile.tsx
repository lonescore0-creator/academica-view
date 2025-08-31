import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Mail, Phone, MapPin, Calendar, Edit, Download, GraduationCap, Award, BookOpen } from "lucide-react";

const TeacherProfile = () => {
  const teacherInfo = {
    id: "TCH001",
    name: "Dr. Michael Chen",
    email: "michael.chen@lifeinternational.edu",
    phone: "+1 (555) 234-5678",
    department: "Mathematics Department",
    position: "Senior Mathematics Teacher",
    employeeId: "EMP2019-MT-001",
    dateOfBirth: "1985-03-22",
    address: "456 Maple Avenue, Springfield, IL 62701",
    emergencyContact: "+1 (555) 876-5432",
    joinDate: "2019-08-15",
    qualification: "Ph.D. in Mathematics, Stanford University"
  };

  const teachingInfo = {
    experience: 12,
    totalStudents: 95,
    currentClasses: 4,
    subjects: ["Mathematics", "Advanced Mathematics", "Calculus", "Statistics"],
    avgRating: 4.8,
    totalReviews: 247
  };

  const classes = [
    { name: "Mathematics - Grade 10A", students: 28, schedule: "Mon, Wed, Fri - 08:00-09:00" },
    { name: "Mathematics - Grade 10B", students: 26, schedule: "Tue, Thu - 09:15-10:15" },
    { name: "Advanced Mathematics - Grade 11", students: 22, schedule: "Mon, Wed - 10:30-11:30" },
    { name: "Calculus - Grade 12", students: 19, schedule: "Tue, Thu, Fri - 11:45-12:45" }
  ];

  const achievements = [
    { title: "Excellence in Teaching Award", year: "2023", organization: "Life International School" },
    { title: "Outstanding Mathematics Educator", year: "2022", organization: "State Education Board" },
    { title: "Innovation in STEM Education", year: "2021", organization: "National Education Society" },
    { title: "Best Faculty Award", year: "2020", organization: "Life International School" }
  ];

  const qualifications = [
    { degree: "Ph.D. in Mathematics", institution: "Stanford University", year: "2015" },
    { degree: "M.Sc. in Applied Mathematics", institution: "MIT", year: "2012" },
    { degree: "B.Sc. in Mathematics", institution: "UC Berkeley", year: "2010" },
    { degree: "Teaching Certification", institution: "California Teaching Commission", year: "2016" }
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

  const calculateExperience = (joinDate: string) => {
    const today = new Date();
    const join = new Date(joinDate);
    return Math.floor((today.getTime() - join.getTime()) / (1000 * 60 * 60 * 24 * 365.25));
  };

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">View and manage your professional information</p>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="w-24 h-24">
                <AvatarFallback className="text-2xl">MC</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{teacherInfo.name}</h2>
                    <p className="text-lg text-muted-foreground mt-1">{teacherInfo.position}</p>
                    <div className="flex items-center space-x-4 text-muted-foreground mt-2">
                      <div className="flex items-center space-x-1">
                        <GraduationCap className="h-4 w-4" />
                        <span>{teacherInfo.department}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="h-4 w-4" />
                        <span>{teachingInfo.experience} years experience</span>
                      </div>
                    </div>
                    <Badge variant="outline" className="mt-2">Employee ID: {teacherInfo.employeeId}</Badge>
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

        {/* Teaching Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{teachingInfo.totalStudents}</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{teachingInfo.currentClasses}</div>
              <p className="text-sm text-muted-foreground">Current Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{teachingInfo.avgRating}/5</div>
              <p className="text-sm text-muted-foreground">Avg Rating</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{teachingInfo.experience}</div>
              <p className="text-sm text-muted-foreground">Years Experience</p>
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
                  <p className="mt-1">{teacherInfo.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Date of Birth</label>
                  <p className="mt-1">{formatDate(teacherInfo.dateOfBirth)} ({calculateAge(teacherInfo.dateOfBirth)} years)</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p>{teacherInfo.email}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <p>{teacherInfo.phone}</p>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <div className="flex items-center space-x-2 mt-1">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <p>{teacherInfo.address}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Emergency Contact</label>
                  <p className="mt-1">{teacherInfo.emergencyContact}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Join Date</label>
                  <p className="mt-1">{formatDate(teacherInfo.joinDate)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle>Professional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Department</label>
                <p className="mt-1">{teacherInfo.department}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Position</label>
                <p className="mt-1">{teacherInfo.position}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Primary Qualification</label>
                <p className="mt-1">{teacherInfo.qualification}</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Teaching Experience</label>
                <p className="mt-1">{calculateExperience(teacherInfo.joinDate)} years at Life International School</p>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">Student Rating</label>
                <div className="flex items-center space-x-2 mt-1">
                  <Award className="h-4 w-4 text-muted-foreground" />
                  <p>{teachingInfo.avgRating}/5.0 ({teachingInfo.totalReviews} reviews)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Current Classes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BookOpen className="h-5 w-5" />
              <span>Current Classes</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {classes.map((cls, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{cls.name}</p>
                    <div className="text-sm text-muted-foreground">
                      {cls.students} students • {cls.schedule}
                    </div>
                  </div>
                  <Button variant="outline" size="sm">View Class</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Teaching Subjects */}
        <Card>
          <CardHeader>
            <CardTitle>Teaching Subjects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {teachingInfo.subjects.map((subject, index) => (
                <Badge key={index} variant="outline" className="justify-center py-2">
                  {subject}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Qualifications */}
        <Card>
          <CardHeader>
            <CardTitle>Educational Qualifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualifications.map((qualification, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{qualification.degree}</p>
                    <p className="text-sm text-muted-foreground">{qualification.institution}</p>
                  </div>
                  <Badge variant="outline">{qualification.year}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Awards & Achievements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Awards & Achievements</CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Download Certificates
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
                        <span>{achievement.year}</span>
                      </div>
                      <span>{achievement.organization}</span>
                    </div>
                  </div>
                  <Award className="h-6 w-6 text-yellow-500" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherProfile;