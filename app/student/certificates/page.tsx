"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Download, Award, Calendar, Trophy, Share2, Eye } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

const mockCertificates = [
  {
    id: 1,
    level: "A2",
    score: 78,
    issueDate: "2024-01-15",
    certificateId: "TS-A2-001-JD",
    status: "issued",
    competencies: ["Digital Communication", "Digital Safety", "Information Management"],
    validUntil: "2027-01-15"
  }
]

export default function StudentCertificatesPage() {
  const router = useRouter()
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

  const handleDownloadCertificate = (certificateId: number) => {
    alert(`Downloading certificate ${certificateId}...`)
  }

  const handleViewCertificate = (certificateId: number) => {
    alert(`Viewing certificate ${certificateId}...`)
  }

  const handleShareCertificate = (certificateId: number) => {
    alert(`Sharing certificate ${certificateId}...`)
  }

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
      <DashboardLayout userRole="student">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userRole="student">
      <div className="p-4 sm:p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Certificates</h1>
          <p className="text-gray-600">View and download your earned digital competency certificates</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Award className="w-8 h-8 text-blue-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">{mockCertificates.length}</div>
                  <p className="text-sm text-gray-600">Certificates Earned</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Trophy className="w-8 h-8 text-green-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">A2</div>
                  <p className="text-sm text-gray-600">Current Level</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Calendar className="w-8 h-8 text-orange-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">Jan 2024</div>
                  <p className="text-sm text-gray-600">Latest Certificate</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center">
                <Download className="w-8 h-8 text-purple-600 mr-3" />
                <div>
                  <div className="text-2xl font-bold">1</div>
                  <p className="text-sm text-gray-600">Downloads</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates */}
        {mockCertificates.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockCertificates.map((certificate) => (
              <Card key={certificate.id} className="border-2 border-dashed border-gray-200 hover:border-blue-300 transition-colors">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">Digital Competency Level {certificate.level}</CardTitle>
                        <CardDescription>Certificate ID: {certificate.certificateId}</CardDescription>
                      </div>
                    </div>
                    <Badge className={getLevelColor(certificate.level)}>
                      {certificate.level}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Score:</span>
                      <div className="font-semibold">{certificate.score}%</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Issue Date:</span>
                      <div className="font-semibold">{certificate.issueDate}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Valid Until:</span>
                      <div className="font-semibold">{certificate.validUntil}</div>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <div className="font-semibold capitalize text-green-600">{certificate.status}</div>
                    </div>
                  </div>

                  <div>
                    <span className="text-sm text-gray-500">Competencies Assessed:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {certificate.competencies.map((competency, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {competency}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button
                      onClick={() => handleViewCertificate(certificate.id)}
                      className="flex-1"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleDownloadCertificate(certificate.id)}
                      className="flex-1"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleShareCertificate(certificate.id)}
                      className="flex-1"
                    >
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Certificates Yet</h3>
              <p className="text-gray-600 mb-4">
                Complete assessments to earn your digital competency certificates
              </p>
              <Button asChild>
                <a href="/student/test">Start Assessment</a>
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Certificate Information */}
        <Card>
          <CardHeader>
            <CardTitle>About Digital Competency Certificates</CardTitle>
            <CardDescription>Understanding your certificates and their validity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2">Certificate Levels</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Badge className="bg-green-100 text-green-800 mr-2">A1-A2</Badge>
                    <span>Basic to Elementary</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-blue-100 text-blue-800 mr-2">B1-B2</Badge>
                    <span>Intermediate to Upper Intermediate</span>
                  </div>
                  <div className="flex items-center">
                    <Badge className="bg-purple-100 text-purple-800 mr-2">C1-C2</Badge>
                    <span>Advanced to Expert</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Certificate Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Digitally signed and verified</li>
                  <li>• Valid for 3 years from issue date</li>
                  <li>• Shareable via LinkedIn and social media</li>
                  <li>• Downloadable as PDF</li>
                  <li>• Includes detailed competency breakdown</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
