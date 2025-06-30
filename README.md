# Skaill - AI-Powered Skill Assessment

Scale your skills with AI through interactive video conversations.

## 🚀 Features

This app includes:
- Welcome screen featuring a "Start Conversation" button to initiate the skill assessment
- Hair check screen with custom select options to manage audio and video devices
- Video call interface powered by Daily.co
- Integration with Tavus API for AI-powered skill assessment conversations
- Real-time skill evaluation through conversational AI
- Personalized feedback and improvement recommendations
- Secure user authentication and profile management
- Assessment history tracking

## 🎯 What is Skaill?

Skaill combines "skill" and "AI" to create a platform that helps you **scale** your professional abilities through intelligent assessment. Our AI interviewer conducts personalized video conversations to evaluate your expertise across multiple skill areas, providing detailed feedback and actionable insights for growth.

## 🛠 Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create a `.env` file in the root directory and add your Tavus API key:
   ```
   VITE_APP_TAVUS_API_KEY=your_api_key_here
   ```
   You can create an API key at https://platform.tavus.io/

3. Set up Supabase (if not already configured):
   - Click the "Connect to Supabase" button in the top right
   - Configure your database connection
   - The app will automatically set up the required tables

4. Start the development server:
   ```
   npm run dev
   ```

## 📚 Learn More

- [Developer Documentation](https://docs.tavus.io/)
- [API Reference](https://docs.tavus.io/api-reference/)
- [Tavus Platform](https://platform.tavus.io/)
- [Daily React Reference](https://docs.daily.co/reference/daily-react)

## 🎥 How It Works

1. **Sign Up/Sign In**: Create your account or sign in to get started
2. **Add Skills**: Tell us about your expertise areas (up to 3 skills)
3. **Video Interview**: Join a live conversation with our AI interviewer
4. **Get Assessed**: Answer questions tailored to your specific skills
5. **Receive Feedback**: Get detailed insights, scores, and improvement recommendations
6. **Track Progress**: View your assessment history and track your growth over time

## 🔧 Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Video**: Daily.co for WebRTC video calls
- **AI**: Tavus API for conversational AI interviews
- **Database**: Supabase for user profiles and assessment data
- **Authentication**: Supabase Auth
- **Build Tool**: Vite

## 🌟 Key Benefits

- **Personalized Assessment**: AI adapts questions based on your specific skills
- **Real-time Feedback**: Get immediate insights during and after conversations
- **Professional Growth**: Actionable recommendations for skill improvement
- **Convenient**: Assess your skills anytime, anywhere through video
- **Comprehensive**: Covers technical and soft skills across various domains
- **Progress Tracking**: Monitor your improvement over time

---

*Skaill - Where skills meet AI to scale your potential.*