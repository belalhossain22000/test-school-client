"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, Eye, Mail, Phone, Calendar, Award, TrendingUp, Clock, Users, BookOpen, CheckCircle, AlertCircle, Download } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

// Mock student data
const mockStudents = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 234 567 8901",
    avatar: "/placeholder.svg?height=40&width=40",
    currentLevel: "B1",
    progress: 75,
    status: "Active",
    lastActivity: "2024-01-15",
    testsCompleted: 3,
    totalTests: 4,
    averageScore: 82,
    joinDate: "2023-09-15",
    certificates: 2,
    studyHours: 45
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob.smith@email.com",
    phone: "+1 234 567 8902",
    avatar: "/placeholder.svg?height=40&width=40",
    currentLevel: "A2",
    progress: 45,
    status: "At Risk",
    lastActivity: "2024-01-10",
    testsCompleted: 2,
    totalTests: 3,
    averageScore: 65,
    joinDate: "2023-10-20",
    certificates: 1,
    studyHours: 28
  },
  {
    id: 3,
    name: "Carol Davis",
    email: "carol.davis@email.com",
    phone: "+1 234 567 8903",
    avatar: "/placeholder.svg?height=40&width=40",
    currentLevel: "B2",
    progress: 90,
    status: "Excellent",
    lastActivity: "2024-01-16",
    testsCompleted: 5,
    totalTests: 5,
    averageScore: 94,
    joinDate: "2023-08-10",
    certificates: 3,
    studyHours: 67
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 234 567 8904",
    avatar: "/placeholder.svg?height=40&width=40",
    currentLevel: "A1",
    progress: 30,
    status: "Inactive",
    lastActivity: "2024-01-05",
    testsCompleted: 1,
    totalTests: 2,
    averageScore: 58,
    joinDate: "2023-11-01",
    certificates: 0,
    studyHours: 15
  },
  {
    id: 5,
    name: "Eva Brown",
    email: "eva.brown@email.com",
    phone: "+1 234 567 8905",
    avatar: "/placeholder.svg?height=40&width=40",
    currentLevel: "B1",
    progress: 60,
    status: "Active",
    lastActivity: "2024-01-14",
    testsCompleted: 2,
    totalTests: 4,
    averageScore: 78,
    joinDate: "2023-09-25",
    certificates: 1,
    studyHours: 38
  }
]

export default function SupervisorStudentsPage() {
  const router = useRouter()
  const [students, setStudents] = useState(mockStudents)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [levelFilter, setLevelFilter] = useState("all")
  const [selectedStudent, setSelectedStudent] = useState<any>(null)
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

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || student.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesLevel = levelFilter === "all" || student.currentLevel === levelFilter
    
    return matchesSearch && matchesStatus && matchesLevel
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "excellent": return "bg-green-100 text-green-800"
      case "active": return "bg-blue-100 text-blue-800"
      case "at risk": return "bg-yellow-100 text-yellow-800"
      case "inactive": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  const handleContactStudent = (student: any, method: string) => {
    if (method === "email") {
      window.open(`mailto:${student.email}`)
    } else if (method === "phone") {
      window.open(`tel:${student.phone}`)
    }
  }

  const handleAssignTest = (studentId: number) => {
    // Simulate test assignment
    alert(`Test assigned to student ID: ${studentId}`)
  }

  const handleExportData = () => {
    // Simulate data export
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Name,Email,Level,Progress,Status,Last Activity\n" +
      filteredStudents.map(s => 
        `${s.name},${s.email},${s.currentLevel},${s.progress}%,${s.status},${s.lastActivity}`
      ).join("\n")
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", "students_data.csv")
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Calculate statistics
  const totalStudents = students.length
  const activeStudents = students.filter(s => s.status === "Active" || s.status === "Excellent").length
  const atRiskStudents = students.filter(s => s.status === "At Risk").length
  const averageProgress = Math.round(students.reduce((sum, s) => sum + s.progress, 0) / students.length)

  return (
    <DashboardLayout userRole="supervisor">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Management</h1>
            <p className="text-gray-600">Monitor and manage student progress</p>
          </div>
          <Button onClick={handleExportData} className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{totalStudents}</p>
                </div>
                <Users className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Active Students</p>
                  <p className="text-2xl font-bold text-green-600">{activeStudents}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">At Risk</p>
                  <p className="text-2xl font-bold text-yellow-600">{atRiskStudents}</p>
                </div>
                <AlertCircle className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Progress</p>
                  <p className="text-2xl font-bold text-purple-600">{averageProgress}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Search students by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="excellent">Excellent</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="at risk">At Risk</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue placeholder="Filter by level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  <SelectItem value="A1">A1</SelectItem>
                  <SelectItem value="A2">A2</SelectItem>
                  <SelectItem value="B1">B1</SelectItem>
                  <SelectItem value="B2">B2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Students Table */}
        <Card>
          <CardHeader>
            <CardTitle>Students ({filteredStudents.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="hidden md:table-cell">Level</TableHead>
                    <TableHead className="hidden lg:table-cell">Progress</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden sm:table-cell">Last Activity</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((student) => (
                    <TableRow key={student.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarImage src={student.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-500 md:hidden">{student.currentLevel}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline">{student.currentLevel}</Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex items-center space-x-2">
                          <Progress value={student.progress} className="w-16" />
                          <span className="text-sm">{student.progress}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(student.status)}>
                          {student.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-sm text-gray-500">
                        {student.lastActivity}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => setSelectedStudent(student)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Student Details</DialogTitle>
                              </DialogHeader>
                              {selectedStudent && (
                                <Tabs defaultValue="overview" className="w-full">
                                  <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="progress">Progress</TabsTrigger>
                                    <TabsTrigger value="tests">Tests</TabsTrigger>
                                    <TabsTrigger value="contact">Contact</TabsTrigger>
                                  </TabsList>
                                  
                                  <TabsContent value="overview" className="space-y-4">
                                    <div className="flex items-center space-x-4">
                                      <Avatar className="w-16 h-16">
                                        <AvatarImage src={selectedStudent.avatar || "/placeholder.svg"} />
                                        <AvatarFallback>{selectedStudent.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                                        <p className="text-gray-600">{selectedStudent.email}</p>
                                        <Badge className={getStatusColor(selectedStudent.status)}>
                                          {selectedStudent.status}
                                        </Badge>
                                      </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                                        <BookOpen className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-blue-600">{selectedStudent.currentLevel}</div>
                                        <div className="text-sm text-gray-600">Current Level</div>
                                      </div>
                                      <div className="text-center p-4 bg-green-50 rounded-lg">
                                        <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-green-600">{selectedStudent.progress}%</div>
                                        <div className="text-sm text-gray-600">Progress</div>
                                      </div>
                                      <div className="text-center p-4 bg-purple-50 rounded-lg">
                                        <Award className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-purple-600">{selectedStudent.certificates}</div>
                                        <div className="text-sm text-gray-600">Certificates</div>
                                      </div>
                                      <div className="text-center p-4 bg-orange-50 rounded-lg">
                                        <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                                        <div className="text-2xl font-bold text-orange-600">{selectedStudent.studyHours}</div>
                                        <div className="text-sm text-gray-600">Study Hours</div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="progress" className="space-y-4">
                                    <div className="space-y-4">
                                      <div>
                                        <div className="flex justify-between items-center mb-2">
                                          <span className="text-sm font-medium">Overall Progress</span>
                                          <span className="text-sm text-gray-600">{selectedStudent.progress}%</span>
                                        </div>
                                        <Progress value={selectedStudent.progress} />
                                      </div>
                                      
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 border rounded-lg">
                                          <h4 className="font-medium mb-2">Test Performance</h4>
                                          <div className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-sm">Tests Completed</span>
                                              <span className="text-sm font-medium">{selectedStudent.testsCompleted}/{selectedStudent.totalTests}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm">Average Score</span>
                                              <span className="text-sm font-medium">{selectedStudent.averageScore}%</span>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="p-4 border rounded-lg">
                                          <h4 className="font-medium mb-2">Activity</h4>
                                          <div className="space-y-2">
                                            <div className="flex justify-between">
                                              <span className="text-sm">Join Date</span>
                                              <span className="text-sm font-medium">{selectedStudent.joinDate}</span>
                                            </div>
                                            <div className="flex justify-between">
                                              <span className="text-sm">Last Activity</span>
                                              <span className="text-sm font-medium">{selectedStudent.lastActivity}</span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="tests" className="space-y-4">
                                    <div className="space-y-4">
                                      <div className="flex justify-between items-center">
                                        <h4 className="font-medium">Test History</h4>
                                        <Button 
                                          size="sm" 
                                          onClick={() => handleAssignTest(selectedStudent.id)}
                                        >
                                          Assign New Test
                                        </Button>
                                      </div>
                                      
                                      <div className="space-y-2">
                                        {[1, 2, 3].map((test) => (
                                          <div key={test} className="flex items-center justify-between p-3 border rounded-lg">
                                            <div>
                                              <div className="font-medium">Assessment Step {test}</div>
                                              <div className="text-sm text-gray-600">Completed on 2024-01-{10 + test}</div>
                                            </div>
                                            <div className="text-right">
                                              <div className="font-medium text-green-600">85%</div>
                                              <div className="text-sm text-gray-600">Passed</div>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  </TabsContent>
                                  
                                  <TabsContent value="contact" className="space-y-4">
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="p-4 border rounded-lg">
                                          <h4 className="font-medium mb-3">Contact Information</h4>
                                          <div className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                              <Mail className="w-4 h-4 text-gray-400" />
                                              <span className="text-sm">{selectedStudent.email}</span>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                              <Phone className="w-4 h-4 text-gray-400" />
                                              <span className="text-sm">{selectedStudent.phone}</span>
                                            </div>
                                          </div>
                                        </div>
                                        
                                        <div className="p-4 border rounded-lg">
                                          <h4 className="font-medium mb-3">Quick Actions</h4>
                                          <div className="space-y-2">
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              className="w-full justify-start"
                                              onClick={() => handleContactStudent(selectedStudent, 'email')}
                                            >
                                              <Mail className="w-4 h-4 mr-2" />
                                              Send Email
                                            </Button>
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              className="w-full justify-start"
                                              onClick={() => handleContactStudent(selectedStudent, 'phone')}
                                            >
                                              <Phone className="w-4 h-4 mr-2" />
                                              Call Student
                                            </Button>
                                            <Button 
                                              variant="outline" 
                                              size="sm" 
                                              className="w-full justify-start"
                                              onClick={() => handleAssignTest(selectedStudent.id)}
                                            >
                                              <Calendar className="w-4 h-4 mr-2" />
                                              Schedule Session
                                            </Button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              )}
                            </DialogContent>
                          </Dialog>
                          
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleContactStudent(student, 'email')}
                          >
                            <Mail className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
