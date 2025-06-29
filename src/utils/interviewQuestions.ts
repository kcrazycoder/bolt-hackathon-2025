export const SKILL_QUESTIONS = {
  javascript: [
    "Can you walk me through how you would optimize the performance of a JavaScript application that's running slowly?",
    "Describe a challenging JavaScript project you've worked on and how you approached solving complex problems in it.",
    "How do you handle asynchronous operations in JavaScript, and can you give me an example of when you've used promises or async/await?",
    "Explain the concept of closures in JavaScript and provide a practical example of when you might use them.",
    "What are the differences between var, let, and const, and when would you use each one?"
  ],
  react: [
    "Tell me about a React application you've built. What was the most complex component you created and how did you structure it?",
    "How do you manage state in a large React application, and what patterns or libraries do you prefer?",
    "Can you explain how you would optimize a React application for better performance?",
    "Describe your experience with React hooks. Which ones do you use most frequently and why?",
    "How do you handle side effects in React components, and what's your approach to data fetching?"
  ],
  python: [
    "Describe a Python project where you had to work with data processing or analysis. What libraries did you use and why?",
    "How do you approach debugging in Python, and can you walk me through a challenging bug you've solved?",
    "Tell me about your experience with Python frameworks. Which ones have you used and for what types of projects?",
    "Explain how you would handle memory management and performance optimization in a Python application.",
    "What's your experience with Python's object-oriented programming features, and how do you structure larger codebases?"
  ],
  photoshop: [
    "Walk me through your typical workflow when starting a new design project in Photoshop.",
    "Describe a challenging photo manipulation or design project you've completed. What techniques did you use?",
    "How do you ensure your Photoshop work is optimized for different output formats, like web or print?",
    "Tell me about your experience with Photoshop's layer management and how you organize complex projects.",
    "What are some advanced Photoshop techniques you've mastered, and how do they improve your workflow?"
  ],
  marketing: [
    "Tell me about a successful marketing campaign you've planned or executed. What was your strategy and how did you measure success?",
    "How do you approach identifying and understanding your target audience for a new product or service?",
    "Describe your experience with digital marketing channels. Which ones have you found most effective and why?",
    "How do you measure and analyze the ROI of marketing campaigns, and what metrics do you focus on?",
    "Tell me about a time when a marketing campaign didn't perform as expected. How did you analyze and improve it?"
  ],
  design: [
    "Walk me through your design process from initial concept to final deliverable.",
    "Tell me about a design project where you had to balance user needs with business requirements. How did you approach it?",
    "How do you stay current with design trends and ensure your work remains fresh and relevant?",
    "Describe your experience with user research and how it influences your design decisions.",
    "What's your approach to creating designs that work across different devices and screen sizes?"
  ],
  'web development': [
    "Describe a web application you've built from scratch. What technologies did you choose and why?",
    "How do you approach responsive design and ensuring your websites work across different devices?",
    "Tell me about a performance optimization challenge you've faced in web development and how you solved it.",
    "What's your process for ensuring web accessibility in your projects?",
    "How do you handle browser compatibility issues, and what tools do you use for testing?"
  ],
  'data science': [
    "Walk me through a data science project you've completed from data collection to insights.",
    "How do you approach data cleaning and preprocessing, and what challenges have you encountered?",
    "Describe your experience with machine learning algorithms. Which ones do you use most frequently?",
    "How do you validate and evaluate the performance of your data models?",
    "Tell me about a time when you had to communicate complex data insights to non-technical stakeholders."
  ],
  'project management': [
    "Describe a challenging project you've managed. What obstacles did you face and how did you overcome them?",
    "How do you approach project planning and resource allocation for complex initiatives?",
    "Tell me about your experience with different project management methodologies. Which do you prefer and why?",
    "How do you handle scope creep and changing requirements during a project?",
    "Describe your approach to team communication and stakeholder management."
  ],
  'content writing': [
    "Tell me about a content strategy you've developed. What was your approach and how did you measure success?",
    "How do you adapt your writing style for different audiences and platforms?",
    "Describe your research process when writing about topics you're not familiar with.",
    "How do you optimize content for search engines while maintaining readability and engagement?",
    "Tell me about a piece of content you're particularly proud of and what made it successful."
  ]
} as const;

export type SkillKey = keyof typeof SKILL_QUESTIONS;

export const getRandomQuestionForSkill = (skill: string): string => {
  const normalizedSkill = skill.toLowerCase().replace(/\s+/g, ' ').trim();
  const skillKey = normalizedSkill as SkillKey;
  
  const questions = SKILL_QUESTIONS[skillKey] || SKILL_QUESTIONS.design; // fallback
  return questions[Math.floor(Math.random() * questions.length)];
};