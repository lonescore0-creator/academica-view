import React, { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import StudentSidebar from "./StudentSidebar";
import TeacherSidebar from "./TeacherSidebar";
import RegistrarSidebar from "./RegistrarSidebar";
import DeanSidebar from "./DeanSidebar";
import VicePrincipalSidebar from "./VicePrincipalSidebar";
import { Button } from "@/components/ui/button";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

interface DashboardLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  userRole?: "admin" | "student" | "teacher" | "registrar" | "dean" | "vice-principal";
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  title, 
  description,
  userRole = "admin"
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const renderSidebar = () => {
    switch (userRole) {
      case "student":
        return <StudentSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />;
      case "teacher":
        return <TeacherSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />;
      case "registrar":
        return <RegistrarSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />;
      case "dean":
        return <DeanSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />;
      case "vice-principal":
        return <VicePrincipalSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />;
      default:
        return <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {renderSidebar()}
      
      {userRole === "admin" ? (
        <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-card border-b border-border px-6 py-4 shadow-soft">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{title}</h1>
              {description && (
                <p className="text-muted-foreground mt-1">{description}</p>
              )}
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search..."
                  className="pl-10 w-64"
                />
              </div>
              
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  3
                </span>
              </Button>
              
              {/* Profile */}
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-sm font-medium">Admin User</p>
                  <p className="text-xs text-muted-foreground">Administrator</p>
                </div>
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
      ) : (
        <main className="flex-1 overflow-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      )}
    </div>
  );
};

export default DashboardLayout;