import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, MapPin, Users, Calendar, Plus } from "lucide-react";

const TeacherSchedule = () => {
  const schedule = {
    Monday: [
      { time: "08:00-09:00", subject: "Mathematics", class: "Grade 10A", room: "Room 201", students: 28 },
      { time: "10:30-11:30", subject: "Advanced Mathematics", class: "Grade 11", room: "Room 203", students: 22 },
      { time: "13:45-14:45", subject: "Office Hours", class: "All Students", room: "Room 201", students: 0 },
    ],
    Tuesday: [
      { time: "09:15-10:15", subject: "Mathematics", class: "Grade 10B", room: "Room 201", students: 26 },
      { time: "11:45-12:45", subject: "Calculus", class: "Grade 12", room: "Room 203", students: 19 },
      { time: "14:00-15:00", subject: "Faculty Meeting", class: "All Staff", room: "Conference Room", students: 0 },
    ],
    Wednesday: [
      { time: "08:00-09:00", subject: "Mathematics", class: "Grade 10A", room: "Room 201", students: 28 },
      { time: "10:30-11:30", subject: "Advanced Mathematics", class: "Grade 11", room: "Room 203", students: 22 },
      { time: "13:45-14:45", subject: "Parent Consultations", class: "Parents", room: "Room 201", students: 0 },
    ],
    Thursday: [
      { time: "09:15-10:15", subject: "Mathematics", class: "Grade 10B", room: "Room 201", students: 26 },
      { time: "11:45-12:45", subject: "Calculus", class: "Grade 12", room: "Room 203", students: 19 },
      { time: "15:00-16:00", subject: "Math Club", class: "Extracurricular", room: "Room 203", students: 15 },
    ],
    Friday: [
      { time: "08:00-09:00", subject: "Mathematics", class: "Grade 10A", room: "Room 201", students: 28 },
      { time: "11:45-12:45", subject: "Calculus", class: "Grade 12", room: "Room 203", students: 19 },
      { time: "14:00-15:00", subject: "Preparation Time", class: "Personal", room: "Room 201", students: 0 },
    ],
  };

  const upcomingEvents = [
    { date: "2024-01-15", event: "Parent-Teacher Conference", time: "14:00-17:00" },
    { date: "2024-01-18", event: "Mathematics Department Meeting", time: "15:30-16:30" },
    { date: "2024-01-22", event: "Mid-term Exam Preparation", time: "13:00-14:00" },
    { date: "2024-01-25", event: "Professional Development Workshop", time: "09:00-12:00" },
  ];

  const days = Object.keys(schedule) as Array<keyof typeof schedule>;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const getClassTypeColor = (subject: string) => {
    const colors = {
      "Mathematics": "bg-blue-500",
      "Advanced Mathematics": "bg-purple-500",
      "Calculus": "bg-green-500",
      "Office Hours": "bg-orange-500",
      "Faculty Meeting": "bg-gray-500",
      "Parent Consultations": "bg-pink-500",
      "Math Club": "bg-teal-500",
      "Preparation Time": "bg-yellow-500"
    };
    return colors[subject as keyof typeof colors] || "bg-gray-500";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const totalClassesToday = schedule[today as keyof typeof schedule]?.length || 0;
  const totalWeeklyClasses = Object.values(schedule).flat().filter(item => item.students > 0).length;

  return (
    <DashboardLayout userRole="teacher">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
            <p className="text-muted-foreground">View your teaching schedule and upcoming events</p>
          </div>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Event
          </Button>
        </div>

        {/* Schedule Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-primary">{totalClassesToday}</div>
              <p className="text-sm text-muted-foreground">Classes Today</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{totalWeeklyClasses}</div>
              <p className="text-sm text-muted-foreground">Weekly Classes</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">4</div>
              <p className="text-sm text-muted-foreground">Different Grades</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">95</div>
              <p className="text-sm text-muted-foreground">Total Students</p>
            </CardContent>
          </Card>
        </div>

        {/* Today's Schedule */}
        {schedule[today as keyof typeof schedule] && (
          <Card className="border-primary">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <span>Today's Schedule</span>
                <Badge variant="outline">{today}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {schedule[today as keyof typeof schedule].map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Badge className={`${getClassTypeColor(class_.subject)} text-white`}>
                        {class_.time}
                      </Badge>
                      <div>
                        <p className="font-medium">{class_.subject}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{class_.class}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{class_.room}</span>
                          </div>
                          {class_.students > 0 && (
                            <span>{class_.students} students</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Weekly Schedule */}
        <div className="grid gap-6">
          <h2 className="text-xl font-semibold">Weekly Schedule</h2>
          {days.map((day) => (
            <Card key={day} className={day === today ? "border-primary" : ""}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>{day}</span>
                  {day === today && <Badge>Today</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3">
                  {schedule[day].map((class_, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="font-mono">{class_.time}</span>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div>
                          <p className="font-medium">{class_.subject}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Users className="h-3 w-3" />
                              <span>{class_.class}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{class_.room}</span>
                            </div>
                            {class_.students > 0 && (
                              <span>{class_.students} students</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{event.event}</p>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Add to Calendar</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default TeacherSchedule;