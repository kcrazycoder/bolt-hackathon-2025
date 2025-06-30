import { useState, useEffect } from 'react'
import { DailyAudio, useParticipantIds, useLocalSessionId, useAudioTrack } from '@daily-co/daily-react'
import { Minimize, Maximize } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Video } from '@/components/Video'
import { Button } from '@/components/ui/button'
import { InterviewState, InterviewQuestion } from '@/utils/personaGenerator'

interface InterviewCallProps {
  interviewState: InterviewState
  setInterviewState: (state: InterviewState) => void
  currentQuestionIndex: number
  countdown: number
  finalCountdown: number
  questions: InterviewQuestion[]
  onStartAssessmentConfirmation: () => void
}

export const InterviewCall = ({
  interviewState,
  setInterviewState,
  currentQuestionIndex,
  countdown,
  finalCountdown,
  questions,
  onStartAssessmentConfirmation
}: InterviewCallProps) => {
  const remoteParticipantIds = useParticipantIds({ filter: 'remote' })
  const localSessionId = useLocalSessionId()
  const [mode, setMode] = useState<'full' | 'minimal'>('full')

  // Use useAudioTrack to get proper DailyTrackState objects
  const localAudioTrack = useAudioTrack(localSessionId)
  const remoteParticipantId = remoteParticipantIds[0]
  const remoteAudioTrack = useAudioTrack(remoteParticipantId)

  // Now we can safely access isSpeaking property from DailyTrackState
  const localIsSpeaking = localAudioTrack?.isSpeaking || false
  const remoteIsSpeaking = remoteAudioTrack?.isSpeaking || false

  // Handle automatic transition from introduction to waiting for confirmation
  useEffect(() => {
    if (interviewState === 'introduction') {
      // Wait for AI to finish introduction (approximately 20 seconds)
      const timer = setTimeout(() => {
        setInterviewState('waitingForConfirmation')
      }, 20000)
      return () => clearTimeout(timer)
    }
  }, [interviewState, setInterviewState])

  // Dynamic transition based on AI speech patterns
  useEffect(() => {
    // When AI starts speaking during waitingForConfirmation, it likely means
    // the user has given verbal confirmation and AI is asking the first question
    if (interviewState === 'waitingForConfirmation' && remoteIsSpeaking) {
      // Small delay to ensure this is the start of the first question, not just acknowledgment
      const timer = setTimeout(() => {
        if (interviewState === 'waitingForConfirmation') {
          onStartAssessmentConfirmation()
        }
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [interviewState, remoteIsSpeaking, onStartAssessmentConfirmation])

  const handleToggleMode = () => {
    setMode(prev => prev === 'full' ? 'minimal' : 'full')
  }

  return (
    <>
      <div className={cn("flex items-center justify-center", {
        'fixed bottom-20 right-20 z-50': mode === 'minimal',
      })}>
        <div className='relative'>
          <Button 
            variant='outline' 
            onClick={handleToggleMode} 
            className='absolute top-2 right-2 z-10 gap-2 bg-black/50 border-white/20 text-white hover:bg-black/70' 
            size='sm'
          >
            {mode === 'full' ? 'Minimize' : 'Maximize'}
            {mode === 'full' ? <Minimize className='size-4' /> : <Maximize className='size-4' />}
          </Button>
          
          {remoteParticipantIds.length > 0 ? (
            <Video
              id={remoteParticipantIds[0]}
              className={cn('border-4 transition-all duration-300', {
                'max-h-[50vh] min-h-[20rem]': mode === 'full',
                'max-h-[15rem]': mode === 'minimal',
                'border-green-400 shadow-lg shadow-green-400/50': remoteIsSpeaking,
                'border-white/20': !remoteIsSpeaking,
              })}
              isSpeaking={remoteIsSpeaking}
            />
          ) : (
            <div className={cn('relative flex items-center justify-center bg-slate-800 rounded-lg border-4 border-white/20', {
              'w-[50vh] h-[50vh] min-h-[20rem]': mode === 'full',
              'w-[15rem] h-[15rem]': mode === 'minimal',
            })}>
              <p className='text-xl text-white'>Waiting for interviewer...</p>
            </div>
          )}
          
          {localSessionId && (
            <Video
              id={localSessionId}
              className={cn('absolute bottom-2 right-2 border-2 transition-all duration-300', {
                'max-h-40': mode === 'full',
                'max-h-20': mode === 'minimal',
                'border-blue-400 shadow-lg shadow-blue-400/50': localIsSpeaking,
                'border-white/40': !localIsSpeaking,
              })}
              isSpeaking={localIsSpeaking}
            />
          )}

          {/* Interview State Overlay */}
          {mode === 'full' && (
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3 text-white">
              {interviewState === 'introduction' && (
                <div className="text-sm">
                  <div className="font-medium">🎤 AI Interviewer Introduction</div>
                  <div className="text-white/70">Listen to the introduction...</div>
                </div>
              )}
              
              {interviewState === 'waitingForConfirmation' && (
                <div className="text-sm space-y-2">
                  <div className="font-medium">✋ Confirmation Required</div>
                  <div className="text-white/70">Say "yes", "start", give a thumbs up, or click the button</div>
                  <Button 
                    size="sm" 
                    onClick={onStartAssessmentConfirmation}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Start Assessment
                  </Button>
                </div>
              )}
              
              {interviewState.startsWith('question') && questions[currentQuestionIndex] && (
                <div className="text-sm max-w-md">
                  <div className="font-medium">📝 Question {currentQuestionIndex + 1}</div>
                  <div className="text-white/70 mt-1">
                    Skill: {questions[currentQuestionIndex].skill}
                  </div>
                  <div className="text-xs text-white/50 mt-2">
                    You have {countdown} seconds to respond
                  </div>
                </div>
              )}

              {interviewState === 'finalCountdown' && (
                <div className="text-sm text-center">
                  <div className="font-medium text-yellow-400">🏁 Interview Complete</div>
                  <div className="text-white/70 mt-1">Preparing your results...</div>
                  <div className="text-2xl font-bold text-yellow-400 mt-2">
                    {finalCountdown}
                  </div>
                  <div className="text-xs text-white/50">seconds remaining</div>
                </div>
              )}
              
              {interviewState === 'completed' && (
                <div className="text-sm">
                  <div className="font-medium">✅ Redirecting to Results</div>
                  <div className="text-white/70">Please wait...</div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <DailyAudio />
    </>
  )
}