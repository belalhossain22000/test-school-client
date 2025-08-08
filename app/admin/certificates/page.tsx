"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
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
import { Search, Download, Eye, Award, TrendingUp, Users, Calendar } from 'lucide-react'

const mockCertificates = [
  {
    id: 1,
    studentName: "John Doe",
    studentEmail: "john.doe@example.com",
    level: "A2",
    score: 78,
    issueDate: "2024-01-15",
    certificateId: "TS-A2-001",
    status: "issued"
  },
  {
    id: 2,
    studentName: "Jane Smith",
    studentEmail: "jane.smith@example.com",
    level: "B1",
    score: 82,
    issueDate: "2024-01-14",
    certificateId: "TS-B1-001",
    status: "issued"
  },
  {
    id: 3,
    studentName: "Carol Davis",
    studentEmail: "carol.davis@example.com",
    level: "C1",
    score: 85,
    issueDate: "2024-01-13",
    certificateId: "TS-C1-001",
    status: "issued"
  },
  {
    id: 4,
    studentName: "Bob Smith",
    studentEmail: "bob.smith@example.com",
    level: "A2",
    score: 65,
    issueDate: "2024-01-12",
    certificateId: "TS-A2-002",
    status: "issued"
  },
  {
    id: 5,
    studentName: "Eva Brown",
    studentEmail: "eva.brown@example.com",
    level: "B2",
    score: 82,
    issueDate: "2024-01-11",
    certificateId: "TS-B2-001",
    status: "issued"
  }
]

export default function AdminCertificatesPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [levelFilter, setLevelFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 10

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("userRole")
    
    if (!token || role !== "admin") {
      router.push("/auth/login")
      return
    }

    setTimeout(() => setIsLoading(false), 1000)
  }, [router])

  const handleViewCertificate = (certificateId: number) => {
    alert(`Viewing certificate ${certificateId}`)
  }

  const handleDownloadCertificate = (certificateId: number) => {
    alert(`Downloading certificate ${certificateId}`)
  }

  const handleExportAll = () => {
    alert("Exporting all certificates...")
  }

  const filteredCertificates = mockCertificates.filter(cert => {
    const matchesSearch = cert.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.studentEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cert.certificateId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLevel = levelFilter === "all" || cert.level === levelFilter
    
    return matchesSearch && matchesLevel
  })

  const paginatedCertificates = filteredCertificates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const totalPages = Math.ceil(filteredCertificates.length / itemsPerPage)

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
      <DashboardLayout userRole="admin">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="admin">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Certificate Management</h1>
            <p className="text-gray-600">View and manage issued certificates</p>
          </div>
          <Button onClick={handleExportAll} className="w-full sm:w-auto">
            <Download className="w-4 h-4 mr-2" />
            Export All
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-sm text-gray-600">Total Certificates</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">23</div>
                  <p className="text-sm text-gray-600">This Month</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <TrendingUp className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-sm text-gray-600">Avg. Score</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">389</div>
                  <p className="text-sm text-gray-600">Certified Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>Issued Certificates</CardTitle>
            <CardDescription>
              All certificates issued to students upon successful completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search certificates..."
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

            {/* Certificates Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead className="hidden sm:table-cell">Certificate ID</TableHead>
                    <TableHead className="hidden md:table-cell">Level</TableHead>
                    <TableHead className="hidden lg:table-cell">Score</TableHead>
                    <TableHead className="hidden xl:table-cell">Issue Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedCertificates.map((certificate) => (
                    <TableRow key={certificate.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback>
                              {certificate.studentName.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <div className="font-medium truncate">{certificate.studentName}</div>
                            <div className="text-sm text-gray-500 truncate">{certificate.studentEmail}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell font-mono text-sm">
                        {certificate.certificateId}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge className={getLevelColor(certificate.level)}>
                          {certificate.level}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">{certificate.score}%</TableCell>
                      <TableCell className="hidden xl:table-cell">{certificate.issueDate}</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewCertificate(certificate.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDownloadCertificate(certificate.id)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-4">
              <div className="text-sm text-gray-500">
                Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredCertificates.length)} of {filteredCertificates.length} certificates
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
    </DashboardLayout>
  )
}
