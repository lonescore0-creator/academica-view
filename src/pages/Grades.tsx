import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, Plus, GraduationCap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Grade {
  subject: string;
  marks: number;
  maxMarks: number;
  grade: string;
}

interface StudentGrade {
  studentId: string;
  studentName: string;
  class: string;
  grades: Grade[];
  totalMarks: number;
  percentage: number;
  overallGrade: string;
}

const Grades = () => {
  const { toast } = useToast();
  
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [gradeInput, setGradeInput] = useState({
    mathematics: "",
    physics: "",
    chemistry: "",
    biology: "",
    english: "",
    history: ""
  });

  const classes = ["8A", "8B", "8C", "9A", "9B", "9C", "10A", "10B", "10C", "11A", "11B", "11C", "12A", "12B"];
  
  const students = {
    "10A": [
      { id: "1", name: "Alice Johnson" },
      { id: "2", name: "Bob Smith" },
      { id: "3", name: "Carol Davis" }
    ],
    "9B": [
      { id: "4", name: "David Wilson" },
      { id: "5", name: "Emma Thompson" }
    ]
  };

  const subjects = [
    { name: "Mathematics", key: "mathematics", maxMarks: 100 },
    { name: "Physics", key: "physics", maxMarks: 100 },
    { name: "Chemistry", key: "chemistry", maxMarks: 100 },
    { name: "Biology", key: "biology", maxMarks: 100 },
    { name: "English", key: "english", maxMarks: 100 },
    { name: "History", key: "history", maxMarks: 100 }
  ];

  const [savedGrades, setSavedGrades] = useState<StudentGrade[]>([
    {
      studentId: "1",
      studentName: "Alice Johnson",
      class: "10A",
      grades: [
        { subject: "Mathematics", marks: 92, maxMarks: 100, grade: "A+" },
        { subject: "Physics", marks: 88, maxMarks: 100, grade: "A" },
        { subject: "Chemistry", marks: 85, maxMarks: 100, grade: "A" },
        { subject: "Biology", marks: 90, maxMarks: 100, grade: "A+" },
        { subject: "English", marks: 87, maxMarks: 100, grade: "A" },
        { subject: "History", marks: 84, maxMarks: 100, grade: "B+" }
      ],
      totalMarks: 526,
      percentage: 87.67,
      overallGrade: "A"
    },
    {
      studentId: "2",
      studentName: "Bob Smith",
      class: "10A",
      grades: [
        { subject: "Mathematics", marks: 78, maxMarks: 100, grade: "B+" },
        { subject: "Physics", marks: 82, maxMarks: 100, grade: "A-" },
        { subject: "Chemistry", marks: 76, maxMarks: 100, grade: "B+" },
        { subject: "Biology", marks: 80, maxMarks: 100, grade: "B+" },
        { subject: "English", marks: 85, maxMarks: 100, grade: "A" },
        { subject: "History", marks: 79, maxMarks: 100, grade: "B+" }
      ],
      totalMarks: 480,
      percentage: 80.0,
      overallGrade: "B+"
    }
  ]);

  const getGradeFromMarks = (marks: number): string => {
    if (marks >= 90) return "A+";
    if (marks >= 80) return "A";
    if (marks >= 70) return "B+";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C+";
    if (marks >= 40) return "C";
    return "F";
  };

  const handleGradeSubmit = () => {
    if (!selectedClass || !selectedStudent) {
      toast({
        title: "Missing Information",
        description: "Please select both class and student.",
        variant: "destructive",
      });
      return;
    }

    const studentName = students[selectedClass as keyof typeof students]?.find(s => s.id === selectedStudent)?.name;
    if (!studentName) return;

    const grades: Grade[] = subjects.map(subject => {
      const marks = parseInt(gradeInput[subject.key as keyof typeof gradeInput]) || 0;
      return {
        subject: subject.name,
        marks,
        maxMarks: subject.maxMarks,
        grade: getGradeFromMarks(marks)
      };
    });

    const totalMarks = grades.reduce((sum, grade) => sum + grade.marks, 0);
    const maxTotalMarks = grades.reduce((sum, grade) => sum + grade.maxMarks, 0);
    const percentage = (totalMarks / maxTotalMarks) * 100;

    const newStudentGrade: StudentGrade = {
      studentId: selectedStudent,
      studentName,
      class: selectedClass,
      grades,
      totalMarks,
      percentage,
      overallGrade: getGradeFromMarks(percentage)
    };

    // Update existing or add new
    const existingIndex = savedGrades.findIndex(sg => sg.studentId === selectedStudent);
    if (existingIndex >= 0) {
      const updated = [...savedGrades];
      updated[existingIndex] = newStudentGrade;
      setSavedGrades(updated);
    } else {
      setSavedGrades([...savedGrades, newStudentGrade]);
    }

    // Reset form
    setGradeInput({
      mathematics: "",
      physics: "",
      chemistry: "",
      biology: "",
      english: "",
      history: ""
    });

    toast({
      title: "Grades Saved",
      description: `Grades for ${studentName} have been successfully saved.`,
    });
  };

  const handleGenerateReport = (studentGrade: StudentGrade) => {
    toast({
      title: "Report Generated",
      description: `Report card for ${studentGrade.studentName} is ready for download.`,
    });
  };

  const currentStudentGrades = savedGrades.find(sg => sg.studentId === selectedStudent);

  return (
    <DashboardLayout
      title="Grades & Report Cards"
      description="Manage student grades and generate report cards"
    >
      <div className="space-y-6">
        {/* Grade Input Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Enter Grades
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="class">Select Class</Label>
                <Select value={selectedClass} onValueChange={setSelectedClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a class" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>Class {cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="student">Select Student</Label>
                <Select 
                  value={selectedStudent} 
                  onValueChange={setSelectedStudent}
                  disabled={!selectedClass}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a student" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedClass && students[selectedClass as keyof typeof students]?.map(student => (
                      <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedStudent && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h3 className="text-lg font-semibold">Subject Grades</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {subjects.map(subject => (
                    <div key={subject.key}>
                      <Label htmlFor={subject.key}>
                        {subject.name} (Max: {subject.maxMarks})
                      </Label>
                      <Input
                        id={subject.key}
                        type="number"
                        min="0"
                        max={subject.maxMarks}
                        value={gradeInput[subject.key as keyof typeof gradeInput]}
                        onChange={(e) => setGradeInput({
                          ...gradeInput,
                          [subject.key]: e.target.value
                        })}
                        placeholder="Enter marks"
                      />
                    </div>
                  ))}
                </div>
                
                <Button 
                  onClick={handleGradeSubmit}
                  className="bg-gradient-primary"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Save Grades
                </Button>
              </motion.div>
            )}
          </CardContent>
        </Card>

        {/* Current Student Grades Preview */}
        {currentStudentGrades && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Current Grades - {currentStudentGrades.studentName}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {currentStudentGrades.grades.map(grade => (
                    <div key={grade.subject} className="p-4 bg-secondary/50 rounded-lg">
                      <h4 className="font-medium">{grade.subject}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-2xl font-bold">{grade.marks}/{grade.maxMarks}</span>
                        <span className={`px-2 py-1 rounded text-sm font-medium ${
                          grade.grade.startsWith('A') ? 'bg-success/10 text-success' :
                          grade.grade.startsWith('B') ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {grade.grade}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Performance</p>
                    <p className="text-2xl font-bold">
                      {currentStudentGrades.percentage.toFixed(2)}% ({currentStudentGrades.overallGrade})
                    </p>
                  </div>
                  <Button onClick={() => handleGenerateReport(currentStudentGrades)}>
                    <FileText className="h-4 w-4 mr-2" />
                    Generate Report Card
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* All Students Grades Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Grades Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Student</th>
                    <th>Class</th>
                    <th>Total Marks</th>
                    <th>Percentage</th>
                    <th>Grade</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedGrades.map((studentGrade, index) => (
                    <motion.tr
                      key={studentGrade.studentId}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="font-medium">{studentGrade.studentName}</td>
                      <td>{studentGrade.class}</td>
                      <td>{studentGrade.totalMarks}/600</td>
                      <td>{studentGrade.percentage.toFixed(2)}%</td>
                      <td>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          studentGrade.overallGrade.startsWith('A') ? 'bg-success/10 text-success' :
                          studentGrade.overallGrade.startsWith('B') ? 'bg-warning/10 text-warning' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {studentGrade.overallGrade}
                        </span>
                      </td>
                      <td>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleGenerateReport(studentGrade)}
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Report Card
                        </Button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Grades;