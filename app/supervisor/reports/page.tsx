"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText, TrendingUp, Users, Award, Clock, BarChart3, PieChart, Calendar, Filter } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

// Mock report data
const mockReportData = {
  studentProgress: [
    { id: 1, name: "Alice Johnson", level: "B1", progress: 75, testsCompleted: 3, avgScore: 82, status: "On Track" },
    { id: 2, name: "Bob Smith", level: "A2", progress: 45, testsCompleted: 2, avgScore: 65, status: "Behind" },
    { id: 3, name: "Carol Davis", level: "B2", progress: 90, testsCompleted: 5, avgScore: 94, status: "Ahead" },
    { id: 4, name: "David Wilson", level: "A1", progress: 30, testsCompleted: 1, avgScore: 58, status: "Behind" },
    { id: 5, name: "Eva Brown", level: "B1", progress: 60, testsCompleted: 2, avgScore: 78, status: "On Track" }
  ],
  assessmentResults: [
    { assessment: "Digital Communication - B1", totalStudents: 15, avgScore: 78, passRate: 87, completionRate: 93 },
    { assessment: "Digital Safety - A2", totalStudents: 12, avgScore: 82, passRate: 92, completionRate: 100 },
    { assessment: "Content Creation - B2", totalStudents: 8, avgScore: 85, passRate: 88, completionRate: 88 },
    { assessment: "Problem Solving - B1", totalStudents: 18, avgScore: 74, passRate: 83, completionRate: 89 }
  ],
  performanceMetrics: [
    { metric: "Overall Completion Rate", value: 89, trend: "+5%", color: "text-green-600" },
    { metric: "Average Score", value: 79, trend: "+3%", color: "text-green-600" },
    { metric: "Pass Rate", value: 87, trend: "-2%", color: "text-red-600" },
    { metric: "Student Engagement", value: 92, trend: "+8%", color: "text-green-600" }
  ]
}

export default function SupervisorReportsPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedLevel, setSelectedLevel] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {


    if (!user || user.role !== "supervisor") {
      dispatch(logout());
      router.push("/auth/login")
      return
    }

    setTimeout(() => setIsLoading(false), 1000)
  }, [router])

  const handleExportReport = (reportType: string) => {
    // Simulate report export
    const timestamp = new Date().toISOString().split('T')[0]
    const filename = `${reportType}_report_${timestamp}.pdf`
    
    // Create a mock download
    const link = document.createElement('a')
    link.href = '#'
    link.download = filename
    link.click()
    
    alert(`Exporting ${reportType} report as ${filename}`)
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "ahead": return "bg-green-100 text-green-800"
      case "on track": return "bg-blue-100 text-blue-800"
      case "behind": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <DashboardLayout userRole="supervisor">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            <p className="text-gray-600">Comprehensive student performance reports</p>
          </div>
          <div className="flex gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => handleExportReport('comprehensive')} className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export All
            </Button>
          </div>
        </div>

        {/* Performance Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {mockReportData.performanceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.metric}</p>
                    <p className="text-2xl font-bold">{metric.value}%</p>
                    <p className={`text-sm ${metric.color}`}>{metric.trend} from last period</p>
                  </div>
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="student-progress" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="student-progress">Student Progress</TabsTrigger>
            <TabsTrigger value="assessment-results">Assessment Results</TabsTrigger>
            <TabsTrigger value="performance-trends">Performance Trends</TabsTrigger>
            <TabsTrigger value="custom-reports">Custom Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="student-progress" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Student Progress Report</CardTitle>
                <div className="flex gap-2">
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="All Levels" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="A1">A1</SelectItem>
                      <SelectItem value="A2">A2</SelectItem>
                      <SelectItem value="B1">B1</SelectItem>
                      <SelectItem value="B2">B2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleExportReport('student-progress')}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student Name</TableHead>
                        <TableHead>Level</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Tests Completed</TableHead>
                        <TableHead>Avg Score</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReportData.studentProgress.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">{student.name}</TableCell>
                          <TableCell>
                            <Badge variant="outline">{student.level}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={student.progress} className="w-16" />
                              <span className="text-sm">{student.progress}%</span>
                            </div>
                          </TableCell>
                          <TableCell>{student.testsCompleted}</TableCell>
                          <TableCell>{student.avgScore}%</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(student.status)}>
                              {student.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assessment-results" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Assessment Results Summary</CardTitle>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleExportReport('assessment-results')}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Assessment</TableHead>
                        <TableHead>Total Students</TableHead>
                        <TableHead>Average Score</TableHead>
                        <TableHead>Pass Rate</TableHead>
                        <TableHead>Completion Rate</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockReportData.assessmentResults.map((assessment, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{assessment.assessment}</TableCell>
                          <TableCell>{assessment.totalStudents}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <span>{assessment.avgScore}%</span>
                              <div className={`w-2 h-2 rounded-full ${
                                assessment.avgScore >= 80 ? 'bg-green-500' : 
                                assessment.avgScore >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                              }`} />
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={assessment.passRate} className="w-16" />
                              <span className="text-sm">{assessment.passRate}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={assessment.completionRate} className="w-16" />
                              <span className="text-sm">{assessment.completionRate}%</span>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance-trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Score Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">January 2024</span>
                      <span className="text-lg font-bold text-blue-600">78%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-sm font-medium">February 2024</span>
                      <span className="text-lg font-bold text-green-600">82%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">March 2024</span>
                      <span className="text-lg font-bold text-purple-600">85%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Completion Rates by Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { level: "A1", rate: 95, color: "bg-green-500" },
                      { level: "A2", rate: 88, color: "bg-blue-500" },
                      { level: "B1", rate: 82, color: "bg-yellow-500" },
                      { level: "B2", rate: 76, color: "bg-red-500" }
                    ].map((item) => (
                      <div key={item.level} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm font-medium">Level {item.level}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Progress value={item.rate} className="w-20" />
                          <span className="text-sm">{item.rate}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="custom-reports" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Weekly Progress Report",
                  description: "Detailed weekly progress for all students",
                  icon: Calendar,
                  type: "weekly-progress"
                },
                {
                  title: "Assessment Performance",
                  description: "Comprehensive assessment analysis",
                  icon: BarChart3,
                  type: "assessment-performance"
                },
                {
                  title: "Student Engagement",
                  description: "Activity and engagement metrics",
                  icon: Users,
                  type: "student-engagement"
                },
                {
                  title: "Certification Status",
                  description: "Certificate completion tracking",
                  icon: Award,
                  type: "certification-status"
                },
                {
                  title: "Time Analytics",
                  description: "Study time and session analysis",
                  icon: Clock,
                  type: "time-analytics"
                },
                {
                  title: "Custom Query",
                  description: "Build your own custom report",
                  icon: Filter,
                  type: "custom-query"
                }
              ].map((report) => (
                <Card key={report.type} className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <report.icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <h3 className="font-semibold">{report.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{report.description}</p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleExportReport(report.type)}
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Generate Report
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
