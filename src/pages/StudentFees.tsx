import React from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Calendar, CreditCard, Download, AlertCircle } from "lucide-react";

const StudentFees = () => {
  const feeStructure = {
    totalAnnualFee: 15000,
    paidAmount: 10000,
    pendingAmount: 5000,
    nextDueDate: "2024-02-15"
  };

  const paymentHistory = [
    {
      id: 1,
      description: "Tuition Fee - Semester 1",
      amount: 7500,
      paidDate: "2023-08-15",
      status: "paid",
      receipt: "RCP001"
    },
    {
      id: 2,
      description: "Activity Fee",
      amount: 1000,
      paidDate: "2023-09-10",
      status: "paid",
      receipt: "RCP002"
    },
    {
      id: 3,
      description: "Laboratory Fee",
      amount: 1500,
      paidDate: "2023-10-05",
      status: "paid",
      receipt: "RCP003"
    },
    {
      id: 4,
      description: "Tuition Fee - Semester 2",
      amount: 7500,
      dueDate: "2024-02-15",
      status: "pending"
    },
  ];

  const upcomingFees = [
    {
      description: "Tuition Fee - Semester 2",
      amount: 7500,
      dueDate: "2024-02-15",
      category: "Academic"
    },
    {
      description: "Examination Fee",
      amount: 500,
      dueDate: "2024-03-01",
      category: "Academic"
    },
  ];

  const paymentPercentage = (feeStructure.paidAmount / feeStructure.totalAnnualFee) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <DashboardLayout userRole="student">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Fee Management</h1>
          <p className="text-muted-foreground">Track your fee payments and pending dues</p>
        </div>

        {/* Fee Summary */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">{formatCurrency(feeStructure.totalAnnualFee)}</div>
                <p className="text-sm text-muted-foreground">Total Annual Fee</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{formatCurrency(feeStructure.paidAmount)}</div>
                <p className="text-sm text-muted-foreground">Amount Paid</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">{formatCurrency(feeStructure.pendingAmount)}</div>
                <p className="text-sm text-muted-foreground">Pending Amount</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{Math.round(paymentPercentage)}%</div>
                <p className="text-sm text-muted-foreground">Payment Progress</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Payment Progress */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Annual Fee Progress</span>
                <span>{formatCurrency(feeStructure.paidAmount)} / {formatCurrency(feeStructure.totalAnnualFee)}</span>
              </div>
              <Progress value={paymentPercentage} className="h-3" />
              <div className="flex items-center space-x-2 text-sm text-orange-600">
                <AlertCircle className="h-4 w-4" />
                <span>Next payment due: {formatDate(feeStructure.nextDueDate)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Payments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingFees.map((fee, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{fee.description}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {formatDate(fee.dueDate)}</span>
                      </div>
                      <Badge variant="outline">{fee.category}</Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-orange-600">{formatCurrency(fee.amount)}</div>
                    <Button size="sm" className="mt-2">
                      <CreditCard className="h-4 w-4 mr-1" />
                      Pay Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment History */}
        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentHistory.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{payment.description}</h3>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {payment.status === "paid" ? `Paid: ${formatDate(payment.paidDate!)}` : `Due: ${formatDate(payment.dueDate!)}`}
                        </span>
                      </div>
                      {payment.receipt && (
                        <span>Receipt: {payment.receipt}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold">{formatCurrency(payment.amount)}</div>
                      <Badge className={payment.status === "paid" ? "bg-green-500" : "bg-orange-500"}>
                        {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                      </Badge>
                    </div>
                    {payment.status === "paid" && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Receipt
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default StudentFees;