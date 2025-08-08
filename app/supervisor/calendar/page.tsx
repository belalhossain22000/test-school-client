"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/layout/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, Plus, Clock, Users, BookOpen, Video, ChevronLeft, ChevronRight, Eye, Edit, Trash2 } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux"
import { getUser, logout } from "@/redux/features/authSlice"

// Mock calendar data
const mockEvents = [
  {
    id: 1,
    title: "B1 Assessment - Digital Communication",
    type: "assessment",
    date: "2024-01-20",
    time: "10:00 AM",
    duration: "2 hours",
    students: ["Alice Johnson", "Eva Brown"],
    description: "Digital Communication competency assessment for B1 level students"
  },
  {
    id: 2,
    title: "Study Group - A2 Level",
    type: "study-group",
    date: "2024-01-22",
    time: "2:00 PM",
    duration: "1.5 hours",
    students: ["Bob Smith", "David Wilson"],
    description: "Group study session focusing on digital safety concepts"
  },
  {
    id: 3,
    title: "One-on-One Tutoring - Carol Davis",
    type: "tutoring",
    date: "2024-01-23",
    time: "11:00 AM",
    duration: "1 hour",
    students: ["Carol Davis"],
    description: "Individual tutoring session for advanced B2 concepts"
  },
  {
    id: 4,
    title: "Progress Review Meeting",
    type: "meeting",
    date: "2024-01-25",
    time: "3:00 PM",
    duration: "45 minutes",
    students: [],
    description: "Weekly progress review with administration"
  },
  {
    id: 5,
    title: "B2 Assessment - Content Creation",
    type: "assessment",
    date: "2024-01-26",
    time: "9:00 AM",
    duration: "2.5 hours",
    students: ["Carol Davis"],
    description: "Advanced content creation assessment"
  }
]

const eventTypes = [
  { value: "assessment", label: "Assessment", color: "bg-blue-100 text-blue-800", icon: BookOpen },
  { value: "tutoring", label: "Tutoring", color: "bg-green-100 text-green-800", icon: Users },
  { value: "study-group", label: "Study Group", color: "bg-purple-100 text-purple-800", icon: Users },
  { value: "meeting", label: "Meeting", color: "bg-orange-100 text-orange-800", icon: Video }
]

export default function SupervisorCalendarPage() {
  const router = useRouter()
  const [events, setEvents] = useState(mockEvents)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showAddEvent, setShowAddEvent] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [newEvent, setNewEvent] = useState({
    title: "",
    type: "",
    date: "",
    time: "",
    duration: "",
    students: "",
    description: ""
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

  const getEventTypeInfo = (type: string) => {
    return eventTypes.find(t => t.value === type) || eventTypes[0]
  }

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.type || !newEvent.date || !newEvent.time) {
      alert("Please fill in all required fields")
      return
    }

    const event = {
      id: events.length + 1,
      ...newEvent,
      students: newEvent.students.split(',').map(s => s.trim()).filter(s => s)
    }

    setEvents([...events, event])
    setNewEvent({
      title: "",
      type: "",
      date: "",
      time: "",
      duration: "",
      students: "",
      description: ""
    })
    setShowAddEvent(false)
    alert("Event added successfully!")
  }

  const handleDeleteEvent = (eventId: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter(e => e.id !== eventId))
      alert("Event deleted successfully!")
    }
  }

  // Get events for today
  const today = new Date().toISOString().split('T')[0]
  const todayEvents = events.filter(event => event.date === today)

  // Get upcoming events (next 5)
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  // Generate calendar days for current month
  const currentMonth = selectedDate.getMonth()
  const currentYear = selectedDate.getFullYear()
  const firstDay = new Date(currentYear, currentMonth, 1)
  const lastDay = new Date(currentYear, currentMonth + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const calendarDays = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day)
  }

  const getEventsForDate = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return events.filter(event => event.date === dateStr)
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate)
    if (direction === 'prev') {
      newDate.setMonth(currentMonth - 1)
    } else {
      newDate.setMonth(currentMonth + 1)
    }
    setSelectedDate(newDate)
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]

  return (
    <DashboardLayout userRole="supervisor">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Calendar Management</h1>
            <p className="text-gray-600">Schedule and manage assessments, tutoring, and meetings</p>
          </div>
          <Dialog open={showAddEvent} onOpenChange={setShowAddEvent}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Event
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Add New Event</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Event Title *</Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Enter event title"
                  />
                </div>
                
                <div>
                  <Label htmlFor="type">Event Type *</Label>
                  <Select value={newEvent.type} onValueChange={(value) => setNewEvent({...newEvent, type: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      {eventTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date">Date *</Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="time">Time *</Label>
                    <Input
                      id="time"
                      type="time"
                      value={newEvent.time}
                      onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={newEvent.duration}
                    onChange={(e) => setNewEvent({...newEvent, duration: e.target.value})}
                    placeholder="e.g., 2 hours, 90 minutes"
                  />
                </div>
                
                <div>
                  <Label htmlFor="students">Students (comma-separated)</Label>
                  <Input
                    id="students"
                    value={newEvent.students}
                    onChange={(e) => setNewEvent({...newEvent, students: e.target.value})}
                    placeholder="Alice Johnson, Bob Smith"
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                    placeholder="Event description"
                    rows={3}
                  />
                </div>
                
                <div className="flex gap-2">
                  <Button onClick={handleAddEvent} className="flex-1">
                    Add Event
                  </Button>
                  <Button variant="outline" onClick={() => setShowAddEvent(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5" />
                    {monthNames[currentMonth]} {currentYear}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('prev')}>
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => navigateMonth('next')}>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1 mb-4">
                  {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="p-2 h-20"></div>
                    }
                    
                    const dayEvents = getEventsForDate(day)
                    const isToday = day === new Date().getDate() && 
                                   currentMonth === new Date().getMonth() && 
                                   currentYear === new Date().getFullYear()
                    
                    return (
                      <div key={index} className={`p-1 h-20 border rounded-lg ${isToday ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}>
                        <div className={`text-sm font-medium ${isToday ? 'text-blue-600' : ''}`}>
                          {day}
                        </div>
                        <div className="space-y-1 mt-1">
                          {dayEvents.slice(0, 2).map((event) => {
                            const typeInfo = getEventTypeInfo(event.type)
                            return (
                              <div
                                key={event.id}
                                className={`text-xs p-1 rounded truncate cursor-pointer ${typeInfo.color}`}
                                onClick={() => setSelectedEvent(event)}
                              >
                                {event.title}
                              </div>
                            )
                          })}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-gray-500">
                              +{dayEvents.length - 2} more
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Today's Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                {todayEvents.length === 0 ? (
                  <p className="text-gray-500 text-sm">No events scheduled for today</p>
                ) : (
                  <div className="space-y-3">
                    {todayEvents.map((event) => {
                      const typeInfo = getEventTypeInfo(event.type)
                      return (
                        <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                          <div className={`p-1 rounded ${typeInfo.color}`}>
                            <typeInfo.icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-sm truncate">{event.title}</div>
                            <div className="text-xs text-gray-500 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {event.time}
                              {event.duration && ` (${event.duration})`}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {upcomingEvents.map((event) => {
                    const typeInfo = getEventTypeInfo(event.type)
                    return (
                      <div key={event.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                        <div className={`p-1 rounded ${typeInfo.color}`}>
                          <typeInfo.icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-sm truncate">{event.title}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(event.date).toLocaleDateString()} at {event.time}
                          </div>
                          {event.students.length > 0 && (
                            <div className="text-xs text-gray-500 mt-1">
                              {event.students.length} student{event.students.length !== 1 ? 's' : ''}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" onClick={() => setSelectedEvent(event)}>
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteEvent(event.id)}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Event Details Modal */}
        {selectedEvent && (
          <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Event Details</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge className={getEventTypeInfo(selectedEvent.type).color}>
                      {getEventTypeInfo(selectedEvent.type).label}
                    </Badge>
                  </div>
                  <h3 className="text-lg font-semibold">{selectedEvent.title}</h3>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CalendarIcon className="w-4 h-4 text-gray-400" />
                    <span>{new Date(selectedEvent.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span>{selectedEvent.time}</span>
                    {selectedEvent.duration && <span>({selectedEvent.duration})</span>}
                  </div>
                  {selectedEvent.students.length > 0 && (
                    <div className="flex items-start gap-2 text-sm">
                      <Users className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div>
                        <div className="font-medium">Students:</div>
                        <div className="text-gray-600">
                          {selectedEvent.students.join(', ')}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {selectedEvent.description && (
                  <div>
                    <div className="font-medium text-sm mb-1">Description:</div>
                    <p className="text-sm text-gray-600">{selectedEvent.description}</p>
                  </div>
                )}
                
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1 text-red-600 hover:text-red-700"
                    onClick={() => {
                      handleDeleteEvent(selectedEvent.id)
                      setSelectedEvent(null)
                    }}
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  )
}
