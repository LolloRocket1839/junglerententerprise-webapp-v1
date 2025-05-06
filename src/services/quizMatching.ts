import { supabase } from '../lib/supabase';
import { createHash } from 'crypto';

interface QuizContent {
  id: string;
  difficulty_vector: number[];
  knowledge_domains: Record<string, number>;
  pedagogical_attributes: number[];
}

interface StudentQuizProfile {
  id: string;
  knowledge_state: number[];
  learning_patterns: {
    response_times: number[];
    concept_strengths: Record<string, number>;
    concept_gaps: Record<string, number>;
    historical_performance: any[];
  };
  learning_preferences: number[];
}

interface QuizAssignment {
  student_id: string;
  quiz_id: string;
  affinity_score: number;
  assignment_token: string;
}

// Constants for affinity calculation
const ALPHA = 0.4; // Knowledge alignment weight
const BETA = 0.3;  // Gap coverage weight
const GAMMA = 0.2; // Progressive difficulty weight
const DELTA = 0.1; // Learning style match weight

// Utility function to calculate cosine similarity
function cosineSimilarity(vec1: number[], vec2: number[]): number {
  const dotProduct = vec1.reduce((sum, val, i) => sum + val * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, val) => sum + val * val, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, val) => sum + val * val, 0));
  return dotProduct / (magnitude1 * magnitude2);
}

// Calculate weighted overlap between concept gaps and quiz knowledge domains
function calculateGapCoverage(
  conceptGaps: Record<string, number>,
  knowledgeDomains: Record<string, number>
): number {
  let totalWeight = 0;
  let totalOverlap = 0;

  for (const [domain, weight] of Object.entries(knowledgeDomains)) {
    const gap = conceptGaps[domain] || 0;
    totalOverlap += gap * weight;
    totalWeight += weight;
  }

  return totalWeight > 0 ? totalOverlap / totalWeight : 0;
}

// Calculate progressive difficulty based on historical performance
function calculateProgressiveDifficulty(
  historicalPerformance: any[],
  difficultyVector: number[]
): number {
  if (historicalPerformance.length === 0) return 0.5;

  const recentPerformance = historicalPerformance.slice(-5);
  const avgPerformance = recentPerformance.reduce((sum, p) => sum + p.score, 0) / recentPerformance.length;
  
  // Calculate difficulty adjustment factor
  const difficultyAdjustment = Math.min(Math.max(avgPerformance - 0.5, -0.2), 0.2);
  
  // Apply adjustment to difficulty vector
  const adjustedDifficulty = difficultyVector.map(d => Math.min(Math.max(d + difficultyAdjustment, 0), 1));
  
  return adjustedDifficulty.reduce((sum, d) => sum + d, 0) / adjustedDifficulty.length;
}

// Calculate learning style compatibility
function calculateLearningStyleMatch(
  preferences: number[],
  pedagogicalAttributes: number[]
): number {
  return cosineSimilarity(preferences, pedagogicalAttributes);
}

// Main affinity calculation function
export async function calculateAffinity(
  studentId: string,
  quizId: string
): Promise<number> {
  // Fetch student profile and quiz content
  const { data: studentProfile } = await supabase
    .from('student_quiz_profiles')
    .select('*')
    .eq('student_id', studentId)
    .single();

  const { data: quizContent } = await supabase
    .from('quiz_content')
    .select('*')
    .eq('id', quizId)
    .single();

  if (!studentProfile || !quizContent) {
    throw new Error('Student profile or quiz content not found');
  }

  // Calculate individual components
  const knowledgeAlignment = cosineSimilarity(
    studentProfile.knowledge_state,
    Object.values(quizContent.knowledge_domains)
  );

  const gapCoverage = calculateGapCoverage(
    studentProfile.learning_patterns.concept_gaps,
    quizContent.knowledge_domains
  );

  const progressiveDifficulty = calculateProgressiveDifficulty(
    studentProfile.learning_patterns.historical_performance,
    quizContent.difficulty_vector
  );

  const learningStyleMatch = calculateLearningStyleMatch(
    studentProfile.learning_preferences,
    quizContent.pedagogical_attributes
  );

  // Calculate final affinity score
  const affinityScore = 
    ALPHA * knowledgeAlignment +
    BETA * gapCoverage +
    GAMMA * progressiveDifficulty +
    DELTA * learningStyleMatch;

  return Math.min(Math.max(affinityScore, 0), 1);
}

// Generate blind assignment token
function generateAssignmentToken(studentId: string, quizId: string): string {
  const hash = createHash('sha256');
  hash.update(`${studentId}-${quizId}-${Date.now()}`);
  return hash.digest('hex');
}

// Create quiz assignment
export async function createQuizAssignment(
  studentId: string,
  quizId: string
): Promise<QuizAssignment> {
  const affinityScore = await calculateAffinity(studentId, quizId);
  const assignmentToken = generateAssignmentToken(studentId, quizId);

  const { data, error } = await supabase
    .from('quiz_assignments')
    .insert({
      student_id: studentId,
      quiz_id: quizId,
      affinity_score: affinityScore,
      assignment_token: assignmentToken,
      status: 'pending'
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Get student's quiz assignments
export async function getStudentAssignments(studentId: string): Promise<QuizAssignment[]> {
  const { data, error } = await supabase
    .from('quiz_assignments')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}

// Update assignment status
export async function updateAssignmentStatus(
  assignmentToken: string,
  status: 'pending' | 'completed' | 'expired'
): Promise<void> {
  const { error } = await supabase
    .from('quiz_assignments')
    .update({ status })
    .eq('assignment_token', assignmentToken);

  if (error) throw error;
} 