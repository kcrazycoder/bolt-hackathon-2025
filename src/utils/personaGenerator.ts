import { PersonaData } from '@/api/personaApi';

export interface InterviewQuestion {
  skill: string;
  question: string;
}

export const generatePersonaData = (skills: string[]): PersonaData => {
  const skillsText = skills.join(', ');
  const questionsText = generateQuestions(skills).map((q, index) => 
    `Question ${index + 1} (${q.skill}): ${q.question}`
  ).join('\n');

  const personaName = `${skills[0]} Skills Interviewer`;
  
  const systemPrompt = `You are an AI interviewer conducting a professional skills assessment for a candidate with expertise in: ${skillsText}.

INTERVIEW STRUCTURE:
1. Start with a brief self-introduction (15-20 seconds)
2. Ask for verbal confirmation to begin the assessment
3. Once confirmed, proceed with exactly ${skills.length} questions (one per skill)
4. Each question has a 1-minute time limit for the candidate's response
5. After each response, acknowledge briefly and move to the next question
6. Conclude professionally after all questions

QUESTIONS TO ASK:
${questionsText}

IMPORTANT GUIDELINES:
- Keep your introduction concise and professional
- Wait for clear verbal confirmation before starting questions
- Ask questions one at a time, in order
- Give candidates the full minute to respond
- Be encouraging and professional throughout
- After 1 minute per question, politely transition to the next
- Maintain a supportive, interview-like atmosphere
- Do not provide feedback on answers during the interview

Remember: This is a timed assessment. Keep your responses brief to maximize the candidate's speaking time.`;

  const context = `You are conducting a professional skills interview for a candidate who has indicated expertise in ${skillsText}. This is a structured assessment with specific time constraints. The candidate is expecting a professional, supportive interview experience that will help evaluate their skills fairly and comprehensively.

The interview should feel natural and conversational while maintaining the required structure and timing. Your role is to facilitate the candidate's demonstration of their skills through thoughtful questions and active listening.`;

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
          emotion: ['positivity:medium', 'professionalism:high']
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