import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuestionsState, Difficulty, fetchQuizQuestions } from '../API';
import { ReactNode } from 'react';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

interface GameContextProps {
  children: ReactNode;
}

export interface GameStateContextType {
  questions: QuestionsState[];
  currentQuestionNumber: number;
  userAnswer: AnswerObject | undefined;
  score: number;
  gameOver: boolean;
  loading: boolean;
  difficulty: Difficulty;
  startTrivia: () => Promise<void>;
  checkAnswer: (answer: string) => void;
  nextQuestion: () => void;
  resetGame: () => void;
  timesOver: boolean;
  totalQuestions: number;
}

const GameContext = createContext<GameStateContextType | undefined>(undefined);

export const GameProvider: React.FC<GameContextProps> = ({ children }) => {
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [timesOver, setTimesOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const TOTAL_QUESTIONS = 10;

  const startTrivia = async () => {
    try {
      setLoading(true);
      setGameOver(false);
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, difficulty);
      setQuestions(newQuestions);
      setScore(0);
      setUserAnswers([]);
      setNumber(0);
      setLoading(false);
      setTimesOver(false);
    } catch (error) {
      console.error('Error fetching questions:', error);
      setLoading(false);
      setGameOver(true);
    }
  };

  const checkAnswer = (answer: string) => {
    if (!gameOver) {
      const correct = answer === questions[number].correct_answer;
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, answerObject]);
      if (correct) setScore(prev => prev + 1);
      if (number === TOTAL_QUESTIONS - 1) {
        setTimeout(() => {
          setGameOver(true);
        }, 1000);
      }
    }
  };

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS || timesOver) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  };

  const resetGame = () => {
    setQuestions([]);
    setNumber(0);
    setUserAnswers([]);
    setScore(0);
    setGameOver(true);
    setTimesOver(false);
    setLoading(false);
  };

  return (
    <GameContext.Provider
      value={{
        questions,
        currentQuestionNumber: number,
        userAnswer: userAnswers[number] || null,
        score,
        gameOver,
        loading,
        difficulty,
        startTrivia,
        checkAnswer,
        nextQuestion,
        resetGame,
        timesOver,
        totalQuestions: TOTAL_QUESTIONS
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

