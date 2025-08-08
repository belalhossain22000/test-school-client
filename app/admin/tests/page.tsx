"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Plus, Eye, Edit, Trash2, BookOpen, Clock, Users } from 'lucide-react'

const mockTests = [
  {
    id: 1,
    title: "Step 1: A1 & A2 Assessment",
    description: "Basic digital competency assessment",
    questions: 44,
    timeLimit: 44,
    participants: 156,
    status: "active",
    createdDate: "2024-01-10",
    lastModified: "2024-01-15"
  },
  {
    id: 2,
    title: "Step 2: B1 & B2 Assessment",
    description: "Intermediate digital competency assessment",
    questions: 44,
    timeLimit: 44,
    participants: 89,
    status: "active",
    createdDate: "2024-01-10",
    lastModified: "2024-01-15"
  },
  {
    id: 3,
    title: "Step 3: C1 & C2 Assessment",
    description: "Advanced digital competency assessment",
    questions: 44,
    timeLimit: 44,
    participants: 34,
    status: "active",
    createdDate: "2024-01-10",
    lastModified: "2024-01-15"
  }
]

export default function AdminTestsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("userRole")
    
    if (!token || role !== "admin") {
      router.push("/auth/login")
      return
    }

    setTimeout(() => setIsLoading(false), 1000)
  }, [router])

  const handleViewTest = (testId: number) => {
    alert(`Viewing test ${testId}`)
  }

  const handleEditTest = (testId: number) => {
    alert(`Editing test ${testId}`)
  }

  const handleDeleteTest = (testId: number) => {
    if (confirm("Are you sure you want to delete this test?")) {
      alert(`Test ${testId} deleted successfully`)
    }
  }

  const handleCreateTest = () => {
    alert("Create new test functionality")
  }

  const filteredTests = mockTests.filter(test =>
    test.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    test.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
            <h1 className="text-2xl font-bold text-gray-900">Test Management</h1>
            <p className="text-gray-600">Create and manage assessment tests</p>
          </div>
          <Button onClick={handleCreateTest} className="w-full sm:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Create Test
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">3</div>
                  <p className="text-sm text-gray-600">Active Tests</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">279</div>
                  <p className="text-sm text-gray-600">Total Participants</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Clock className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">44</div>
                  <p className="text-sm text-gray-600">Avg. Duration (min)</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <BookOpen className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">132</div>
                  <p className="text-sm text-gray-600">Total Questions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card>
          <CardHeader>
            <CardTitle>All Tests</CardTitle>
            <CardDescription>
              Manage assessment tests and their configurations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Tests Table */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Test</TableHead>
                    <TableHead className="hidden sm:table-cell">Questions</TableHead>
                    <TableHead className="hidden md:table-cell">Time Limit</TableHead>
                    <TableHead className="hidden lg:table-cell">Participants</TableHead>
                    <TableHead className="hidden xl:table-cell">Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTests.map((test) => (
                    <TableRow key={test.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{test.title}</div>
                          <div className="text-sm text-gray-500">{test.description}</div>
                        </div>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">{test.questions}</TableCell>
                      <TableCell className="hidden md:table-cell">{test.timeLimit} min</TableCell>
                      <TableCell className="hidden lg:table-cell">{test.participants}</TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <Badge variant="default" className="capitalize">
                          {test.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleViewTest(test.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEditTest(test.id)}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTest(test.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
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
