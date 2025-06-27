import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { ArrowLeft, Trophy, TrendingUp, CheckCircle, AlertCircle, BarChart3 } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'
import type { MockAssessmentResponse } from '@/lib/mockAssessmentApi'

export const AssessmentResultsPage = () => {
  const [saving, setSaving] = useState(false)
  const { user } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  
  // Get assessment results from navigation state
  const assessmentResults = location.state?.assessmentResults as MockAssessmentResponse | undefined

  useEffect(() => {
    // If no assessment results, redirect back to skills page
    if (!assessmentResults) {
      navigate('/skills')
      return
    }

    // Save assessment results to database
    saveAssessmentResults()
  }, [assessmentResults])

  const saveAssessmentResults = async () => {
    if (!user || !assessmentResults) return

    setSaving(true)
    try {
      // Save each skill assessment to the database
      const assessmentPromises = assessmentResults.results.map(result => 
        supabase
          .from('assessments')
          .insert({
            user_id: user.id,
            skill_assessed: result.skill,
            score: result.score,
            feedback_text: JSON.stringify({
              feedback: result.feedback,
              strengths: result.strengths,
              improvements: result.improvements
            })
          })
      )

      await Promise.all(assessmentPromises)

      toast({
        title: "Assessment results saved!",
        description: "Your assessment results have been saved to your profile.",
      })
    } catch (error) {
      console.error('Error saving assessment results:', error)
      toast({
        variant: "destructive",
        title: "Error saving results",
        description: "There was an issue saving your assessment results.",
      })
    } finally {
      setSaving(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600'
    if (score >= 75) return 'text-blue-600'
    if (score >= 65) return 'text-yellow-600'
    return 'text-orange-600'
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 85) return 'default'
    if (score >= 75) return 'secondary'
    return 'outline'
  }

  if (!assessmentResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-lg">Loading assessment results...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-400" />
              Assessment Results
            </h1>
            <p className="text-white/70 mt-1">Your AI-powered skill assessment is complete</p>
          </div>
          <Button
            variant="ghost"
            onClick={() => navigate('/skills')}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Skills
          </Button>
        </div>

        {/* Overall Score Card */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-white flex items-center justify-center gap-3">
              <BarChart3 className="w-6 h-6 text-purple-400" />
              Overall Assessment Score
            </CardTitle>
            <div className="mt-4">
              <div className={`text-6xl font-bold ${getScoreColor(assessmentResults.overallScore)}`}>
                {assessmentResults.overallScore.toFixed(1)}
              </div>
              <div className="text-white/70 text-lg mt-2">out of 100</div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-white/5 rounded-lg p-4">
              <p className="text-white/90 leading-relaxed">{assessmentResults.summary}</p>
            </div>
          </CardContent>
        </Card>

        {/* Individual Skill Results */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-4">Individual Skill Assessments</h2>
          
          {assessmentResults.results.map((result, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-white text-xl">{result.skill}</CardTitle>
                    <CardDescription className="text-white/70 mt-1">
                      Skill Assessment Results
                    </CardDescription>
                  </div>
                  <Badge 
                    variant={getScoreBadgeVariant(result.score)}
                    className="text-lg px-3 py-1"
                  >
                    {result.score.toFixed(1)}%
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Feedback */}
                <div>
                  <h4 className="text-white font-medium mb-2">Assessment Feedback</h4>
                  <div className="bg-white/5 rounded-lg p-4">
                    <p className="text-white/90 leading-relaxed">{result.feedback}</p>
                  </div>
                </div>

                {/* Strengths and Improvements */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      Strengths
                    </h4>
                    <ul className="space-y-2">
                      {result.strengths.map((strength, idx) => (
                        <li key={idx} className="text-white/80 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                          {strength}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-blue-400" />
                      Areas for Improvement
                    </h4>
                    <ul className="space-y-2">
                      {result.improvements.map((improvement, idx) => (
                        <li key={idx} className="text-white/80 text-sm flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                          {improvement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 justify-center">
          <Button
            onClick={() => navigate('/skills')}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            Assess Different Skills
          </Button>
          <Button
            disabled={saving}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {saving ? 'Saving...' : 'Results Saved'}
          </Button>
        </div>

        {/* Next Steps Card */}
        <Card className="mt-8 bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="pt-6">
            <div className="text-center text-white/70 text-sm">
              <div className="flex items-center justify-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">What's Next?</span>
              </div>
              <p>
                Your assessment results have been saved to your profile. Use this feedback to guide your learning journey 
                and track your progress over time. Consider retaking assessments periodically to measure your improvement.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}