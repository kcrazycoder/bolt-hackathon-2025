import { useEffect, useCallback } from 'react'
import { useDaily, useDailyEvent } from '@daily-co/daily-react'
import { IConversation } from '@/types'
import { CameraSettings } from '@/components/CameraSettings'
import { InterviewCall } from '@/components/InterviewCall.tsx'
import { InterviewState, InterviewQuestion } from '@/utils/personaGenerator'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MessageCircle, CheckCircle, Timer } from 'lucide-react'

interface InterviewCallScreenProps {
  conversation: IConversation
  handleEnd: () => void
  interviewState: InterviewState
  setInterviewState: (state: InterviewState) => void
  currentQuestionIndex: number
  setCurrentQuestionIndex: (index: number) => void
  countdown: number
  setCountdown: (countdown: number) => void
  finalCountdown: number
  questions: InterviewQuestion[]
  onInterviewComplete: () => void
  onStartAssessmentConfirmation: () => void
}

export const InterviewCallScreen = ({
  conversation,
  handleEnd,
  interviewState,
  setInterviewState,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  countdown,
  setCountdown,
  finalCountdown,
  questions,
  onInterviewComplete,
  onStartAssessmentConfirmation
}: InterviewCallScreenProps) => {
  const daily = useDaily()

  useEffect(() => {
    if (conversation && daily) {
      const { conversation_url } = conversation
      daily.join({
        url: conversation_url,
      })
    }
  }, [daily, conversation])

  // Listen for perception tool calls (thumbs up detection)
  useDailyEvent(
    'app-message',
    useCallback((event: any) => {
      // Check if this is a perception tool call event
      if (event?.data?.event_type === 'conversation.perception_tool_call') {
        const { properties } = event.data
        
        // Check if it's the thumbs up confirmation tool
        if (properties?.name === 'confirm_thumbs_up' && 
            properties?.arguments?.gesture_type === 'thumbs_up') {
          console.log('Thumbs up gesture detected:', properties.arguments)
          
          // Trigger the confirmation if we're waiting for it
          if (interviewState === 'waitingForConfirmation') {
            onStartAssessmentConfirmation()
          }
        }
      }
    }, [interviewState, onStartAssessmentConfirmation])
  )

  const handleLeave = async () => {
    await daily?.leave()
    handleEnd()
  }

  const getStateDisplay = () => {
    switch (interviewState) {
      case 'loading':
        return { text: 'Loading...', color: 'bg-gray-500' }
      case 'introduction':
        return { text: 'Introduction', color: 'bg-blue-500' }
      case 'waitingForConfirmation':
        return { text: 'Waiting for Confirmation', color: 'bg-yellow-500' }
      case 'question1':
      case 'question2':
      case 'question3':
        return { text: `Question ${currentQuestionIndex + 1}`, color: 'bg-purple-500' }
      case 'finalCountdown':
        return { text: 'Interview Concluding', color: 'bg-orange-500' }
      case 'completed':
        return { text: 'Interview Complete', color: 'bg-green-500' }
      default:
        return { text: 'In Progress', color: 'bg-blue-500' }
    }
  }

  const stateDisplay = getStateDisplay()
  const isQuestionPhase = interviewState.startsWith('question')
  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Interview Status Header */}
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Badge className={`${stateDisplay.color} text-white px-3 py-1`}>
                  {stateDisplay.text}
                </Badge>
                {isQuestionPhase && currentQuestion && (
                  <div className="flex items-center gap-2 text-white/80">
                    <MessageCircle className="w-4 h-4" />
                    <span className="text-sm">Skill: {currentQuestion.skill}</span>
                  </div>
                )}
              </div>
              
              {isQuestionPhase && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-white">
                    <Clock className="w-5 h-5" />
                    <span className="text-2xl font-mono font-bold">
                      {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                  <div className="text-white/60 text-sm">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </div>
                </div>
              )}

              {interviewState === 'finalCountdown' && (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-orange-400">
                    <Timer className="w-5 h-5" />
                    <span className="text-2xl font-mono font-bold">
                      {finalCountdown}
                    </span>
                  </div>
                  <div className="text-white/60 text-sm">
                    Preparing results...
                  </div>
                </div>
              )}
              
              {interviewState === 'completed' && (
                <div className="flex items-center gap-2 text-green-400">
                  <CheckCircle className="w-5 h-5" />
                  <span>Redirecting to results...</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Video Call Interface */}
        <div className="mb-6">
          <InterviewCall 
            interviewState={interviewState}
            setInterviewState={setInterviewState}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={setCurrentQuestionIndex}
            countdown={countdown}
            setCountdown={setCountdown}
            finalCountdown={finalCountdown}
            questions={questions}
            onInterviewComplete={onInterviewComplete}
            onStartAssessmentConfirmation={onStartAssessmentConfirmation}
          />
        </div>

        {/* Camera Controls */}
        <CameraSettings
          actionLabel='End Interview'
          onAction={handleLeave}
        />

        {/* Interview Progress */}
        {questions.length > 0 && (
          <Card className="mt-6 bg-white/5 backdrop-blur-sm border-white/10">
            <CardContent className="pt-6">
              <div className="text-center text-white/70">
                <h3 className="text-white font-medium mb-3">Interview Progress</h3>
                <div className="flex justify-center gap-2 mb-4">
                  {questions.map((_, index) => (
                    <div
                      key={index}
                      className={`w-3 h-3 rounded-full ${
                        index < currentQuestionIndex
                          ? 'bg-green-500'
                          : index === currentQuestionIndex && isQuestionPhase
                          ? 'bg-purple-500'
                          : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  {questions.map((question, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg ${
                        index < currentQuestionIndex
                          ? 'bg-green-500/20 text-green-200'
                          : index === currentQuestionIndex && isQuestionPhase
                          ? 'bg-purple-500/20 text-purple-200'
                          : 'bg-white/5 text-white/50'
                      }`}
                    >
                      <div className="font-medium">{question.skill}</div>
                      <div className="text-xs mt-1">
                        {index < currentQuestionIndex
                          ? 'Completed'
                          : index === currentQuestionIndex && isQuestionPhase
                          ? 'In Progress'
                          : 'Pending'
                        }
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}