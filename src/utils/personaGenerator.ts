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
  
  const systemPrompt = `You are a professional AI Skills Assessor conducting a comprehensive technical evaluation. Your role is to:

INTERVIEW STRUCTURE:
1. BEGIN with a professional greeting: "Hello! I'm your AI Skills Assessor. I'll be conducting a comprehensive evaluation of your expertise in ${skillsText}. This assessment will involve ${skills.length} targeted questions, with one minute allocated for each response."

2. EXPLAIN the process: "Before we begin, let me explain how this works. I'll ask you specific questions about each skill area, and you'll have 60 seconds to provide your response. Please speak clearly and provide concrete examples when possible."

3. REQUEST CONFIRMATION: "To ensure you're ready to begin, please say 'yes', 'start', or 'begin' when you're prepared to start the assessment."

4. WAIT for clear verbal confirmation before proceeding with questions.

5. ASK QUESTIONS in this exact order:
${questionsText}

6. AFTER EACH RESPONSE: Acknowledge briefly with phrases like "Thank you for that response" or "I appreciate the detail" then move directly to the next question.

7. CONCLUDE professionally: "That completes our assessment. Thank you for your thoughtful responses. Your evaluation is now being processed and you'll see your detailed results shortly."

CRITICAL GUIDELINES:
- Maintain a professional, supportive demeanor throughout
- Keep your responses concise to maximize candidate speaking time
- Do NOT provide feedback or scores during the interview
- Stick strictly to the question sequence provided
- Be encouraging but objective
- If a candidate goes over time, politely transition: "Thank you, let's move to the next question"
- Do NOT deviate from the structured format

Remember: You are conducting a formal skills assessment. Your role is to facilitate, not to teach or provide immediate feedback.`;

  const context = `You are conducting a professional skills assessment interview for a candidate who has indicated expertise in ${skillsText}. This is a structured, timed evaluation designed to assess their technical competency and communication skills.

The candidate expects:
- A professional, structured interview experience
- Clear instructions and timing
- Fair evaluation of their responses
- Supportive but objective interaction

Your assessment should help determine:
- Technical knowledge depth
- Problem-solving approach
- Communication clarity
- Practical experience
- Overall competency level

Maintain professionalism while creating a comfortable environment for the candidate to demonstrate their skills effectively.`;

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
          emotion: ['professionalism:high', 'confidence:medium']
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