import React, { useState } from "react";
import { motion } from "framer-motion";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  DollarSign, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  AlertCircle,
  Calendar,
  Receipt
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FeeRecord {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  feeType: string;
  totalAmount: number;
  paidAmount: number;
  balance: number;
  dueDate: string;
  lastPaymentDate?: string;
  status: "Paid" | "Partial" | "Overdue" | "Pending";
}

const Fees = () => {
  const { toast } = useToast();
  
  const [feeRecords, setFeeRecords] = useState<FeeRecord[]>([
    {
      id: "1",
      studentId: "1",
      studentName: "Alice Johnson",
      class: "10A",
      feeType: "Tuition Fee",
      totalAmount: 2500,
      paidAmount: 2500,
      balance: 0,
      dueDate: "2024-09-01",
      lastPaymentDate: "2024-08-25",
      status: "Paid"
    },
    {
      id: "2",
      studentId: "2",
      studentName: "Bob Smith",
      class: "9B",
      feeType: "Tuition Fee",
      totalAmount: 2500,
      paidAmount: 1500,
      balance: 1000,
      dueDate: "2024-09-01",
      lastPaymentDate: "2024-08-15",
      status: "Partial"
    },
    {
      id: "3",
      studentId: "3",
      studentName: "Carol Davis",
      class: "11A",
      feeType: "Tuition Fee",
      totalAmount: 2500,
      paidAmount: 0,
      balance: 2500,
      dueDate: "2024-08-15",
      status: "Overdue"
    },
    {
      id: "4",
      studentId: "4",
      studentName: "David Wilson",
      class: "8C",
      feeType: "Activity Fee",
      totalAmount: 500,
      paidAmount: 0,
      balance: 500,
      dueDate: "2024-09-15",
      status: "Pending"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<FeeRecord | null>(null);
  const [paymentAmount, setPaymentAmount] = useState("");

  const filteredRecords = feeRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.class.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCollected = feeRecords.reduce((sum, record) => sum + record.paidAmount, 0);
  const totalPending = feeRecords.reduce((sum, record) => sum + record.balance, 0);
  const totalOverdue = feeRecords
    .filter(record => record.status === "Overdue")
    .reduce((sum, record) => sum + record.balance, 0);

  const handleMarkPayment = (record: FeeRecord) => {
    setSelectedRecord(record);
    setPaymentAmount(record.balance.toString());
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRecord) return;

    const amount = parseFloat(paymentAmount);
    if (amount <= 0 || amount > selectedRecord.balance) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid payment amount.",
        variant: "destructive",
      });
      return;
    }

    const updatedRecords = feeRecords.map(record => {
      if (record.id === selectedRecord.id) {
        const newPaidAmount = record.paidAmount + amount;
        const newBalance = record.totalAmount - newPaidAmount;
        return {
          ...record,
          paidAmount: newPaidAmount,
          balance: newBalance,
          lastPaymentDate: new Date().toISOString().split('T')[0],
          status: newBalance === 0 ? "Paid" as const : "Partial" as const
        };
      }
      return record;
    });

    setFeeRecords(updatedRecords);
    setIsPaymentDialogOpen(false);
    setSelectedRecord(null);
    setPaymentAmount("");

    toast({
      title: "Payment Recorded",
      description: `Payment of $${amount} has been recorded for ${selectedRecord.studentName}.`,
    });
  };

  const handleExportToExcel = () => {
    toast({
      title: "Export Started",
      description: "Fee records are being exported to Excel format.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-success/10 text-success";
      case "Partial":
        return "bg-warning/10 text-warning";
      case "Overdue":
        return "bg-destructive/10 text-destructive";
      case "Pending":
        return "bg-muted/50 text-muted-foreground";
      default:
        return "bg-muted/50 text-muted-foreground";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "Overdue":
        return <AlertCircle className="h-4 w-4 text-destructive" />;
      default:
        return <Calendar className="h-4 w-4 text-warning" />;
    }
  };

  return (
    <DashboardLayout
      title="Fees Management"
      description="Track payments, manage fee records, and generate reports"
    >
      <div className="space-y-6">
        {/* Fee Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Collected</p>
                    <p className="text-3xl font-bold text-success">${totalCollected.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-success/10">
                    <DollarSign className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Pending</p>
                    <p className="text-3xl font-bold text-warning">${totalPending.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-warning/10">
                    <Calendar className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="dashboard-card">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overdue Amount</p>
                    <p className="text-3xl font-bold text-destructive">${totalOverdue.toLocaleString()}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-destructive/10">
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Filters and Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Fee Records ({filteredRecords.length})
              <Button onClick={handleExportToExcel} variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export to Excel
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by student name or class..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="partial">Partial</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Fee Records Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Student</th>
                      <th>Class</th>
                      <th>Fee Type</th>
                      <th>Total Amount</th>
                      <th>Paid Amount</th>
                      <th>Balance</th>
                      <th>Due Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRecords.map((record, index) => (
                      <motion.tr
                        key={record.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <td className="font-medium">{record.studentName}</td>
                        <td>{record.class}</td>
                        <td>{record.feeType}</td>
                        <td>${record.totalAmount}</td>
                        <td className="text-success">${record.paidAmount}</td>
                        <td className={record.balance > 0 ? "text-destructive font-medium" : "text-muted-foreground"}>
                          ${record.balance}
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            {getStatusIcon(record.status)}
                            {new Date(record.dueDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                            {record.status}
                          </span>
                        </td>
                        <td>
                          <div className="flex items-center gap-2">
                            {record.balance > 0 && (
                              <Button 
                                size="sm" 
                                onClick={() => handleMarkPayment(record)}
                                className="bg-gradient-primary"
                              >
                                <Receipt className="h-4 w-4 mr-1" />
                                Pay
                              </Button>
                            )}
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Record Payment</DialogTitle>
            <DialogDescription>
              Enter payment details for {selectedRecord?.studentName}
            </DialogDescription>
          </DialogHeader>
          {selectedRecord && (
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4 p-4 bg-secondary/50 rounded-lg">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="font-medium">${selectedRecord.totalAmount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Outstanding Balance</p>
                  <p className="font-medium text-destructive">${selectedRecord.balance}</p>
                </div>
              </div>
              
              <div>
                <Label htmlFor="paymentAmount">Payment Amount</Label>
                <Input
                  id="paymentAmount"
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={selectedRecord.balance}
                  value={paymentAmount}
                  onChange={(e) => setPaymentAmount(e.target.value)}
                  placeholder="Enter payment amount"
                  required
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-primary">
                  Record Payment
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsPaymentDialogOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
};

export default Fees;