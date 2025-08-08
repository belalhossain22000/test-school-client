"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, Users, Clock, Target, Award, Brain, Activity, BarChart3, PieChart, LineChart, Zap, AlertTriangle, CheckCircle, Star } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

// Mock analytics data
const mockAnalyticsData = {
  overview: {
    totalStudents: 45,
    activeStudents: 38,
    avgCompletionRate: 87,
    avgScore: 79,
    totalAssessments: 156,
    certificatesIssued: 23
  },
  performanceByLevel: [
    { level: "A1", students: 12, avgScore: 82, completionRate: 95, trend: "+5%" },
    { level: "A2", students: 15, avgScore: 78, completionRate: 88, trend: "+2%" },
    { level: "B1", students: 10, avgScore: 75, completionRate: 82, trend: "-1%" },
    { level: "B2", students: 8, avgScore: 81, completionRate: 76, trend: "+3%" }
  ],
  engagementMetrics: {
    dailyActiveUsers: 32,
    avgSessionDuration: "24 minutes",
    peakHours: "2:00 PM - 4:00 PM",
    weeklyGrowth: "+12%",
    monthlyRetention: "89%"
  },
  topPerformers: [
    { name: "Carol Davis", level: "B2", score: 94, progress: 90, certificates: 3 },
    { name: "Alice Johnson", level: "B1", score: 82, progress: 75, certificates: 2 },
    { name: "Eva Brown", level: "B1", score: 78, progress: 60, certificates: 1 }
  ],
  strugglingStudents: [
    { name: "David Wilson", level: "A1", score: 58, progress: 30, lastActive: "5 days ago" },
    { name: "Bob Smith", level: "A2", score: 65, progress: 45, lastActive: "3 days ago" }
  ],
  aiInsights: [
    {
      type: "recommendation",
      title: "Increase B1 Level Support",
      description: "B1 students show 15% lower completion rates. Consider additional resources.",
      priority: "high"
    },
    {
      type: "trend",
      title: "Peak Learning Hours Identified",
      description: "Students perform 23% better during 2-4 PM sessions.",
      priority: "medium"
    },
    {
      type: "alert",
      title: "Student Engagement Drop",
      description: "2 students haven't been active for over a week.",
      priority: "high"
    }
  ]
}

export default function SupervisorAnalyticsPage() {
  const router = useRouter()
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedMetric, setSelectedMetric] = useState("performance")
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800 border-red-200"
      case "medium": return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low": return "bg-green-100 text-green-800 border-green-200"
      default: return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "recommendation": return Brain
      case "trend": return TrendingUp
      case "alert": return AlertTriangle
      default: return Activity
    }
  }

  return (
    <DashboardLayout userRole="supervisor">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
            <p className="text-gray-600">Advanced insights and performance analytics</p>
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
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold">{mockAnalyticsData.overview.totalStudents}</p>
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
                  <p className="text-2xl font-bold text-green-600">{mockAnalyticsData.overview.activeStudents}</p>
                </div>
                <Activity className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{mockAnalyticsData.overview.avgCompletionRate}%</p>
                </div>
                <Target className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Score</p>
                  <p className="text-2xl font-bold text-orange-600">{mockAnalyticsData.overview.avgScore}%</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Assessments</p>
                  <p className="text-2xl font-bold text-indigo-600">{mockAnalyticsData.overview.totalAssessments}</p>
                </div>
                <PieChart className="w-8 h-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Certificates</p>
                  <p className="text-2xl font-bold text-yellow-600">{mockAnalyticsData.overview.certificatesIssued}</p>
                </div>
                <Award className="w-8 h-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="engagement">Engagement</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance by Level */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    Performance by Level
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAnalyticsData.performanceByLevel.map((level) => (
                      <div key={level.level} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">Level {level.level}</Badge>
                            <span className="text-sm text-gray-600">({level.students} students)</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium">{level.avgScore}%</span>
                            <span className={`text-xs ${level.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                              {level.trend}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Average Score</span>
                            <span>{level.avgScore}%</span>
                          </div>
                          <Progress value={level.avgScore} className="h-2" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>Completion Rate</span>
                            <span>{level.completionRate}%</span>
                          </div>
                          <Progress value={level.completionRate} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers & Struggling Students */}
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-500" />
                      Top Performers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalyticsData.topPerformers.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-600">Level {student.level}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-green-600">{student.score}%</div>
                            <div className="text-xs text-gray-500">{student.certificates} certificates</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Students Needing Support
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockAnalyticsData.strugglingStudents.map((student, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                          <div>
                            <div className="font-medium">{student.name}</div>
                            <div className="text-sm text-gray-600">Level {student.level}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-lg font-bold text-red-600">{student.score}%</div>
                            <div className="text-xs text-gray-500">Last active: {student.lastActive}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="engagement" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Daily Active Users</p>
                      <p className="text-3xl font-bold text-blue-600">{mockAnalyticsData.engagementMetrics.dailyActiveUsers}</p>
                      <p className="text-sm text-green-600">{mockAnalyticsData.engagementMetrics.weeklyGrowth} from last week</p>
                    </div>
                    <Activity className="w-12 h-12 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Avg Session Duration</p>
                      <p className="text-3xl font-bold text-purple-600">{mockAnalyticsData.engagementMetrics.avgSessionDuration}</p>
                      <p className="text-sm text-gray-500">Per learning session</p>
                    </div>
                    <Clock className="w-12 h-12 text-purple-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Monthly Retention</p>
                      <p className="text-3xl font-bold text-green-600">{mockAnalyticsData.engagementMetrics.monthlyRetention}</p>
                      <p className="text-sm text-gray-500">Student retention rate</p>
                    </div>
                    <TrendingUp className="w-12 h-12 text-green-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Peak Learning Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                    <div>
                      <div className="font-medium">Peak Hours</div>
                      <div className="text-sm text-gray-600">Highest student activity</div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-blue-600">{mockAnalyticsData.engagementMetrics.peakHours}</div>
                      <div className="text-sm text-gray-500">23% higher performance</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { time: "9-11 AM", activity: 65 },
                      { time: "11-1 PM", activity: 78 },
                      { time: "2-4 PM", activity: 95 },
                      { time: "4-6 PM", activity: 82 }
                    ].map((slot) => (
                      <div key={slot.time} className="text-center p-3 border rounded-lg">
                        <div className="text-sm font-medium">{slot.time}</div>
                        <div className="text-xs text-gray-600 mb-2">Activity</div>
                        <Progress value={slot.activity} className="h-2" />
                        <div className="text-xs text-gray-500 mt-1">{slot.activity}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {mockAnalyticsData.aiInsights.map((insight, index) => {
                const IconComponent = getInsightIcon(insight.type)
                return (
                  <Card key={index} className={`border-l-4 ${
                    insight.priority === 'high' ? 'border-red-500' : 
                    insight.priority === 'medium' ? 'border-yellow-500' : 'border-green-500'
                  }`}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-lg ${
                          insight.priority === 'high' ? 'bg-red-100' :
                          insight.priority === 'medium' ? 'bg-yellow-100' : 'bg-green-100'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            insight.priority === 'high' ? 'text-red-600' :
                            insight.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold">{insight.title}</h3>
                            <Badge className={getPriorityColor(insight.priority)}>
                              {insight.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{insight.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="w-5 h-5" />
                    Score Trends (Last 6 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { month: "Aug 2023", score: 72, trend: "up" },
                      { month: "Sep 2023", score: 75, trend: "up" },
                      { month: "Oct 2023", score: 73, trend: "down" },
                      { month: "Nov 2023", score: 78, trend: "up" },
                      { month: "Dec 2023", score: 81, trend: "up" },
                      { month: "Jan 2024", score: 79, trend: "down" }
                    ].map((data, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className={`p-1 rounded ${
                            data.trend === 'up' ? 'bg-green-100' : 'bg-red-100'
                          }`}>
                            {data.trend === 'up' ? 
                              <TrendingUp className="w-4 h-4 text-green-600" /> :
                              <TrendingDown className="w-4 h-4 text-red-600" />
                            }
                          </div>
                          <span className="font-medium">{data.month}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold">{data.score}%</div>
                          <Progress value={data.score} className="w-20 h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Key Performance Indicators
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        label: "Student Satisfaction", 
                        value: 92, 
                        target: 90, 
                        status: "exceeding",
                        icon: CheckCircle 
                      },
                      { 
                        label: "Course Completion", 
                        value: 87, 
                        target: 85, 
                        status: "meeting",
                        icon: Target 
                      },
                      { 
                        label: "Assessment Pass Rate", 
                        value: 79, 
                        target: 80, 
                        status: "below",
                        icon: AlertTriangle 
                      },
                      { 
                        label: "Time to Completion", 
                        value: 85, 
                        target: 75, 
                        status: "below",
                        icon: Clock 
                      }
                    ].map((kpi, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <kpi.icon className={`w-4 h-4 ${
                              kpi.status === 'exceeding' ? 'text-green-600' :
                              kpi.status === 'meeting' ? 'text-blue-600' : 'text-red-600'
                            }`} />
                            <span className="text-sm font-medium">{kpi.label}</span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-bold">{kpi.value}%</span>
                            <span className="text-xs text-gray-500 ml-1">/ {kpi.target}%</span>
                          </div>
                        </div>
                        <Progress 
                          value={kpi.value} 
                          className={`h-2 ${
                            kpi.status === 'exceeding' ? '[&>div]:bg-green-500' :
                            kpi.status === 'meeting' ? '[&>div]:bg-blue-500' : '[&>div]:bg-red-500'
                          }`} 
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
