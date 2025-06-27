// Mock AI Assessment API
// This simulates the AI assessment functionality for Phase 2.1

export interface AssessmentResult {
  skill: string
  score: number
  feedback: string
  strengths: string[]
  improvements: string[]
}

export interface MockAssessmentResponse {
  results: AssessmentResult[]
  overallScore: number
  summary: string
}

// Mock assessment data for different skills
const mockAssessmentData: Record<string, Omit<AssessmentResult, 'skill'>> = {
  javascript: {
    score: 78,
    feedback: "You demonstrate solid understanding of JavaScript fundamentals including ES6+ features, async/await patterns, and DOM manipulation. Your knowledge of closures and prototypal inheritance is evident. However, there's room for improvement in advanced concepts like design patterns and performance optimization.",
    strengths: [
      "Strong grasp of ES6+ syntax and features",
      "Good understanding of asynchronous programming",
      "Solid knowledge of DOM manipulation",
      "Clear understanding of variable scoping"
    ],
    improvements: [
      "Learn more about JavaScript design patterns",
      "Improve understanding of memory management",
      "Practice with advanced array methods",
      "Study performance optimization techniques"
    ]
  },
  react: {
    score: 82,
    feedback: "Excellent understanding of React fundamentals including components, state management, and lifecycle methods. You show proficiency with hooks and modern React patterns. Your component architecture demonstrates good separation of concerns. Consider diving deeper into performance optimization and advanced patterns.",
    strengths: [
      "Excellent use of React hooks",
      "Good component composition skills",
      "Understanding of state management",
      "Clean component architecture"
    ],
    improvements: [
      "Learn React performance optimization techniques",
      "Study advanced patterns like render props",
      "Practice with React testing strategies",
      "Explore state management libraries"
    ]
  },
  python: {
    score: 75,
    feedback: "Good foundation in Python programming with understanding of core concepts, data structures, and object-oriented programming. You demonstrate familiarity with Python's standard library and common patterns. Focus on advanced topics like decorators, context managers, and async programming for further growth.",
    strengths: [
      "Solid understanding of Python syntax",
      "Good use of data structures",
      "Understanding of OOP principles",
      "Familiarity with standard library"
    ],
    improvements: [
      "Learn advanced Python features like decorators",
      "Study async programming with asyncio",
      "Practice with design patterns",
      "Improve error handling strategies"
    ]
  },
  photoshop: {
    score: 85,
    feedback: "Strong proficiency in Adobe Photoshop with excellent understanding of layers, masks, and adjustment techniques. Your knowledge of color theory and composition is evident. You demonstrate skill in both photo editing and digital art creation. Consider exploring advanced compositing and automation techniques.",
    strengths: [
      "Excellent layer management skills",
      "Strong understanding of masks and selections",
      "Good color correction techniques",
      "Creative use of filters and effects"
    ],
    improvements: [
      "Learn advanced compositing techniques",
      "Study Photoshop automation and actions",
      "Practice with 3D features",
      "Explore advanced retouching methods"
    ]
  },
  marketing: {
    score: 73,
    feedback: "Good understanding of marketing fundamentals including target audience analysis, campaign planning, and basic analytics. You show awareness of digital marketing channels and content strategy. Strengthen your knowledge of advanced analytics, conversion optimization, and emerging marketing technologies.",
    strengths: [
      "Good understanding of target audiences",
      "Solid campaign planning skills",
      "Awareness of digital marketing channels",
      "Basic analytics interpretation"
    ],
    improvements: [
      "Learn advanced marketing analytics",
      "Study conversion rate optimization",
      "Practice with marketing automation tools",
      "Explore emerging marketing technologies"
    ]
  }
}

// Default assessment for unknown skills
const defaultAssessment: Omit<AssessmentResult, 'skill'> = {
  score: 70,
  feedback: "Based on our assessment, you show good foundational knowledge in this skill area. You demonstrate understanding of core concepts and practical application. To advance further, focus on deepening your expertise through hands-on practice and staying current with industry best practices.",
  strengths: [
    "Good foundational knowledge",
    "Understanding of core concepts",
    "Practical application skills",
    "Willingness to learn and improve"
  ],
  improvements: [
    "Deepen expertise through practice",
    "Stay current with industry trends",
    "Learn advanced techniques",
    "Build a portfolio of work"
  ]
}

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const runMockAssessment = async (skills: string[]): Promise<MockAssessmentResponse> => {
  // Simulate API call delay
  await delay(2000 + Math.random() * 1000)

  const results: AssessmentResult[] = skills.map(skill => {
    const skillKey = skill.toLowerCase().replace(/\s+/g, '')
    const assessmentData = mockAssessmentData[skillKey] || defaultAssessment
    
    // Add some randomness to scores (±5 points)
    const randomizedScore = Math.max(0, Math.min(100, 
      assessmentData.score + (Math.random() - 0.5) * 10
    ))

    return {
      skill,
      score: Math.round(randomizedScore * 100) / 100,
      feedback: assessmentData.feedback,
      strengths: assessmentData.strengths,
      improvements: assessmentData.improvements
    }
  })

  const overallScore = results.reduce((sum, result) => sum + result.score, 0) / results.length
  
  const summary = generateOverallSummary(results, overallScore)

  return {
    results,
    overallScore: Math.round(overallScore * 100) / 100,
    summary
  }
}

function generateOverallSummary(results: AssessmentResult[], overallScore: number): string {
  const skillCount = results.length
  const topSkill = results.reduce((prev, current) => 
    prev.score > current.score ? prev : current
  )

  let performanceLevel = 'developing'
  if (overallScore >= 85) performanceLevel = 'expert'
  else if (overallScore >= 75) performanceLevel = 'proficient'
  else if (overallScore >= 65) performanceLevel = 'competent'

  return `Based on your assessment across ${skillCount} skill${skillCount > 1 ? 's' : ''}, you demonstrate ${performanceLevel} level expertise with an overall score of ${overallScore.toFixed(1)}%. Your strongest area is ${topSkill.skill} with a score of ${topSkill.score.toFixed(1)}%. ${
    overallScore >= 80 
      ? 'You show excellent proficiency across your skill areas. Continue building on your strengths while exploring advanced techniques.'
      : overallScore >= 70
      ? 'You have a solid foundation with good growth potential. Focus on the improvement areas identified to advance your expertise.'
      : 'You demonstrate basic competency with significant room for growth. Concentrate on strengthening your foundational knowledge and practical application.'
  }`
}