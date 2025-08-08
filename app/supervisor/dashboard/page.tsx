"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Users, BookOpen, Award, TrendingUp, Search, Download, Eye, BarChart3, Calendar } from 'lucide-react'

// Mock supervisor data
const mockSupervisorData = {
  stats: {
    assignedStudents: 45,
    completedTests: 128,
    averageScore: 76,
    certificatesEarned: 89
  },
  students: [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      currentLevel: "B1",
      progress: 67,
      lastActivity: "2024-01-15",
      testsCompleted: 2,
      averageScore: 78
    },
    {
      id: 2,
      name: "Bob Smith",
      email: "bob.smith@example.com",
      currentLevel: "A2",
      progress: 33,
      lastActivity: "2024-01-14",
      testsCompleted: 1,
      averageScore: 65
    },
    {
      id: 3,
      name: "Carol Davis",
      email: "carol.davis@example.com",
      currentLevel: "C1",
      progress: 100,
      lastActivity: "2024-01-13",
      testsCompleted: 3,
      averageScore: 85
    },
    {
      id: 4,
      name: "David Wilson",
      email: "david.wilson@example.com",
      currentLevel: "A1",
      progress: 33,
      lastActivity: "2024-01-12",
      testsCompleted: 1,
      averageScore: 45
    },
    {
      id: 5,
      name: "Eva Brown",
      email: "eva.brown@example.com",
      currentLevel: "B2",
      progress: 67,
      lastActivity: "2024-01-11",
      testsCompleted: 2,
      averageScore: 82
    }
  ],
  recentActivity: [
    {
      id: 1,
      studentName: "Alice Johnson",
      action: "Completed Step 2 Assessment",
      score: 78,
      level: "B1",
      timestamp: "2024-01-15 14:30"
    },
    {
      id: 2,
      studentName: "Eva Brown",
      action: "Started Step 3 Assessment",
      score: null,
      level: null,
      timestamp: "2024-01-15 10:15"
    },
    {
      id: 3,
      studentName: "Bob Smith",
      action: "Earned A2 Certificate",
      score: 65,
      level: "A2",
      timestamp: "2024-01-14 16:45"
    }
  ]
}

export default function SupervisorDashboard() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("userRole")
    
    if (!token || role !== "supervisor") {
      router.push("/auth/login")
      return
    }

    // Simulate data loading
    setTimeout(() => setIsLoading(false), 1000)
  }, [router])

  const handleViewStudent = (studentId: number) => {
    router.push(`/supervisor/students/${studentId}`)
  }

  const filteredStudents = mockSupervisorData.students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || student.currentLevel === levelFilter
    
    return matchesSearch && matchesLevel
  })

  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage)

  const getLevelColor = (level: string) => {
    switch (level) {
      case "A1": return "bg-green-100 text-green-800"
      case "A2": return "bg-green-200 text-green-800"
      case "B1": return "bg-blue-100 text-blue-800"
      case "B2": return "bg-blue-200 text-blue-800"
      case "C1": return "bg-purple-100 text-purple-800"
      case "C2": return "bg-purple-200 text-purple-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout userRole="supervisor">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="supervisor">
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Supervisor Dashboard</h1>
          <p className="text-green-100">
            Monitor student progress and provide guidance for their digital competency journey.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Assigned Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSupervisorData.stats.assignedStudents}</div>
              <p className="text-xs text-muted-foreground">
                Under supervision
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tests</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSupervisorData.stats.completedTests}</div>
              <p className="text-xs text-muted-foreground">
                Total assessments
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSupervisorData.stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Across all students
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates Earned</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockSupervisorData.stats.certificatesEarned}</div>
              <p className="text-xs text-muted-foreground">
                Total achievements
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Student Management */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Student Progress</CardTitle>
                    <CardDescription>Monitor your assigned students' performance</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={levelFilter} onValueChange={setLevelFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue placeholder="Level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Levels</SelectItem>
                      <SelectItem value="A1">Level A1</SelectItem>
                      <SelectItem value="A2">Level A2</SelectItem>
                      <SelectItem value="B1">Level B1</SelectItem>
                      <SelectItem value="B2">Level B2</SelectItem>
                      <SelectItem value="C1">Level C1</SelectItem>
                      <SelectItem value="C2">Level C2</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Students Table */}
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Current Level</TableHead>
                        <TableHead>Progress</TableHead>
                        <TableHead>Tests</TableHead>
                        <TableHead>Avg Score</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar className="w-8 h-8">
                                <AvatarFallback>
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={getLevelColor(student.currentLevel)}>
                              {student.currentLevel}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="w-full">
                              <div className="flex justify-between text-sm mb-1">
                                <span>{student.progress}%</span>
                              </div>
                              <Progress value={student.progress} className="h-2" />
                            </div>
                          </TableCell>
                          <TableCell>{student.testsCompleted}/3</TableCell>
                          <TableCell>{student.averageScore}%</TableCell>
                          <TableCell>{student.lastActivity}</TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewStudent(student.id)}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-sm text-gray-500">
                    Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredStudents.length)} of {filteredStudents.length} students
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Latest student actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSupervisorData.recentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="text-xs">
                          {activity.studentName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{activity.studentName}</div>
                        <div className="text-sm text-gray-600">{activity.action}</div>
                        <div className="text-xs text-gray-500">{activity.timestamp}</div>
                        {activity.score && (
                          <div className="mt-1">
                            <Badge variant="secondary" className="text-xs">
                              {activity.score}% - {activity.level}
                            </Badge>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Performance Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level A1-A2</span>
                      <span>15 students</span>
                    </div>
                    <Progress value={33} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level B1-B2</span>
                      <span>20 students</span>
                    </div>
                    <Progress value={44} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Level C1-C2</span>
                      <span>10 students</span>
                    </div>
                    <Progress value={22} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/supervisor/reports">
                      <Download className="w-4 h-4 mr-2" />
                      Download Progress Report
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/supervisor/analytics">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Analytics
                    </a>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/supervisor/certificates">
                      <Award className="w-4 h-4 mr-2" />
                      Certificate Summary
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
