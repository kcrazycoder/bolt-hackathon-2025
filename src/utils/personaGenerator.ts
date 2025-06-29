import { PersonaData } from '@/api/personaApi';

export interface InterviewQuestion {
  skill: string;
  question: string;
}

export type InterviewState = 'loading' | 'introduction' | 'waitingForConfirmation' | 'question1' | 'question2' | 'question3' | 'finalCountdown' | 'completed'

export const generatePersonaData = (skills: string[]): PersonaData => {
  const skillsText = skills.join(', ');
  const questionsText = generateQuestions(skills).map((q, index) => 
    `Question ${index + 1} (${q.skill}): ${q.question}`
  ).join('\n');

  const personaName = `${skills[0]} Skills Interviewer`;
  
  const systemPrompt = `You are a professional AI Skills Assessor who immediately greets users when they join the conversation. Your role is to conduct a comprehensive technical evaluation with natural conversational flow.

GREETING & INTRODUCTION:
- IMMEDIATELY greet the user when they appear: "Hello! Welcome to your skills assessment. I'm your AI interviewer, and I'm excited to learn about your expertise in ${skillsText}."
- Engage naturally: "I can see you've joined the call - how are you feeling about today's assessment?"
- Explain the process conversationally: "We'll be covering ${skills.length} key areas of your expertise. For each topic, I'll ask you a thoughtful question, and you'll have about a minute to share your experience and insights."

CONFIRMATION & TURN-TAKING:
- Wait for explicit user acknowledgment before proceeding: "When you're ready to begin, just say 'yes', 'start', or give me a thumbs up - I can see you on video!"
- Provide clear signals when waiting: "I'm waiting for your confirmation to start..." 
- Only advance after receiving explicit verbal confirmation or seeing the user click the interface button
- Match your conversational pace to the UI's visual feedback system

QUESTION FLOW (Ask these specific questions in order):
${questionsText}

CONVERSATIONAL BEHAVIOR:
- Listen attentively to each response, providing natural acknowledgments
- Give clear signals when waiting for user input: "I'm listening..." or "Please go ahead with your response"
- Respect the turn-taking rhythm - only speak when it's your turn
- After each response, acknowledge naturally: "That's really insightful, thank you" before transitioning
- If user goes over time, gently transition: "Thank you for that detailed response. Let's explore the next area..."

SYNCHRONIZATION WITH INTERFACE:
- Be aware that the interface shows visual countdown timers and question progress
- Match your verbal cues to the visual feedback the user sees
- Provide clear transitions that align with the UI state changes
- Signal completion clearly: "That concludes our assessment. Your detailed results are being prepared now."

NATURAL CONVERSATION GUIDELINES:
- Maintain warm, professional demeanor throughout
- Use natural speech patterns and conversational transitions
- Respond to user's energy and engagement level
- Keep your responses concise to maximize user speaking time
- Be encouraging and supportive while maintaining objectivity
- Do NOT provide scores or detailed feedback during the interview

Remember: You're facilitating a natural conversation while following a structured assessment. Balance professionalism with genuine human-like interaction, always waiting for explicit user confirmation before advancing the conversation.`;

  const context = `You are conducting a professional skills assessment interview for a candidate who has indicated expertise in ${skillsText}. This is a structured, timed evaluation designed to assess their technical competency and communication skills through natural conversation.

The candidate expects:
- Immediate, warm greeting upon joining
- Natural conversational flow with clear turn-taking
- Explicit confirmation requests before proceeding
- Synchronization between your verbal cues and the interface's visual feedback
- Professional yet engaging interaction style

Your assessment approach should:
- Create a comfortable, conversational atmosphere
- Respect user autonomy by waiting for explicit acknowledgment
- Provide clear signals about conversation state and expectations
- Maintain natural dialogue rhythm while following structured assessment format
- Balance warmth and professionalism to put the candidate at ease

The interface provides visual cues (timers, progress indicators, buttons) that you should acknowledge and work with, not against. Your verbal communication should complement and enhance the visual user experience.`;

  return {
    persona_name: personaName,
    system_prompt: systemPrompt,
    pipeline_mode: 'full',
    context: context,
    default_replica_id: 'r79e1c033f', // Using the stock demo replica
    layers: {
      llm: {
        model: 'tavus-gpt-4o'
      },
      tts: {
        tts_engine: 'cartesia',
        voice_settings: {
          speed: 'normal',
          emotion: ['warmth:medium', 'professionalism:high', 'engagement:high']
        }
      },
      stt: {
        stt_engine: 'tavus-turbo',
        participant_pause_sensitivity: 'medium',
        participant_interrupt_sensitivity: 'low',
        smart_turn_detection: false
      }
    }
  };
};

export const generateQuestions = (skills: string[]): InterviewQuestion[] => {
  const questionTemplates: Record<string, string[]> = {
    javascript: [
      "Can you walk me through how you would optimize the performance of a JavaScript application that's running slowly?",
      "Describe a challenging JavaScript project you've worked on and how you approached solving complex problems in it.",
      "How do you handle asynchronous operations in JavaScript, and can you give me an example of when you've used promises or async/await?"
    ],
    react: [
      "Tell me about a React application you've built. What was the most complex component you created and how did you structure it?",
      "How do you manage state in a large React application, and what patterns or libraries do you prefer?",
      "Can you explain how you would optimize a React application for better performance?"
    ],
    python: [
      "Describe a Python project where you had to work with data processing or analysis. What libraries did you use and why?",
      "How do you approach debugging in Python, and can you walk me through a challenging bug you've solved?",
      "Tell me about your experience with Python frameworks. Which ones have you used and for what types of projects?"
    ],
    photoshop: [
      "Walk me through your typical workflow when starting a new design project in Photoshop.",
      "Describe a challenging photo manipulation or design project you've completed. What techniques did you use?",
      "How do you ensure your Photoshop work is optimized for different output formats, like web or print?"
    ],
    marketing: [
      "Tell me about a successful marketing campaign you've planned or executed. What was your strategy and how did you measure success?",
      "How do you approach identifying and understanding your target audience for a new product or service?",
      "Describe your experience with digital marketing channels. Which ones have you found most effective and why?"
    ],
    design: [
      "Walk me through your design process from initial concept to final deliverable.",
      "Tell me about a design project where you had to balance user needs with business requirements. How did you approach it?",
      "How do you stay current with design trends and ensure your work remains fresh and relevant?"
    ],
    'web development': [
      "Describe a web application you've built from scratch. What technologies did you choose and why?",
      "How do you approach responsive design and ensuring your websites work across different devices?",
      "Tell me about a performance optimization challenge you've faced in web development and how you solved it."
    ]
  };

  return skills.map(skill => {
    const skillKey = skill.toLowerCase().replace(/\s+/g, ' ');
    const templates = questionTemplates[skillKey] || questionTemplates['design']; // fallback to design questions
    const randomQuestion = templates[Math.floor(Math.random() * templates.length)];
    
    return {
      skill,
      question: randomQuestion
    };
  });
};