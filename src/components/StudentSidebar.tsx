import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  BookOpen, 
  GraduationCap, 
  DollarSign, 
  Calendar,
  Bell,
  User,
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";

interface StudentSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const navigationItems = [
  { name: "Dashboard", href: "/student-dashboard", icon: LayoutDashboard },
  { name: "My Grades", href: "/student-grades", icon: GraduationCap },
  { name: "Assignments", href: "/student-assignments", icon: BookOpen },
  { name: "Schedule", href: "/student-schedule", icon: Calendar },
  { name: "Fees", href: "/student-fees", icon: DollarSign },
  { name: "Announcements", href: "/student-announcements", icon: Bell },
  { name: "Profile", href: "/student-profile", icon: User },
];

const StudentSidebar: React.FC<StudentSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <motion.div
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[hsl(var(--sidebar-bg))] border-r border-border h-screen flex flex-col shadow-medium relative"
    >
      {/* Header */}
      <div className="p-4 border-b border-white/10">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-3"
            >
              <img 
                src={schoolLogo} 
                alt="School Logo" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <GraduationCap className="w-8 h-8 text-white hidden" />
              <div>
                <h2 className="text-white font-semibold text-lg">Monrovia Central High School</h2>
                <p className="text-white/60 text-xs">Student Portal</p>
              </div>
            </motion.div>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:bg-white/10 p-2"
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `sidebar-item group ${isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`
            }
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!isCollapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {item.name}
              </motion.span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">MK</span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-white text-sm font-medium">Martha Konneh</p>
              <p className="text-white/60 text-xs">Grade 10-A</p>
            </motion.div>
          )}
        </div>
        
        <Button
          onClick={handleLogout}
          variant="ghost"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
        >
          <LogOut className="h-4 w-4 mr-3" />
          {!isCollapsed && "Logout"}
        </Button>
      </div>
    </motion.div>
  );
};

export default StudentSidebar;