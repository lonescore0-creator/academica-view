import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Calendar,
  FileText,
  Settings,
  User,
  LogOut,
  ChevronLeft,
  Menu
} from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";

interface TeacherSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const navigationItems = [
  { name: "Dashboard", href: "/teacher-dashboard", icon: LayoutDashboard },
  { name: "My Classes", href: "/teacher-classes", icon: Users },
  { name: "Gradebook", href: "/teacher-grades", icon: GraduationCap },
  { name: "Assignments", href: "/teacher-assignments", icon: BookOpen },
  { name: "Schedule", href: "/teacher-schedule", icon: Calendar },
  { name: "Reports", href: "/teacher-reports", icon: FileText },
  { name: "Profile", href: "/teacher-profile", icon: User },
  { name: "Settings", href: "/teacher-settings", icon: Settings },
];

const TeacherSidebar: React.FC<TeacherSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
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
                <h2 className="text-white font-semibold text-lg">Eastwood Academy</h2>
                <p className="text-white/60 text-xs">Teacher Portal</p>
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
            <span className="text-white text-sm font-medium">MC</span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-white text-sm font-medium">Dr. Michael Chen</p>
              <p className="text-white/60 text-xs">Mathematics Teacher</p>
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

export default TeacherSidebar;