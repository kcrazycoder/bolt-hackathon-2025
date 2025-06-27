import { useState, useEffect, KeyboardEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'
import { runMockAssessment } from '@/lib/mockAssessmentApi'
import { LogOut, Plus, X, ArrowRight, Brain } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const SkillsPage = () => {
  const [skills, setSkills] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState('')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [runningAssessment, setRunningAssessment] = useState(false)
  const { user, signOut } = useAuth()
  const { toast } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    if (user) {
      loadUserSkills()
    }
  }, [user])

  const loadUserSkills = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('skills')
        .eq('id', user.id)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error loading skills:', error)
        return
      }

      if (data?.skills) {
        setSkills(data.skills)
      }
    } catch (error) {
      console.error('Error loading skills:', error)
    }
  }

  const addSkill = () => {
    const trimmedSkill = currentSkill.trim()
    if (!trimmedSkill) return
    
    if (skills.length >= 3) {
      toast({
        variant: "destructive",
        title: "Maximum skills reached",
        description: "You can only add up to 3 skills.",
      })
      return
    }

    if (skills.some(skill => skill.toLowerCase() === trimmedSkill.toLowerCase())) {
      toast({
        variant: "destructive",
        title: "Skill already added",
        description: "This skill is already in your list.",
      })
      return
    }

    setSkills([...skills, trimmedSkill])
    setCurrentSkill('')
  }

  const removeSkill = (skillToRemove: string) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addSkill()
    }
  }

  const saveSkillsAndRunAssessment = async () => {
    if (!user || skills.length === 0) {
      toast({
        variant: "destructive",
        title: "No skills to assess",
        description: "Please add at least one skill before starting the assessment.",
      })
      return
    }

    setSaving(true)
    try {
      // First, save skills to profile
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email!,
          skills: skills,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      toast({
        title: "Skills saved successfully!",
        description: "Starting your AI assessment...",
      })

      // Run the mock AI assessment
      setRunningAssessment(true)
      const assessmentResults = await runMockAssessment(skills)

      // Navigate to results page with assessment data
      navigate('/assessment-results', { 
        state: { assessmentResults },
        replace: true 
      })

    } catch (error) {
      console.error('Error saving skills or running assessment:', error)
      toast({
        variant: "destructive",
        title: "Error occurred",
        description: "Please try again.",
      })
    } finally {
      setSaving(false)
      setRunningAssessment(false)
    }
  }

  const handleSignOut = async () => {
    setLoading(true)
    await signOut()
    navigate('/')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Your Skills</h1>
            <p className="text-white/70 mt-1">Tell us about your expertise</p>
          </div>
          <Button
            variant="ghost"
            onClick={handleSignOut}
            disabled={loading}
            className="text-white/70 hover:text-white hover:bg-white/10"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>

        <Card className="bg-white/10 backdrop-blur-sm border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Add Your Skills</CardTitle>
            <CardDescription className="text-white/70">
              Add up to 3 skills that you'd like to be assessed on. Press Enter to add each skill.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Skill Input */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="e.g., Photoshop, JavaScript, Marketing..."
                  value={currentSkill}
                  onChange={(e) => setCurrentSkill(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={skills.length >= 3}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 flex-1"
                />
                <Button
                  onClick={addSkill}
                  disabled={!currentSkill.trim() || skills.length >= 3}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="text-sm text-white/60">
                {skills.length}/3 skills added
              </div>
            </div>

            {/* Skills List */}
            {skills.length > 0 && (
              <div className="space-y-3">
                <h3 className="text-white font-medium">Your Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-purple-600/20 text-purple-200 border-purple-500/30 px-3 py-1 text-sm flex items-center gap-2"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(skill)}
                        className="hover:bg-purple-500/30 rounded-full p-0.5 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Assessment Button */}
            <div className="pt-4">
              <Button
                onClick={saveSkillsAndRunAssessment}
                disabled={saving || runningAssessment || skills.length === 0}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 group"
              >
                {runningAssessment ? (
                  <>
                    <Brain className="mr-2 w-4 h-4 animate-pulse" />
                    Running AI Assessment...
                  </>
                ) : saving ? (
                  'Saving Skills...'
                ) : (
                  <>
                    Start AI Assessment
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </Button>
              
              {skills.length === 0 && (
                <p className="text-white/60 text-sm text-center mt-2">
                  Add at least one skill to start assessment
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Info Card */}
        <Card className="mt-6 bg-white/5 backdrop-blur-sm border-white/10">
          <CardContent className="pt-6">
            <div className="text-center text-white/70 text-sm">
              <p className="mb-2">🤖 AI-Powered Assessment</p>
              <p>
                Our AI will analyze your skills and provide detailed feedback including strengths, 
                areas for improvement, and personalized recommendations for your growth.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}