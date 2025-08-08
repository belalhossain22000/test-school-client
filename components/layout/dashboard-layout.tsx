"use client"

import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Home, Users, BookOpen, Award, BarChart3, Settings, LogOut, Bell, Menu, X, User, FileText, Calendar, HelpCircle, Shield, UserCheck } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

interface DashboardLayoutProps {
  children: React.ReactNode
  userRole: "admin" | "student" | "supervisor"
}

export default function DashboardLayout({ children, userRole }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    avatar: ""
  })

  useEffect(() => {
    // Get user info from localStorage
    const email = localStorage.getItem("userEmail") || ""
    const name = email.split("@")[0].replace(".", " ").replace(/\b\w/g, l => l.toUpperCase())
    setUserInfo({
      name,
      email,
      avatar: `/placeholder.svg?height=40&width=40&text=${name.split(' ').map(n => n[0]).join('')}`
    })
  }, [])

 const user = useSelector(getUser);

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    router.push("/")
  }

  // Navigation items based on user role
  const getNavigationItems = () => {
    const baseItems = [
      { name: "Dashboard", href: `/${userRole}/dashboard`, icon: Home },
    ]

    switch (userRole) {
      case "admin":
        return [
          ...baseItems,
          { name: "Users", href: "/admin/users", icon: Users },
          { name: "Tests", href: "/admin/tests", icon: BookOpen },
          { name: "Certificates", href: "/admin/certificates", icon: Award },
          { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
          { name: "Settings", href: "/admin/settings", icon: Settings },
        ]
      case "supervisor":
        return [
          ...baseItems,
          { name: "Students", href: "/supervisor/students", icon: Users },
          { name: "Reports", href: "/supervisor/reports", icon: FileText },
          { name: "Analytics", href: "/supervisor/analytics", icon: BarChart3 },
          { name: "Calendar", href: "/supervisor/calendar", icon: Calendar },
          { name: "Settings", href: "/supervisor/settings", icon: Settings },
        ]
      case "student":
        return [
          ...baseItems,
          { name: "Take Test", href: "/student/test", icon: BookOpen },
          { name: "Results", href: "/student/results", icon: Award },
          { name: "Certificates", href: "/student/certificates", icon: Award },
          { name: "Profile", href: "/student/profile", icon: User },
          { name: "Settings", href: "/student/settings", icon: Settings },
        ]
      default:
        return baseItems
    }
  }

  const navigationItems = getNavigationItems()

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + "/")
  }

  const getPageTitle = () => {
    const currentItem = navigationItems.find(item => isActive(item.href))
    return currentItem?.name || 'Dashboard'
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TS</span>
            </div>
            <span className="text-xl font-bold text-gray-900 hidden sm:block">Test_School</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="px-4 py-4">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Avatar className="w-10 h-10">
              <AvatarImage src={ "/profile.png"} />
              <AvatarFallback>
                {user?.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.name}
              </p>
              <Badge variant="secondary" className="text-xs capitalize">
                {user?.role}
              </Badge>
            </div>
          </div>
        </div>

        <nav className="px-4 pb-6 flex-1">
          <ul className="space-y-1">
            {navigationItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-600 hover:text-gray-900"
            asChild
          >
            <Link href="/help">
              <HelpCircle className="w-5 h-5 mr-3" />
              Help & Support
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b h-16 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
          <div className="flex items-center space-x-4 min-w-0">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-4 h-4" />
            </Button>
            <div className="min-w-0">
              <h1 className="text-lg font-semibold text-gray-900 truncate">
                {getPageTitle()}
              </h1>
              <p className="text-sm text-gray-500 hidden sm:block">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button variant="ghost" size="sm" className="relative">
              <Bell className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={ "/profile.png"} />
                    <AvatarFallback>
                      {user?.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href={`/${userRole}/profile`}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/${userRole}/settings`}>
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
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}
