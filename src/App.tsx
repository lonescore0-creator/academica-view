import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Grades from "./pages/Grades";
import Fees from "./pages/Fees";
import StudentDashboard from "./pages/StudentDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import StudentGrades from "./pages/StudentGrades";
import StudentAssignments from "./pages/StudentAssignments";
import StudentSchedule from "./pages/StudentSchedule";
import StudentFees from "./pages/StudentFees";
import StudentAnnouncements from "./pages/StudentAnnouncements";
import StudentProfile from "./pages/StudentProfile";
import TeacherClasses from "./pages/TeacherClasses";
import TeacherGradebook from "./pages/TeacherGradebook";
import TeacherAssignments from "./pages/TeacherAssignments";
import TeacherSchedule from "./pages/TeacherSchedule";
import TeacherReports from "./pages/TeacherReports";
import TeacherProfile from "./pages/TeacherProfile";
import TeacherSettings from "./pages/TeacherSettings";
import RegistrarDashboard from "./pages/RegistrarDashboard";
import DeanDashboard from "./pages/DeanDashboard";
import VicePrincipalDashboard from "./pages/VicePrincipalDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/grades" element={<Grades />} />
          <Route path="/fees" element={<Fees />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/student-grades" element={<StudentGrades />} />
          <Route path="/student-assignments" element={<StudentAssignments />} />
          <Route path="/student-schedule" element={<StudentSchedule />} />
          <Route path="/student-fees" element={<StudentFees />} />
          <Route path="/student-announcements" element={<StudentAnnouncements />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/teacher-classes" element={<TeacherClasses />} />
          <Route path="/teacher-grades" element={<TeacherGradebook />} />
          <Route path="/teacher-assignments" element={<TeacherAssignments />} />
          <Route path="/teacher-schedule" element={<TeacherSchedule />} />
          <Route path="/teacher-reports" element={<TeacherReports />} />
          <Route path="/teacher-profile" element={<TeacherProfile />} />
          <Route path="/teacher-settings" element={<TeacherSettings />} />
          <Route path="/registrar-dashboard" element={<RegistrarDashboard />} />
          <Route path="/dean-dashboard" element={<DeanDashboard />} />
          <Route path="/vice-principal-dashboard" element={<VicePrincipalDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
