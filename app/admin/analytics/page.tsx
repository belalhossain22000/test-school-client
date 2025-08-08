"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Users, Award, Calendar, Clock, Target, Activity } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {


    if (!user || user.role !== "admin") {
      dispatch(logout());
      router.push("/auth/login")
      return
    }

    setTimeout(() => setIsLoading(false), 1000)
  }, [router])

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
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600">Comprehensive insights into platform performance and user engagement</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Users className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">1,247</div>
                  <p className="text-sm text-gray-600">Total Users</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+12.5%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Activity className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-sm text-gray-600">Active Tests</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+8.3%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">456</div>
                  <p className="text-sm text-gray-600">Certificates</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+15.2%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Target className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">73%</div>
                  <p className="text-sm text-gray-600">Avg Score</p>
                  <div className="flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 text-green-600 mr-1" />
                    <span className="text-xs text-green-600">+2.1%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* User Growth */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 mr-2" />
                User Growth Trends
              </CardTitle>
              <CardDescription>Monthly user registration and activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>January 2024</span>
                    <span>156 new users</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>December 2023</span>
                    <span>142 new users</span>
                  </div>
                  <Progress value={71} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>November 2023</span>
                    <span>128 new users</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>October 2023</span>
                    <span>134 new users</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Test Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Test Performance
              </CardTitle>
              <CardDescription>Average scores by assessment level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Step 1 (A1-A2)</span>
                    <span>68% avg score</span>
                  </div>
                  <Progress value={68} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Step 2 (B1-B2)</span>
                    <span>74% avg score</span>
                  </div>
                  <Progress value={74} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Step 3 (C1-C2)</span>
                    <span>81% avg score</span>
                  </div>
                  <Progress value={81} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Certification Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Certification Distribution</CardTitle>
              <CardDescription>Breakdown by competency level</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800 mr-2">A1</Badge>
                    <span className="text-sm">Basic</span>
                  </div>
                  <span className="text-sm font-medium">89 (19.5%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-green-200 text-green-800 mr-2">A2</Badge>
                    <span className="text-sm">Elementary</span>
                  </div>
                  <span className="text-sm font-medium">134 (29.4%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-blue-100 text-blue-800 mr-2">B1</Badge>
                    <span className="text-sm">Intermediate</span>
                  </div>
                  <span className="text-sm font-medium">112 (24.6%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-blue-200 text-blue-800 mr-2">B2</Badge>
                    <span className="text-sm">Upper Inter.</span>
                  </div>
                  <span className="text-sm font-medium">78 (17.1%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-purple-100 text-purple-800 mr-2">C1</Badge>
                    <span className="text-sm">Advanced</span>
                  </div>
                  <span className="text-sm font-medium">32 (7.0%)</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Badge className="bg-purple-200 text-purple-800 mr-2">C2</Badge>
                    <span className="text-sm">Expert</span>
                  </div>
                  <span className="text-sm font-medium">11 (2.4%)</span>
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
              <CardDescription>Latest platform activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">New user registered</p>
                    <p className="text-xs text-gray-500">John Smith - 2 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Test completed</p>
                    <p className="text-xs text-gray-500">Step 2 Assessment - 5 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">Certificate issued</p>
                    <p className="text-xs text-gray-500">Level B1 - 8 minutes ago</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">System backup completed</p>
                    <p className="text-xs text-gray-500">15 minutes ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Health */}
          <Card>
            <CardHeader>
              <CardTitle>System Health</CardTitle>
              <CardDescription>Current system status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Server Performance</span>
                    <span className="text-green-600">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Database Response</span>
                    <span className="text-green-600">Good</span>
                  </div>
                  <Progress value={87} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>API Uptime</span>
                    <span className="text-green-600">99.9%</span>
                  </div>
                  <Progress value={99} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Storage Usage</span>
                    <span className="text-orange-600">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
