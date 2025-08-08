"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Trophy, Download, Home, TrendingUp, Clock, CheckCircle, XCircle, Award } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"
import DashboardLayout from "@/components/layout/dashboard-layout"

function ResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const score = parseInt(searchParams.get("score") || "0")
  const step = parseInt(searchParams.get("step") || "1")

  const [isGeneratingCertificate, setIsGeneratingCertificate] = useState(false)

  // Determine certification level based on score and step
  const getCertificationResult = (score: number, step: number) => {
    if (step === 1) {
      if (score < 25) return { level: "Failed", canRetake: false, nextStep: null, color: "destructive" }
      if (score < 50) return { level: "A1", canRetake: false, nextStep: null, color: "secondary" }
      if (score < 75) return { level: "A2", canRetake: false, nextStep: null, color: "secondary" }
      return { level: "A2", canRetake: false, nextStep: 2, color: "default" }
    } else if (step === 2) {
      if (score < 25) return { level: "A2", canRetake: false, nextStep: null, color: "secondary" }
      if (score < 50) return { level: "B1", canRetake: false, nextStep: null, color: "secondary" }
      if (score < 75) return { level: "B2", canRetake: false, nextStep: null, color: "secondary" }
      return { level: "B2", canRetake: false, nextStep: 3, color: "default" }
    } else if (step === 3) {
      if (score < 25) return { level: "B2", canRetake: false, nextStep: null, color: "secondary" }
      if (score < 50) return { level: "C1", canRetake: false, nextStep: null, color: "secondary" }
      return { level: "C2", canRetake: false, nextStep: null, color: "default" }
    }
    return { level: "Unknown", canRetake: false, nextStep: null, color: "secondary" }
  }

  const result = getCertificationResult(score, step)

  // Mock detailed results
  const detailedResults = {
    totalQuestions: 44,
    correctAnswers: Math.round((score / 100) * 44),
    incorrectAnswers: 44 - Math.round((score / 100) * 44),
    timeSpent: "42 minutes",
    competencyBreakdown: [
      { name: "Digital Communication", score: score + 5, total: 8 },
      { name: "Digital Content Creation", score: score - 3, total: 8 },
      { name: "Digital Safety", score: score + 2, total: 8 },
      { name: "Problem Solving", score: score - 1, total: 8 },
      { name: "Digital Literacy", score: score + 1, total: 8 },
      { name: "Information Management", score: score - 2, total: 6 }
    ]
  }

  const user = useSelector(getUser);
  const dispatch = useDispatch();

  useEffect(() => {

    if (!user || user.role !== "student") {
      dispatch(logout());
      router.push("/auth/login")
      return
    }

  }, [router])

  const handleDownloadCertificate = async () => {
    if (result.level === "Failed") return

    setIsGeneratingCertificate(true)
    // Simulate certificate generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    alert(`Certificate for Level ${result.level} downloaded successfully!`)
    setIsGeneratingCertificate(false)
  }

  const handleNextStep = () => {
    if (result.nextStep) {
      router.push("/student/test")
    }
  }

  const handleBackToDashboard = () => {
    router.push("/student/dashboard")
  }

  const getScoreColor = (score: number) => {
    if (score >= 75) return "text-green-600"
    if (score >= 50) return "text-blue-600"
    if (score >= 25) return "text-orange-600"
    return "text-red-600"
  }

  const getScoreMessage = (score: number, level: string) => {
    if (level === "Failed") return "Unfortunately, you did not meet the minimum requirements."
    if (score >= 75) return "Excellent performance! You've qualified for the next step."
    if (score >= 50) return "Good job! You've earned your certification."
    return "You've achieved the minimum requirements for certification."
  }

  return (
    <DashboardLayout userRole="student">
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Test Results</h1>
                <p className="text-gray-600">Step {step} Assessment Results</p>
              </div>
              <Button variant="outline" onClick={handleBackToDashboard}>
                <Home className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          {/* Main Results Card */}
          <Card className="mb-8">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                {result.level === "Failed" ? (
                  <XCircle className="w-10 h-10 text-red-600" />
                ) : (
                  <Trophy className="w-10 h-10 text-blue-600" />
                )}
              </div>
              <CardTitle className="text-3xl mb-2">
                <span className={getScoreColor(score)}>{score}%</span>
              </CardTitle>
              <CardDescription className="text-lg">
                {getScoreMessage(score, result.level)}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <Badge
                    variant={result.color as any}
                    className="text-lg px-4 py-2"
                  >
                    {result.level === "Failed" ? "Not Certified" : `Level ${result.level} Certified`}
                  </Badge>
                </div>

                <div className="flex justify-center space-x-4">
                  {result.level !== "Failed" && (
                    <Button
                      onClick={handleDownloadCertificate}
                      disabled={isGeneratingCertificate}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {isGeneratingCertificate ? "Generating..." : "Download Certificate"}
                    </Button>
                  )}

                  {result.nextStep && (
                    <Button onClick={handleNextStep} className="bg-green-600 hover:bg-green-700">
                      Continue to Step {result.nextStep}
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Performance Overview */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Performance Overview
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{detailedResults.totalQuestions}</div>
                      <div className="text-sm text-gray-600">Total Questions</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{detailedResults.correctAnswers}</div>
                      <div className="text-sm text-gray-600">Correct</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{detailedResults.incorrectAnswers}</div>
                      <div className="text-sm text-gray-600">Incorrect</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-purple-600">{detailedResults.timeSpent}</div>
                      <div className="text-sm text-gray-600">Time Spent</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-semibold">Competency Breakdown</h4>
                    {detailedResults.competencyBreakdown.map((competency, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>{competency.name}</span>
                          <span>{Math.round((competency.score / 100) * competency.total)}/{competency.total}</span>
                        </div>
                        <Progress
                          value={(competency.score / 100) * competency.total / competency.total * 100}
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recommendations */}
              <Card>
                <CardHeader>
                  <CardTitle>Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.level === "Failed" ? (
                      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">Areas for Improvement</h4>
                        <ul className="text-sm text-red-700 space-y-1">
                          <li>• Review fundamental digital literacy concepts</li>
                          <li>• Practice basic computer skills and internet navigation</li>
                          <li>• Consider taking preparatory courses before retesting</li>
                          <li>• Note: Retesting is not available for Step 1 failures</li>
                        </ul>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <h4 className="font-semibold text-green-800 mb-2">Strengths</h4>
                          <ul className="text-sm text-green-700 space-y-1">
                            <li>• Strong performance in digital communication</li>
                            <li>• Good understanding of digital safety principles</li>
                            <li>• Effective problem-solving skills demonstrated</li>
                          </ul>
                        </div>

                        {result.nextStep && (
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h4 className="font-semibold text-blue-800 mb-2">Next Steps</h4>
                            <ul className="text-sm text-blue-700 space-y-1">
                              <li>• You're eligible for Step {result.nextStep} assessment</li>
                              <li>• Review advanced digital competency materials</li>
                              <li>• Focus on areas where you scored below 75%</li>
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Test Summary
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Assessment Step</span>
                      <span className="font-medium">Step {step}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Final Score</span>
                      <span className="font-medium">{score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Certification Level</span>
                      <span className="font-medium">{result.level}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Time Taken</span>
                      <span className="font-medium">{detailedResults.timeSpent}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Date Completed</span>
                      <span className="font-medium">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Achievement */}
              {result.level !== "Failed" && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Achievement Unlocked
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="w-8 h-8 text-yellow-600" />
                      </div>
                      <h4 className="font-semibold mb-2">Digital Competency Level {result.level}</h4>
                      <p className="text-sm text-gray-600">
                        You have successfully demonstrated {result.level} level digital competencies.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Next Steps */}
              <Card>
                <CardHeader>
                  <CardTitle>What's Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.nextStep ? (
                      <Button onClick={handleNextStep} className="w-full">
                        Take Step {result.nextStep} Assessment
                      </Button>
                    ) : (
                      <div className="text-center text-sm text-gray-600">
                        {result.level === "Failed"
                          ? "Focus on improving your skills before considering future assessments."
                          : "Congratulations! You've completed your digital competency assessment."
                        }
                      </div>
                    )}

                    <Button variant="outline" onClick={handleBackToDashboard} className="w-full">
                      Return to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Loading results...</div>}>
      <ResultsContent />
    </Suspense>
  )
}
