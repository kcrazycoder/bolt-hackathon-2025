import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Video, Users, Clock } from 'lucide-react';

interface WelcomeScreenProps {
  onStart: () => void;
  loading: boolean;
  skills?: string[];
}

export const WelcomeScreen = ({ onStart, loading, skills = [] }: WelcomeScreenProps) => {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-10 p-10'>
      <div className="text-center max-w-4xl mx-auto">
        <h1 className='text-4xl md:text-6xl font-bold text-white mb-6 leading-tight'>
          AI Video Interview
        </h1>
        <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          Join a personalized video conversation with our AI interviewer. 
          Get assessed on your skills through interactive questions and real-time feedback.
        </p>
      </div>

      {/* Skills Preview */}
      {skills.length > 0 && (
        <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md w-full">
          <CardHeader className="text-center">
            <CardTitle className="text-white">Your Skills Assessment</CardTitle>
            <CardDescription className="text-white/70">
              You'll be interviewed on these skills:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 justify-center">
              {skills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-purple-600/20 text-purple-200 border-purple-500/30"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Interview Info */}
      <div className="grid md:grid-cols-3 gap-6 max-w-3xl w-full">
        <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="pt-6">
            <Video className="w-8 h-8 text-purple-400 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Live Video Chat</h3>
            <p className="text-white/60 text-sm">
              Face-to-face conversation with AI interviewer
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="pt-6">
            <Users className="w-8 h-8 text-cyan-400 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Personalized Questions</h3>
            <p className="text-white/60 text-sm">
              Tailored questions based on your selected skills
            </p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 backdrop-blur-sm border-white/10 text-center">
          <CardContent className="pt-6">
            <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-white font-medium mb-2">Timed Assessment</h3>
            <p className="text-white/60 text-sm">
              1 minute per question, structured interview format
            </p>
          </CardContent>
        </Card>
      </div>

      <Button 
        onClick={onStart}
        disabled={loading}
        size="lg"
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
      >
        {loading ? 'Creating AI Interviewer...' : 'Start Video Interview'}
      </Button>

      {skills.length === 0 && (
        <p className="text-white/60 text-sm text-center">
          No skills found. Please add your skills first.
        </p>
      )}
    </div>
  );
};