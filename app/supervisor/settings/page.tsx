"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { User, Bell, Shield, Globe, Palette, Download, Trash2, Camera, Save, Eye, EyeOff } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

export default function SupervisorSettingsPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [settings, setSettings] = useState({
    // Profile settings
    firstName: "John",
    lastName: "Supervisor",
    email: "john.supervisor@school.edu",
    phone: "+1 234 567 8900",
    bio: "Experienced digital competency supervisor with 5+ years in educational technology.",
    avatar: "/placeholder.svg?height=100&width=100",
    
    // Notification settings
    emailNotifications: true,
    pushNotifications: true,
    weeklyReports: true,
    studentProgress: true,
    assessmentReminders: true,
    systemUpdates: false,
    
    // Display settings
    language: "en",
    timezone: "America/New_York",
    theme: "light",
    dateFormat: "MM/DD/YYYY",
    
    // Security settings
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactorAuth: false,
    sessionTimeout: "30"
  })

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

  const handleSaveProfile = () => {
    // Simulate API call
    alert("Profile updated successfully!")
  }

  const handleSaveNotifications = () => {
    // Simulate API call
    alert("Notification preferences updated!")
  }

  const handleSaveDisplay = () => {
    // Simulate API call
    alert("Display preferences updated!")
  }

  const handleChangePassword = () => {
    if (!settings.currentPassword || !settings.newPassword || !settings.confirmPassword) {
      alert("Please fill in all password fields")
      return
    }
    
    if (settings.newPassword !== settings.confirmPassword) {
      alert("New passwords don't match")
      return
    }
    
    if (settings.newPassword.length < 8) {
      alert("Password must be at least 8 characters long")
      return
    }
    
    // Simulate API call
    alert("Password changed successfully!")
    setSettings({
      ...settings,
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    })
  }

  const handleExportData = () => {
    // Simulate data export
    const data = {
      profile: {
        name: `${settings.firstName} ${settings.lastName}`,
        email: settings.email,
        phone: settings.phone
      },
      exportDate: new Date().toISOString(),
      dataTypes: ["profile", "settings", "activity_logs"]
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'supervisor_data_export.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    
    alert("Data export completed!")
  }

  const handleDeleteAccount = () => {
    const confirmation = prompt("Type 'DELETE' to confirm account deletion:")
    if (confirmation === "DELETE") {
      alert("Account deletion request submitted. You will receive a confirmation email.")
    }
  }

  const handleAvatarUpload = () => {
    // Simulate file upload
    alert("Avatar upload functionality would be implemented here")
  }

  return (
    <DashboardLayout userRole="supervisor">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Manage your account preferences and security settings</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="display" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Display
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="account" className="flex items-center gap-2">
              <Trash2 className="w-4 h-4" />
              Account
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center space-x-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={settings.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{settings.firstName[0]}{settings.lastName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" onClick={handleAvatarUpload}>
                      <Camera className="w-4 h-4 mr-2" />
                      Change Avatar
                    </Button>
                    <p className="text-sm text-gray-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
                  </div>
                </div>

                <Separator />

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={settings.firstName}
                      onChange={(e) => setSettings({...settings, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={settings.lastName}
                      onChange={(e) => setSettings({...settings, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({...settings, email: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => setSettings({...settings, phone: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={settings.bio}
                    onChange={(e) => setSettings({...settings, bio: e.target.value})}
                    rows={4}
                    placeholder="Tell us about yourself..."
                  />
                </div>

                <Button onClick={handleSaveProfile}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Profile
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="emailNotifications">Email Notifications</Label>
                      <p className="text-sm text-gray-500">Receive notifications via email</p>
                    </div>
                    <Switch
                      id="emailNotifications"
                      checked={settings.emailNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, emailNotifications: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="pushNotifications">Push Notifications</Label>
                      <p className="text-sm text-gray-500">Receive push notifications in browser</p>
                    </div>
                    <Switch
                      id="pushNotifications"
                      checked={settings.pushNotifications}
                      onCheckedChange={(checked) => setSettings({...settings, pushNotifications: checked})}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="weeklyReports">Weekly Reports</Label>
                      <p className="text-sm text-gray-500">Receive weekly progress reports</p>
                    </div>
                    <Switch
                      id="weeklyReports"
                      checked={settings.weeklyReports}
                      onCheckedChange={(checked) => setSettings({...settings, weeklyReports: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="studentProgress">Student Progress Updates</Label>
                      <p className="text-sm text-gray-500">Get notified when students complete assessments</p>
                    </div>
                    <Switch
                      id="studentProgress"
                      checked={settings.studentProgress}
                      onCheckedChange={(checked) => setSettings({...settings, studentProgress: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="assessmentReminders">Assessment Reminders</Label>
                      <p className="text-sm text-gray-500">Reminders for upcoming assessments</p>
                    </div>
                    <Switch
                      id="assessmentReminders"
                      checked={settings.assessmentReminders}
                      onCheckedChange={(checked) => setSettings({...settings, assessmentReminders: checked})}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="systemUpdates">System Updates</Label>
                      <p className="text-sm text-gray-500">Notifications about system maintenance and updates</p>
                    </div>
                    <Switch
                      id="systemUpdates"
                      checked={settings.systemUpdates}
                      onCheckedChange={(checked) => setSettings({...settings, systemUpdates: checked})}
                    />
                  </div>
                </div>

                <Button onClick={handleSaveNotifications}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="display" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Display Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <Select value={settings.language} onValueChange={(value) => setSettings({...settings, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={settings.timezone} onValueChange={(value) => setSettings({...settings, timezone: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="America/New_York">Eastern Time</SelectItem>
                        <SelectItem value="America/Chicago">Central Time</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="theme">Theme</Label>
                    <Select value={settings.theme} onValueChange={(value) => setSettings({...settings, theme: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="system">System</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select value={settings.dateFormat} onValueChange={(value) => setSettings({...settings, dateFormat: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                        <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                        <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button onClick={handleSaveDisplay}>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Change Password */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  
                  <div>
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={settings.currentPassword}
                        onChange={(e) => setSettings({...settings, currentPassword: e.target.value})}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={settings.newPassword}
                      onChange={(e) => setSettings({...settings, newPassword: e.target.value})}
                    />
                  </div>

                  <div>
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={settings.confirmPassword}
                      onChange={(e) => setSettings({...settings, confirmPassword: e.target.value})}
                    />
                  </div>

                  <Button onClick={handleChangePassword}>
                    Change Password
                  </Button>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="twoFactorAuth">Enable 2FA</Label>
                      <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                    </div>
                    <Switch
                      id="twoFactorAuth"
                      checked={settings.twoFactorAuth}
                      onCheckedChange={(checked) => setSettings({...settings, twoFactorAuth: checked})}
                    />
                  </div>
                </div>

                <Separator />

                {/* Session Management */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Session Management</h3>
                  
                  <div>
                    <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                    <Select value={settings.sessionTimeout} onValueChange={(value) => setSettings({...settings, sessionTimeout: value})}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="15">15 minutes</SelectItem>
                        <SelectItem value="30">30 minutes</SelectItem>
                        <SelectItem value="60">1 hour</SelectItem>
                        <SelectItem value="120">2 hours</SelectItem>
                        <SelectItem value="0">Never</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="account" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Account Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Data Export */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data Export</h3>
                  <p className="text-sm text-gray-600">
                    Download a copy of your account data including profile information, settings, and activity logs.
                  </p>
                  <Button variant="outline" onClick={handleExportData}>
                    <Download className="w-4 h-4 mr-2" />
                    Export My Data
                  </Button>
                </div>

                <Separator />

                {/* Account Deletion */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
                  <div className="p-4 border border-red-200 rounded-lg bg-red-50">
                    <h4 className="font-medium text-red-800 mb-2">Delete Account</h4>
                    <p className="text-sm text-red-700 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                      All your data will be permanently removed from our servers.
                    </p>
                    <Button variant="destructive" onClick={handleDeleteAccount}>
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
