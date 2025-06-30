import { useEffect, useState } from 'react'
import { WelcomeScreen } from '@/components/WelcomeScreen'
import { HairCheckScreen } from '@/components/HairCheckScreen'
import { InterviewCallScreen } from '@/components/InterviewCallScreen'
import { createConversation, endConversation } from '@/api'
import { createPersona, deletePersona } from '@/api/personaApi'
import { generatePersonaData, generateQuestions, InterviewQuestion } from '@/utils/personaGenerator'
import { IConversation } from '@/types'
import { useToast } from "@/hooks/use-toast"
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useNavigate } from 'react-router-dom'
import { TAVUS_API_KEY } from '@/config'

export type InterviewState = 'loading' | 'introduction' | 'waitingForConfirmation' | 'question1' | 'question2' | 'question3' | 'finalCountdown' | 'completed'

function VideoInterviewPage() {
  const { toast } = useToast()
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [screen, setScreen] = useState<'welcome' | 'hairCheck' | 'call'>('welcome')
  const [conversation, setConversation] = useState<IConversation | null>(null)
  const [loading, setLoading] = useState(false)
  
  // Interview-specific state
  const [userSkills, setUserSkills] = useState<string[]>([])
  const [interviewState, setInterviewState] = useState<InterviewState>('loading')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [countdown, setCountdown] = useState(60)
  const [finalCountdown, setFinalCountdown] = useState(3)
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [createdPersonaId, setCreatedPersonaId] = useState<string | null>(null)

  // Fetch user skills on component mount
  useEffect(() => {
    if (user) {
      loadUserSkills()
    }
  }, [user])

  // Countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (interviewState.startsWith('question') && countdown > 0) {
      interval = setInterval(() => {
        setCountdown(prev => {
          if (prev <= 1) {
            // Time's up, move to next question or complete
            handleTimeUp()
            return 60
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [interviewState, countdown])

  // Final countdown timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    
    if (interviewState === 'finalCountdown' && finalCountdown > 0) {
      interval = setInterval(() => {
        setFinalCountdown(prev => {
          if (prev <= 1) {
            // Navigate to results after countdown
            navigateToResults()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [interviewState, finalCountdown])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (conversation) {
        void endConversation(conversation.conversation_id)
      }
      if (createdPersonaId) {
        void deletePersona(createdPersonaId)
      }
    }
  }, [conversation, createdPersonaId])

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

      if (data?.skills && data.skills.length > 0) {
        setUserSkills(data.skills)
        setQuestions(generateQuestions(data.skills))
      } else {
        toast({
          variant: "destructive",
          title: "No skills found",
          description: "Please add your skills first.",
        })
        navigate('/skills')
      }
    } catch (error) {
      console.error('Error loading skills:', error)
      toast({
        variant: "destructive",
        title: "Error loading skills",
        description: "Please try again.",
      })
      navigate('/skills')
    }
  }

  const handleStart = async () => {
    // Check if API key is configured
    if (!TAVUS_API_KEY) {
      toast({
        variant: "destructive",
        title: "API Configuration Error",
        description: "Tavus API key is not configured. Please check your environment variables.",
      })
      return
    }

    if (userSkills.length === 0) {
      toast({
        variant: "destructive",
        title: "No skills available",
        description: "Please add your skills first.",
      })
      navigate('/skills')
      return
    }

    try {
      setLoading(true)
      
      // Generate and create dynamic persona
      const personaData = generatePersonaData(userSkills)
      const createdPersona = await createPersona(personaData)
      setCreatedPersonaId(createdPersona.persona_id)
      
      // Create conversation with the dynamic persona
      const conversation = await createConversation(createdPersona.persona_id)
      setConversation(conversation)
      setScreen('hairCheck')
      
      toast({
        title: "AI Interviewer Ready",
        description: `Created personalized interviewer for ${userSkills.join(', ')}`,
      })
    } catch (error) {
      console.error('Error creating interview:', error)
      
      // Provide more specific error messaging
      if (error instanceof Error) {
        if (error.message.includes('401')) {
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Invalid Tavus API key. Please check your API key configuration.",
          })
        } else if (error.message.includes('400')) {
          toast({
            variant: "destructive",
            title: "API Request Error",
            description: "Invalid request to Tavus API. Please check your API key and try again.",
          })
        } else {
          toast({
            variant: "destructive",
            title: "Failed to create interview",
            description: error.message || 'Please try again or check console for details',
          })
        }
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create interview",
          description: 'Please try again or check console for details',
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const handleEnd = async () => {
    try {
      if (conversation) {
        await endConversation(conversation.conversation_id)
      }
      if (createdPersonaId) {
        await deletePersona(createdPersonaId)
      }
    } catch (error) {
      console.error('Error cleaning up:', error)
    } finally {
      setConversation(null)
      setCreatedPersonaId(null)
      setScreen('welcome')
      setInterviewState('loading')
      setCurrentQuestionIndex(0)
      setCountdown(60)
      setFinalCountdown(3)
    }
  }

  const handleJoin = () => {
    setScreen('call')
    setInterviewState('introduction')
  }

  // Centralized confirmation logic for both button clicks and visual gestures
  const handleStartAssessmentConfirmation = () => {
    if (interviewState === 'waitingForConfirmation') {
      setInterviewState('question1')
      setCountdown(60)
      setCurrentQuestionIndex(0)
    }
  }

  const handleTimeUp = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setInterviewState(`question${currentQuestionIndex + 2}` as InterviewState)
      setCountdown(60)
    } else {
      handleInterviewComplete()
    }
  }

  const handleInterviewComplete = () => {
    setInterviewState('finalCountdown')
    setFinalCountdown(3)
  }

  const navigateToResults = async () => {
    setInterviewState('completed')
    
    // Properly end the meeting before navigation
    await handleEnd()
    
    navigate('/assessment-results', {
      state: {
        assessmentResults: {
          results: questions.map(q => ({
            skill: q.skill,
            score: Math.floor(Math.random() * 30) + 70, // Mock score 70-100
            feedback: `Based on your interview response about ${q.skill}, you demonstrated good understanding of the core concepts.`,
            strengths: [`Good knowledge of ${q.skill} fundamentals`, 'Clear communication'],
            improvements: [`Deepen expertise in advanced ${q.skill} techniques`, 'Practice with real-world scenarios']
          })),
          overallScore: Math.floor(Math.random() * 20) + 75,
          summary: `You completed a comprehensive video interview covering ${userSkills.join(', ')}. Your responses showed good foundational knowledge with opportunities for growth.`
        }
      }
    })
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {screen === 'welcome' && (
        <WelcomeScreen 
          onStart={handleStart} 
          loading={loading}
          skills={userSkills}
        />
      )}
      {screen === 'hairCheck' && (
        <HairCheckScreen 
          handleEnd={handleEnd} 
          handleJoin={handleJoin} 
        />
      )}
      {screen === 'call' && conversation && (
        <InterviewCallScreen 
          conversation={conversation} 
          handleEnd={handleEnd}
          interviewState={interviewState}
          setInterviewState={setInterviewState}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          countdown={countdown}
          setCountdown={setCountdown}
          finalCountdown={finalCountdown}
          questions={questions}
          onInterviewComplete={handleInterviewComplete}
          onStartAssessmentConfirmation={handleStartAssessmentConfirmation}
        />
      )}
    </main>
  )
}

export default VideoInterviewPage