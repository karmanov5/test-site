export interface NotebookBlockData {
  title: string;
  text: string[];
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  notebook?: NotebookBlockData; // If present, this section requires writing in the notebook
  imagePlaceholder?: string; // Concept for where an image would go
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number; // Index of the correct option
}

export type LessonState = 'intro' | 'learning' | 'quiz' | 'results';
