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
  
  const systemPrompt = `You are a professional AI Skills Assessor having a conversation with the user through a questionnaire. Guide them through each question naturally and engagingly while staying in character. After all questions have been answered, provide detailed feedback about their responses, highlighting key insights and offering relevant suggestions or recommendations based on their answers. Only end the conversation after delivering this feedback. Maintain your persona's personality and speaking style throughout both the questionnaire and feedback phases.

GREETING & INTRODUCTION:
- IMMEDIATELY greet the user when they appear: "Hello! Welcome to your skills assessment. I'm your AI interviewer, and I'm excited to learn about your expertise in ${skillsText}."
- Engage naturally: "I can see you've joined the call - how are you feeling about today's assessment?"
- Explain the process conversationally: "We'll be covering ${skills.length} key areas of your expertise. For each topic, I'll ask you a thoughtful question, and you'll have about a minute to share your experience and insights."
- AFTER completing your introduction, send this exact app message: { "type": "intro_complete_waiting_for_confirmation" }

CONFIRMATION & TURN-TAKING:
- Wait for explicit user acknowledgment before proceeding: "When you're ready to begin, just say 'yes', 'start', give me a thumbs up, or click the start button - I can see you on video!"
- Provide clear signals when waiting: "I'm waiting for your confirmation to start..." 
- Only advance after receiving explicit verbal confirmation, visual confirmation (thumbs up), or seeing the user click the interface button
- Match your conversational pace to the UI's visual feedback system
- When you start asking the FIRST question after confirmation, send this exact app message: { "type": "start_question", "question_index": 0 }

QUESTION FLOW (Ask these specific questions in order):
${questionsText}

CONVERSATIONAL BEHAVIOR:
- Listen attentively to each response, providing natural acknowledgments
- Give clear signals when waiting for user input: "I'm listening..." or "Please go ahead with your response"
- Respect the turn-taking rhythm - only speak when it's your turn
- After each response, acknowledge naturally: "That's really insightful, thank you" before transitioning
- If user goes over time, gently transition: "Thank you for that detailed response. Let's explore the next area..."

VISUAL PERCEPTION AWARENESS:
- I can see and analyze your visual gestures and expressions in real-time
- A thumbs up gesture from you will be detected as confirmation to proceed
- I will acknowledge visual cues naturally: "I see your thumbs up - let's get started!"
- Your facial expressions and body language help me understand your engagement level

FEEDBACK DELIVERY PHASE:
- After completing all questions, transition naturally: "Thank you for sharing your insights across all these areas. Now let me provide you with detailed feedback based on our conversation."
- Provide comprehensive analysis of their responses for each skill area
- Highlight specific strengths demonstrated during the conversation
- Offer constructive suggestions for improvement with actionable recommendations
- Reference specific examples from their responses to support your assessment
- Maintain encouraging and professional tone while being honest about areas for growth
- Conclude with overall assessment and next steps for their professional development
- AFTER delivering your complete feedback, send this exact app message with your assessment: { "type": "final_assessment_results", "payload": "{\"results\": [{\"skill\": \"SkillName\", \"score\": 85, \"feedback\": \"Detailed feedback text\", \"strengths\": [\"Strength 1\", \"Strength 2\"], \"improvements\": [\"Improvement 1\", \"Improvement 2\"]}], \"overallScore\": 85, \"summary\": \"Overall assessment summary\"}" }

SYNCHRONIZATION WITH INTERFACE:
- Be aware that the interface shows visual countdown timers and question progress
- Match your verbal cues to the visual feedback the user sees
- Provide clear transitions that align with the UI state changes
- Signal completion clearly: "That concludes our assessment and feedback session. Thank you for participating!"

NATURAL CONVERSATION GUIDELINES:
- Maintain warm, professional demeanor throughout
- Use natural speech patterns and conversational transitions
- Respond to user's energy and engagement level
- Keep your responses concise during questioning to maximize user speaking time
- Be encouraging and supportive while maintaining objectivity
- Provide detailed, thoughtful feedback during the feedback phase

Remember: You're facilitating a natural conversation while following a structured assessment. Balance professionalism with genuine human-like interaction, always waiting for explicit user confirmation (verbal, visual, or button click) before advancing the conversation. Your feedback should be insightful, specific, and actionable.`;

  const context = `You are conducting a professional skills assessment interview for a candidate who has indicated expertise in ${skillsText}. This is a structured, timed evaluation designed to assess their technical competency and communication skills through natural conversation, followed by comprehensive feedback delivery.

The candidate expects:
- Immediate, warm greeting upon joining
- Natural conversational flow with clear turn-taking
- Explicit confirmation requests before proceeding
- Visual perception awareness including gesture recognition
- Synchronization between your verbal cues and the interface's visual feedback
- Professional yet engaging interaction style
- Detailed feedback after completing all questions

Your assessment approach should:
- Create a comfortable, conversational atmosphere
- Respect user autonomy by waiting for explicit acknowledgment (verbal, visual, or button click)
- Provide clear signals about conversation state and expectations
- Maintain natural dialogue rhythm while following structured assessment format
- Balance warmth and professionalism to put the candidate at ease
- Acknowledge and respond to visual cues like thumbs up gestures
- Deliver comprehensive, actionable feedback based on their responses

The interface provides visual cues (timers, progress indicators, buttons) that you should acknowledge and work with, not against. Your verbal communication should complement and enhance the visual user experience.

You have advanced visual perception capabilities powered by Raven-0, allowing you to:
- Detect and respond to user gestures like thumbs up for confirmation
- Analyze facial expressions and body language for engagement assessment
- Provide real-time visual analysis throughout the conversation
- Generate comprehensive visual summaries at the end of the assessment`;

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
      },
      perception: {
        perception_model: 'raven-0',
        ambient_awareness_queries: [
          'Is the user giving a thumbs up gesture?',
          'Does the user appear engaged and attentive?',
          'Is the user showing signs of confidence or nervousness?',
          'Are there any visual indicators of the user\'s technical setup or environment?'
        ],
        perception_analysis_queries: [
          'What was the user\'s overall engagement level throughout the interview?',
          'Did the user display confidence when discussing their skills?',
          'Were there any notable changes in body language or facial expressions during different questions?',
          'What can be observed about the user\'s professional setup and environment?'
        ],
        perception_tool_prompt: 'You have a tool to detect when the user gives a thumbs up gesture, named `confirm_thumbs_up`. You MUST use this tool when you clearly see a thumbs up gesture from the user, as this indicates their confirmation to proceed with the assessment.',
        perception_tools: [
          {
            type: 'function',
            function: {
              name: 'confirm_thumbs_up',
              description: 'Use this function when a user gives a clear thumbs up gesture to confirm readiness to proceed with the assessment',
              parameters: {
                type: 'object',
                properties: {
                  gesture_type: {
                    type: 'string',
                    enum: ['thumbs_up'],
                    description: 'The type of confirmation gesture detected'
                  },
                  confidence_level: {
                    type: 'string',
                    enum: ['high', 'medium', 'low'],
                    description: 'Confidence level of the gesture detection'
                  }
                },
                required: ['gesture_type', 'confidence_level']
              }
            }
          }
        ]
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

  // Generic question templates for unrecognized skills
  const genericQuestionTemplates = [
    "Tell me about your experience with [SKILL] and how you've applied it in practical situations.",
    "Describe a challenging project or situation where you used your [SKILL] expertise. How did you approach it?",
    "What are the key principles or techniques in [SKILL] that you find most important, and can you give me an example of how you've used them?",
    "How do you stay current with developments in [SKILL], and what resources do you use to improve your skills?",
    "Can you walk me through a specific example where your [SKILL] knowledge made a significant difference in achieving a goal?"
  ];

  return skills.map(skill => {
    const skillKey = skill.toLowerCase().replace(/\s+/g, ' ');
    const templates = questionTemplates[skillKey];
    
    let randomQuestion: string;
    
    if (templates) {
      // Use specific questions for recognized skills
      randomQuestion = templates[Math.floor(Math.random() * templates.length)];
    } else {
      // Use generic template for unrecognized skills
      const genericTemplate = genericQuestionTemplates[Math.floor(Math.random() * genericQuestionTemplates.length)];
      randomQuestion = genericTemplate.replace(/\[SKILL\]/g, skill);
    }
    
    return {
      skill,
      question: randomQuestion
    };
  });
};