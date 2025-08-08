"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Clock, BookOpen, Award, TrendingUp, Play, Download, CheckCircle, Lock } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

// Mock student data
const mockStudentData = {
  name: "John Doe",
  email: "student@testschool.com",
  currentLevel: "A2",
  nextLevel: "B1",
  totalTests: 3,
  completedTests: 1,
  averageScore: 78,
  certificates: [
    {
      id: 1,
      level: "A2",
      score: 78,
      date: "2024-01-15",
      status: "completed"
    }
  ],
  testHistory: [
    {
      id: 1,
      step: 1,
      levels: "A1 & A2",
      score: 78,
      result: "A2 Certified",
      date: "2024-01-15",
      duration: "45 minutes",
      status: "completed"
    }
  ],
  nextTest: {
    step: 2,
    levels: "B1 & B2",
    questions: 44,
    timeLimit: "44 minutes",
    available: true
  },
  upcomingTests: [
    {
      step: 2,
      levels: "B1 & B2",
      status: "available",
      description: "Intermediate digital competency assessment"
    },
    {
      step: 3,
      levels: "C1 & C2",
      status: "locked",
      description: "Advanced digital competency assessment"
    }
  ]
}

export default function StudentDashboard() {
  const router = useRouter()
  const [studentData, setStudentData] = useState(mockStudentData)
  const [isLoading, setIsLoading] = useState(true)

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {


    if (!user || user.role !== "student") {
      dispatch(logout());
      router.push("/auth/login")
      return
    }

    setTimeout(() => setIsLoading(false), 1000)
  }, [router])

  const handleStartTest = () => {
    router.push("/student/test")
  }

  const handleViewResults = () => {
    router.push("/student/results")
  }

  const handleDownloadCertificate = (certificateId: number) => {
    // Mock certificate download
    alert(`Downloading certificate ${certificateId}...`)
  }

  const progressPercentage = (studentData.completedTests / studentData.totalTests) * 100

  if (isLoading) {
    return (
      <DashboardLayout userRole="student">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 text-white">
          <h1 className="text-2xl font-bold mb-2">Welcome back, {studentData.name}!</h1>
          <p className="text-blue-100">
            Continue your digital competency journey. You're currently at Level {studentData.currentLevel}.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Level</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.currentLevel}</div>
              <p className="text-xs text-muted-foreground">
                Next: {studentData.nextLevel}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tests Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {studentData.completedTests}/{studentData.totalTests}
              </div>
              <p className="text-xs text-muted-foreground">
                {Math.round(progressPercentage)}% complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Above average
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Certificates</CardTitle>
              <Award className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{studentData.certificates.length}</div>
              <p className="text-xs text-muted-foreground">
                Earned certificates
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Next Test */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Play className="w-5 h-5 mr-2" />
                  Next Assessment
                </CardTitle>
                <CardDescription>
                  Continue your digital competency journey
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">
                        Step {studentData.nextTest.step}: {studentData.nextTest.levels}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {studentData.nextTest.questions} questions • {studentData.nextTest.timeLimit}
                      </p>
                    </div>
                    <Badge variant="secondary">Available</Badge>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Assessment Guidelines:</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Answer all questions within the time limit</li>
                      <li>• You cannot pause or restart the test</li>
                      <li>• Ensure stable internet connection</li>
                      <li>• Use a quiet environment</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleStartTest}
                    className="w-full"
                    size="lg"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Assessment
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Test Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Assessment Progress</CardTitle>
                <CardDescription>Track your progress through all assessment steps</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {studentData.upcomingTests.map((test, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${test.status === 'available' ? 'bg-green-100 text-green-600' :
                            test.status === 'locked' ? 'bg-gray-100 text-gray-400' :
                              'bg-blue-100 text-blue-600'
                          }`}>
                          {test.status === 'available' ? (
                            <Play className="w-4 h-4" />
                          ) : test.status === 'locked' ? (
                            <Lock className="w-4 h-4" />
                          ) : (
                            <CheckCircle className="w-4 h-4" />
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium">Step {test.step}: {test.levels}</h4>
                          <p className="text-sm text-gray-600">{test.description}</p>
                        </div>
                      </div>
                      <Badge
                        variant={test.status === 'available' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {test.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Learning Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Overall Progress</span>
                      <span>{Math.round(progressPercentage)}%</span>
                    </div>
                    <Progress value={progressPercentage} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Step 1 (A1-A2)</span>
                      <Badge variant="secondary">Completed</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Step 2 (B1-B2)</span>
                      <Badge variant="outline">Available</Badge>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Step 3 (C1-C2)</span>
                      <Badge variant="outline">Locked</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentData.testHistory.map((test) => (
                    <div key={test.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-sm">Step {test.step}: {test.levels}</h4>
                        <p className="text-xs text-gray-500">
                          {test.date} • {test.duration}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-sm">{test.score}%</div>
                        <Badge variant="secondary" className="text-xs">{test.result}</Badge>
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={handleViewResults}
                  >
                    View All Results
                  </Button>
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
                  <Button variant="outline" className="w-full justify-start" onClick={handleStartTest}>
                    <BookOpen className="w-4 h-4 mr-2" />
                    Take Assessment
                  </Button>
                  <Button variant="outline" className="w-full justify-start" onClick={handleViewResults}>
                    <Award className="w-4 h-4 mr-2" />
                    View Results
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="/student/certificates">
                      <Download className="w-4 h-4 mr-2" />
                      My Certificates
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
