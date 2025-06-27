import { Button } from '@/components/ui/button'
import { ArrowRight, Sparkles, Target, Trophy } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export const LandingPage = () => {
  const navigate = useNavigate()

  const handleGetStarted = () => {
    navigate('/auth')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Hero Content */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white/90 font-medium">AI-Powered Skill Assessment</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Master Your
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"> Skills</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
            Get personalized feedback on your expertise through AI-powered video conversations. 
            Discover your strengths and unlock your potential.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Target className="w-8 h-8 text-purple-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Skill Assessment</h3>
            <p className="text-white/70 text-sm">AI evaluates your expertise across multiple dimensions</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Sparkles className="w-8 h-8 text-cyan-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Smart Conversations</h3>
            <p className="text-white/70 text-sm">Interactive video sessions tailored to your skills</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
            <Trophy className="w-8 h-8 text-yellow-400 mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-white mb-2">Instant Feedback</h3>
            <p className="text-white/70 text-sm">Get detailed insights and improvement suggestions</p>
          </div>
        </div>

        {/* CTA */}
        <Button 
          onClick={handleGetStarted}
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 group"
        >
          Get Started
          <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        <p className="text-white/60 text-sm mt-4">
          No credit card required • Free assessment
        </p>
      </div>
    </div>
  )
  )
}