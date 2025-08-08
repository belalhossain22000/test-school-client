"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Clock, ChevronLeft, ChevronRight, Flag, AlertTriangle, CheckCircle, Home, RotateCcw, Play } from 'lucide-react'

// Extended mock test data with more questions
const mockTestData = {
  step: 2,
  levels: "B1 & B2",
  totalQuestions: 10, // Reduced for demo purposes
  timeLimit: 10 * 60, // 10 minutes for demo
  questions: [
    {
      id: 1,
      competency: "Digital Communication",
      level: "B1",
      question: "Which of the following is the most secure way to share sensitive documents online?",
      options: [
        "Email attachment",
        "Cloud storage with password protection",
        "Social media messaging",
        "Public file sharing platform"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      competency: "Digital Content Creation",
      level: "B1",
      question: "What is the primary advantage of using vector graphics over raster images?",
      options: [
        "Smaller file size",
        "Better color accuracy",
        "Scalability without quality loss",
        "Faster loading times"
      ],
      correctAnswer: 2
    },
    {
      id: 3,
      competency: "Digital Safety",
      level: "B2",
      question: "Which authentication method provides the highest level of security?",
      options: [
        "Single password",
        "Two-factor authentication",
        "Biometric authentication",
        "Multi-factor authentication"
      ],
      correctAnswer: 3
    },
    {
      id: 4,
      competency: "Information Management",
      level: "B1",
      question: "What is the best practice for organizing digital files?",
      options: [
        "Store everything in one folder",
        "Use descriptive names and folder structure",
        "Rely on search functionality only",
        "Keep files on desktop for easy access"
      ],
      correctAnswer: 1
    },
    {
      id: 5,
      competency: "Problem Solving",
      level: "B2",
      question: "When troubleshooting a software issue, what should be your first step?",
      options: [
        "Reinstall the software",
        "Contact technical support",
        "Restart the computer",
        "Check for recent changes or updates"
      ],
      correctAnswer: 3
    },
    {
      id: 6,
      competency: "Digital Literacy",
      level: "B1",
      question: "What does 'cloud computing' primarily refer to?",
      options: [
        "Weather prediction software",
        "Storing and accessing data over the internet",
        "High-altitude internet connections",
        "Wireless networking technology"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      competency: "Digital Communication",
      level: "B2",
      question: "Which protocol is most commonly used for secure web browsing?",
      options: [
        "HTTP",
        "FTP",
        "HTTPS",
        "SMTP"
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      competency: "Digital Content Creation",
      level: "B2",
      question: "What is the recommended resolution for web images to balance quality and loading speed?",
      options: [
        "72 DPI",
        "150 DPI",
        "300 DPI",
        "600 DPI"
      ],
      correctAnswer: 0
    },
    {
      id: 9,
      competency: "Digital Safety",
      level: "B1",
      question: "What should you do if you receive a suspicious email asking for personal information?",
      options: [
        "Reply with the requested information",
        "Forward it to friends for verification",
        "Delete it immediately and report as spam",
        "Click the links to verify authenticity"
      ],
      correctAnswer: 2
    },
    {
      id: 10,
      competency: "Problem Solving",
      level: "B1",
      question: "Which of the following is the best approach to learning new digital tools?",
      options: [
        "Trial and error without guidance",
        "Reading documentation and practicing",
        "Asking others to do it for you",
        "Avoiding new tools altogether"
      ],
      correctAnswer: 1
    }
  ]
}

export default function TestPage() {
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: number]: number}>({})
  const [timeRemaining, setTimeRemaining] = useState(mockTestData.timeLimit)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set())
  const [testStarted, setTestStarted] = useState(false)
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false)

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem("accessToken")
    const role = localStorage.getItem("userRole")
    
    if (!token || role !== "student") {
      router.push("/auth/login")
      return
    }
  }, [router])

  useEffect(() => {
    if (!testStarted) return

    // Start timer
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleAutoSubmit()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [testStarted])

  const handleStartTest = () => {
    setTestStarted(true)
  }

  const handleAutoSubmit = async () => {
    setIsSubmitting(true)
    await handleSubmitTest()
  }

  const handleAnswerChange = (questionId: number, answerIndex: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }))
  }

  const handleFlagQuestion = (questionId: number) => {
    setFlaggedQuestions(prev => {
      const newSet = new Set(prev)
      if (newSet.has(questionId)) {
        newSet.delete(questionId)
      } else {
        newSet.add(questionId)
      }
      return newSet
    })
  }

  const handleSubmitTest = async () => {
    setIsSubmitting(true)
    
    // Calculate score
    let correctAnswers = 0
    mockTestData.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctAnswers++
      }
    })
    
    const score = Math.round((correctAnswers / mockTestData.questions.length) * 100)
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Redirect to results
    router.push(`/student/results?score=${score}&step=${mockTestData.step}`)
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const progress = ((currentQuestion + 1) / mockTestData.questions.length) * 100
  const currentQ = mockTestData.questions[currentQuestion]
  const answeredQuestions = Object.keys(answers).length
  const isTimeRunningOut = timeRemaining < 120 // Less than 2 minutes

  // Pre-test instructions screen
  if (!testStarted) {
    return (
      <DashboardLayout userRole="student">
        <div className="p-6">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  Step {mockTestData.step}: {mockTestData.levels} Assessment
                </CardTitle>
                <p className="text-gray-600">
                  Please read the instructions carefully before starting
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">{mockTestData.totalQuestions}</div>
                    <div className="text-sm text-gray-600">Questions</div>
                  </div>
                  <div className="p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">{formatTime(mockTestData.timeLimit)}</div>
                    <div className="text-sm text-gray-600">Time Limit</div>
                  </div>
                  <div className="p-4 bg-purple-50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-600">44</div>
                    <div className="text-sm text-gray-600">Pass Score (%)</div>
                  </div>
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h3 className="font-semibold text-yellow-800 mb-2">Important Instructions:</h3>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• You have {formatTime(mockTestData.timeLimit)} to complete all {mockTestData.totalQuestions} questions</li>
                    <li>• The test will auto-submit when time expires</li>
                    <li>• You can flag questions for review and navigate between questions</li>
                    <li>• Ensure you have a stable internet connection</li>
                    <li>• Once started, you cannot pause or restart the test</li>
                    <li>• Make sure you're in a quiet environment</li>
                  </ul>
                </div>

                <div className="flex justify-center space-x-4">
                  <Button variant="outline" onClick={() => router.push('/student/dashboard')}>
                    <Home className="w-4 h-4 mr-2" />
                    Back to Dashboard
                  </Button>
                  <Button onClick={handleStartTest} size="lg" className="bg-green-600 hover:bg-green-700">
                    <Play className="w-4 h-4 mr-2" />
                    Start Test
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="student">
      <div className="min-h-screen bg-gray-50">
        {/* Test Header */}
        <div className="bg-white border-b sticky top-0 z-10">
          <div className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Step {mockTestData.step}: {mockTestData.levels}
                </h1>
                <p className="text-sm text-gray-600">
                  Question {currentQuestion + 1} of {mockTestData.questions.length}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`flex items-center space-x-2 ${isTimeRunningOut ? 'text-red-600' : 'text-gray-600'}`}>
                  <Clock className="w-4 h-4" />
                  <span className="font-mono text-lg">{formatTime(timeRemaining)}</span>
                </div>
                <Badge variant="outline">
                  {answeredQuestions}/{mockTestData.questions.length} Answered
                </Badge>
              </div>
            </div>
            <Progress value={progress} className="mt-2" />
          </div>
        </div>

        {isTimeRunningOut && (
          <Alert className="mx-6 mt-4 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              Warning: Less than 2 minutes remaining! The test will auto-submit when time expires.
            </AlertDescription>
          </Alert>
        )}

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Question Area */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <Badge variant="secondary" className="mb-2">
                        {currentQ.competency} - Level {currentQ.level}
                      </Badge>
                      <CardTitle className="text-lg leading-relaxed">
                        {currentQ.question}
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleFlagQuestion(currentQ.id)}
                      className={flaggedQuestions.has(currentQ.id) ? 'text-orange-600' : ''}
                    >
                      <Flag className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={answers[currentQ.id]?.toString() || ""}
                    onValueChange={(value) => handleAnswerChange(currentQ.id, parseInt(value))}
                  >
                    {currentQ.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-50 border">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Navigation */}
              <div className="flex justify-between items-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                  disabled={currentQuestion === 0}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex space-x-2">
                  {currentQuestion === mockTestData.questions.length - 1 ? (
                    <Button
                      onClick={() => setShowConfirmSubmit(true)}
                      disabled={isSubmitting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Test"}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuestion(prev => Math.min(mockTestData.questions.length - 1, prev + 1))}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Sidebar - Question Navigator */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg">Question Navigator</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-2 mb-4">
                    {mockTestData.questions.map((_, index) => (
                      <Button
                        key={index}
                        variant={currentQuestion === index ? "default" : "outline"}
                        size="sm"
                        className={`relative ${
                          answers[mockTestData.questions[index].id] !== undefined
                            ? 'bg-green-100 border-green-300 text-green-800 hover:bg-green-200'
                            : ''
                        } ${
                          flaggedQuestions.has(mockTestData.questions[index].id)
                            ? 'border-orange-300 bg-orange-50'
                            : ''
                        }`}
                        onClick={() => setCurrentQuestion(index)}
                      >
                        {index + 1}
                        {answers[mockTestData.questions[index].id] !== undefined && (
                          <CheckCircle className="w-3 h-3 absolute -top-1 -right-1 text-green-600" />
                        )}
                        {flaggedQuestions.has(mockTestData.questions[index].id) && (
                          <Flag className="w-3 h-3 absolute -top-1 -right-1 text-orange-600" />
                        )}
                      </Button>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Answered:</span>
                      <span className="font-medium">{answeredQuestions}/{mockTestData.questions.length}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Flagged:</span>
                      <span className="font-medium">{flaggedQuestions.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Remaining:</span>
                      <span className="font-medium">{mockTestData.questions.length - answeredQuestions}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t">
                    <div className="text-sm text-gray-600 mb-2">Legend:</div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                        <span>Answered</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-orange-50 border border-orange-300 rounded"></div>
                        <span>Flagged</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-white border border-gray-300 rounded"></div>
                        <span>Not answered</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Submit Confirmation Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <CardHeader>
                <CardTitle>Submit Test?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to submit your test? You have answered {answeredQuestions} out of {mockTestData.questions.length} questions.
                </p>
                {answeredQuestions < mockTestData.questions.length && (
                  <Alert className="mb-4">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      You have {mockTestData.questions.length - answeredQuestions} unanswered questions. 
                      These will be marked as incorrect.
                    </AlertDescription>
                  </Alert>
                )}
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmSubmit(false)}
                    className="flex-1"
                  >
                    Continue Test
                  </Button>
                  <Button
                    onClick={handleSubmitTest}
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
