"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, Award, Users, BarChart3, Shield, User, Settings, LogOut } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/navigation"


export default function HomePage() {
  const features = [
    {
      icon: CheckCircle,
      title: "3-Step Assessment",
      description: "Progressive evaluation from A1 to C2 levels"
    },
    {
      icon: Clock,
      title: "Timed Tests",
      description: "Secure timer system with auto-submit"
    },
    {
      icon: Award,
      title: "Digital Certification",
      description: "Automated certificate generation"
    },
    {
      icon: Users,
      title: "Multi-Role Access",
      description: "Admin, Student, and Supervisor roles"
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Detailed performance tracking"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "JWT authentication and OTP verification"
    }
  ]

  const levels = [
    { level: "A1", color: "bg-green-100 text-green-800", description: "Basic digital skills" },
    { level: "A2", color: "bg-green-200 text-green-800", description: "Elementary digital competency" },
    { level: "B1", color: "bg-blue-100 text-blue-800", description: "Intermediate digital skills" },
    { level: "B2", color: "bg-blue-200 text-blue-800", description: "Upper intermediate competency" },
    { level: "C1", color: "bg-purple-100 text-purple-800", description: "Advanced digital skills" },
    { level: "C2", color: "bg-purple-200 text-purple-800", description: "Expert digital competency" }
  ]
  const router = useRouter()
  const user = useSelector(getUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Test_School</span>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-gray-600 hover:text-blue-600 transition-colors">
              Features
            </Link>
            <Link href="#levels" className="text-gray-600 hover:text-blue-600 transition-colors">
              Levels
            </Link>

          </nav>
          {!user?.role ? <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/register">Get Started</Link>
            </Button>
          </div> : <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={"/placeholder.svg"} />
                  <AvatarFallback>
                    {user.email.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.email}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={`/${user.role}/profile`}>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/${user.role}/settings`}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>}
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Digital Competency Assessment Platform
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Test and certify your digital skills through our comprehensive 3-step evaluation process.
            Progress from A1 to C2 levels with secure, timed assessments.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/auth/register">Start Assessment</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/register">View Demo</Link>
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">132</div>
              <div className="text-gray-600">Total Questions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">22</div>
              <div className="text-gray-600">Competencies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">6</div>
              <div className="text-gray-600">Certification Levels</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Levels Section */}
      <section id="levels" className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Certification Levels
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {levels.map((level, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-2xl">Level {level.level}</CardTitle>
                    <Badge className={level.color}>{level.level}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{level.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Assessment Flow */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            3-Step Assessment Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="relative">
              <CardHeader>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                  1
                </div>
                <CardTitle>Step 1: A1 & A2</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Score {'<'}25%: Fail (no retake)</li>
                  <li>• 25-49.99%: A1 certified</li>
                  <li>• 50-74.99%: A2 certified</li>
                  <li>• ≥75%: A2 + proceed to Step 2</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                  2
                </div>
                <CardTitle>Step 2: B1 & B2</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Score {'<'}25%: Remain at A2</li>
                  <li>• 25-49.99%: B1 certified</li>
                  <li>• 50-74.99%: B2 certified</li>
                  <li>• ≥75%: B2 + proceed to Step 3</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="relative">
              <CardHeader>
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold">
                  3
                </div>
                <CardTitle>Step 3: C1 & C2</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Score {'<'}25%: Remain at B2</li>
                  <li>• 25-49.99%: C1 certified</li>
                  <li>• ≥50%: C2 certified</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TS</span>
                </div>
                <span className="text-xl font-bold">Test_School</span>
              </div>
              <p className="text-gray-400">
                Digital competency assessment platform for modern learners.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/features" className="hover:text-white">Features</Link></li>
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/docs" className="hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Test_School. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
