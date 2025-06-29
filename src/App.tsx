import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DailyProvider } from '@daily-co/daily-react'
import { AuthProvider } from '@/contexts/AuthContext'
import { LandingPage } from '@/components/LandingPage'
import { AuthPage } from '@/components/AuthPage'
import { SkillsPage } from '@/components/SkillsPage'
import { AssessmentResultsPage } from '@/components/AssessmentResultsPage'
import VideoInterviewPage from '@/components/VideoInterviewPage'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Toaster } from '@/components/ui/toaster'

function App() {
  return (
    <AuthProvider>
      <DailyProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route 
              path="/skills" 
              element={
                <ProtectedRoute>
                  <SkillsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/video-interview" 
              element={
                <ProtectedRoute>
                  <VideoInterviewPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/assessment-results" 
              element={
                <ProtectedRoute>
                  <AssessmentResultsPage />
                </ProtectedRoute>
              } 
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
        <Toaster />
      </DailyProvider>
    </AuthProvider>
  )
}

export default App