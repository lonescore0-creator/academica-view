import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, AlertCircle, Info, Trophy, BookOpen } from "lucide-react";

const StudentAnnouncements = () => {
  const announcements = [
    {
      id: 1,
      title: "WAEC Examination Schedule Released",
      content: "The West African Examinations Council (WAEC) examination schedule for all senior students has been published. Please check your class schedules and prepare accordingly. Exams will begin on March 15th, 2024.",
      author: "Academic Office",
      date: "2024-01-10",
      category: "Academic",
      priority: "high",
      icon: BookOpen
    },
    {
      id: 2,
      title: "Independence Day Celebration - July 26th",
      content: "Join us for our annual Independence Day celebration! Students will perform cultural dances and songs. Registration is open for various cultural presentations.",
      author: "Cultural Affairs Department",
      date: "2024-01-08",
      category: "Event",
      priority: "medium",
      icon: Trophy
    },
    {
      id: 3,
      title: "Computer Lab Upgrade - Limited Access",
      content: "The main computer lab will undergo equipment upgrade from January 20th to February 10th. During this period, please use the temporary lab facility in Building C.",
      author: "IT Administration",
      date: "2024-01-05",
      category: "Facility",
      priority: "medium",
      icon: Info
    },
    {
      id: 4,
      title: "Parent-Teacher Conference Scheduled",
      content: "Parent-Teacher conferences are scheduled for February 5-7, 2024. Please inform your parents to schedule appointments with your respective teachers to discuss academic progress.",
      author: "Administration",
      date: "2024-01-03",
      category: "Academic",
      priority: "high",
      icon: AlertCircle
    },
    {
      id: 5,
      title: "National Science Fair Registration Open",
      content: "The annual National Science Fair is approaching! Registration is now open for all students. Submit your project proposals by February 1st, 2024. Winners will represent Liberia internationally.",
      author: "Science Department",
      date: "2024-01-01",
      category: "Academic",
      priority: "medium",
      icon: BookOpen
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Academic": return "bg-blue-500";
      case "Sports": return "bg-green-500";
      case "Facility": return "bg-orange-500";
      case "Event": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays <= 7) return `${diffInDays} days ago`;
    return formatDate(dateString);
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Announcements</h1>
          <p className="text-muted-foreground">Stay updated with the latest school news and updates</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{announcements.length}</div>
                <p className="text-sm text-muted-foreground">Total Announcements</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {announcements.filter(a => a.priority === "high").length}
                </div>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {announcements.filter(a => a.category === "Academic").length}
                </div>
                <p className="text-sm text-muted-foreground">Academic</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {announcements.filter(a => new Date(a.date) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length}
                </div>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((announcement) => {
            const IconComponent = announcement.icon;
            return (
              <Card key={announcement.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(announcement.category)} text-white`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{announcement.title}</CardTitle>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{getTimeAgo(announcement.date)}</span>
                          </div>
                          <span>By {announcement.author}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Badge className={`${getPriorityColor(announcement.priority)} text-white`}>
                        {announcement.priority.charAt(0).toUpperCase() + announcement.priority.slice(1)}
                      </Badge>
                      <Badge className={`${getCategoryColor(announcement.category)} text-white`}>
                        {announcement.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{announcement.content}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Posted on {formatDate(announcement.date)}</span>
                    </div>
                    <Button variant="outline" size="sm">Read More</Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentAnnouncements;