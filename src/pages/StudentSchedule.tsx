import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, User } from "lucide-react";

const StudentSchedule = () => {
  const schedule = {
    Monday: [
      { time: "08:00-09:00", subject: "Mathematics", teacher: "Dr. Michael Chen", room: "Room 201" },
      { time: "09:15-10:15", subject: "English Literature", teacher: "Ms. Sarah Wilson", room: "Room 105" },
      { time: "10:30-11:30", subject: "Physics", teacher: "Mr. David Brown", room: "Lab 3" },
      { time: "11:45-12:45", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 2" },
      { time: "13:45-14:45", subject: "Physical Education", teacher: "Coach Thompson", room: "Gymnasium" },
    ],
    Tuesday: [
      { time: "08:00-09:00", subject: "Biology", teacher: "Ms. Jennifer Miller", room: "Lab 1" },
      { time: "09:15-10:15", subject: "History", teacher: "Mr. Robert Johnson", room: "Room 302" },
      { time: "10:30-11:30", subject: "Mathematics", teacher: "Dr. Michael Chen", room: "Room 201" },
      { time: "11:45-12:45", subject: "Art", teacher: "Ms. Lisa Garcia", room: "Art Studio" },
      { time: "13:45-14:45", subject: "Music", teacher: "Mr. James Anderson", room: "Music Room" },
    ],
    Wednesday: [
      { time: "08:00-09:00", subject: "Physics", teacher: "Mr. David Brown", room: "Lab 3" },
      { time: "09:15-10:15", subject: "English Literature", teacher: "Ms. Sarah Wilson", room: "Room 105" },
      { time: "10:30-11:30", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 2" },
      { time: "11:45-12:45", subject: "Mathematics", teacher: "Dr. Michael Chen", room: "Room 201" },
      { time: "13:45-14:45", subject: "Computer Science", teacher: "Mr. Tech Wilson", room: "Computer Lab" },
    ],
    Thursday: [
      { time: "08:00-09:00", subject: "History", teacher: "Mr. Robert Johnson", room: "Room 302" },
      { time: "09:15-10:15", subject: "Biology", teacher: "Ms. Jennifer Miller", room: "Lab 1" },
      { time: "10:30-11:30", subject: "English Literature", teacher: "Ms. Sarah Wilson", room: "Room 105" },
      { time: "11:45-12:45", subject: "Physics", teacher: "Mr. David Brown", room: "Lab 3" },
      { time: "13:45-14:45", subject: "Study Hall", teacher: "Various", room: "Library" },
    ],
    Friday: [
      { time: "08:00-09:00", subject: "Mathematics", teacher: "Dr. Michael Chen", room: "Room 201" },
      { time: "09:15-10:15", subject: "Chemistry", teacher: "Dr. Emily Davis", room: "Lab 2" },
      { time: "10:30-11:30", subject: "Physical Education", teacher: "Coach Thompson", room: "Gymnasium" },
      { time: "11:45-12:45", subject: "Assembly", teacher: "All Staff", room: "Main Hall" },
    ],
  };

  const days = Object.keys(schedule) as Array<keyof typeof schedule>;
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  const getSubjectColor = (subject: string) => {
    const colors = {
      "Mathematics": "bg-blue-500",
      "English Literature": "bg-green-500",
      "Physics": "bg-purple-500",
      "Chemistry": "bg-orange-500",
      "Biology": "bg-teal-500",
      "History": "bg-red-500",
      "Physical Education": "bg-yellow-500",
      "Art": "bg-pink-500",
      "Music": "bg-indigo-500",
      "Computer Science": "bg-gray-600",
      "Study Hall": "bg-gray-400",
      "Assembly": "bg-primary"
    };
    return colors[subject as keyof typeof colors] || "bg-gray-500";
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Schedule</h1>
          <p className="text-muted-foreground">View your weekly class timetable</p>
        </div>

        {/* Current Day Highlight */}
        <Card className="border-primary">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Today's Schedule</span>
              <Badge variant="outline">{today}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {schedule[today as keyof typeof schedule] ? (
              <div className="space-y-3">
                {schedule[today as keyof typeof schedule].map((class_, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Badge className={`${getSubjectColor(class_.subject)} text-white`}>
                        {class_.time}
                      </Badge>
                      <div>
                        <p className="font-medium">{class_.subject}</p>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>{class_.teacher}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="h-3 w-3" />
                            <span>{class_.room}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground">No classes scheduled for today</p>
            )}
          </CardContent>
        </Card>

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
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                          <Clock className="h-4 w-4" />
                          <span className="font-mono">{class_.time}</span>
                        </div>
                        <div className="w-px h-8 bg-border" />
                        <div>
                          <p className="font-medium">{class_.subject}</p>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{class_.teacher}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{class_.room}</span>
                            </div>
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
      </div>
    </DashboardLayout>
  );
};

export default StudentSchedule;