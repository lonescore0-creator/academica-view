import React from "react";
import { motion } from "framer-motion";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PWAInstallButton from "@/components/PWAInstallButton";
import { 
  LayoutDashboard, 
  BookOpen, 
  Calendar, 
  GraduationCap, 
  Users,
  BarChart3,
  ClipboardList,
  User,
  LogOut,
  ChevronLeft,
  Menu,
  Clock
} from "lucide-react";
import schoolLogo from "@/assets/school-logo.png";

interface VicePrincipalSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (collapsed: boolean) => void;
}

const navigationItems = [
  { name: "Dashboard", href: "/vice-principal-dashboard", icon: LayoutDashboard },
  { name: "Grade Tracking", href: "/vice-principal-grades", icon: BarChart3 },
  { name: "Schedule Management", href: "/vice-principal-schedules", icon: Calendar },
  { name: "Teacher Management", href: "/vice-principal-teachers", icon: Users },
  { name: "Course Assignments", href: "/vice-principal-courses", icon: BookOpen },
  { name: "Academic Reports", href: "/vice-principal-reports", icon: ClipboardList },
  { name: "Timetable", href: "/vice-principal-timetable", icon: Clock },
  { name: "Profile", href: "/vice-principal-profile", icon: User },
];

const VicePrincipalSidebar: React.FC<VicePrincipalSidebarProps> = ({ isCollapsed, setIsCollapsed }) => {
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
                <p className="text-white/60 text-xs">Vice Principal Portal</p>
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
        {/* PWA Install Button */}
        <div className="mb-4">
          <PWAInstallButton 
            variant="outline" 
            size="sm" 
            className="w-full text-white border-white/20 hover:bg-white/10 hover:text-white"
          />
        </div>
        
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">DK</span>
          </div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-white text-sm font-medium">David Kpangbai</p>
              <p className="text-white/60 text-xs">Vice Principal</p>
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

export default VicePrincipalSidebar;