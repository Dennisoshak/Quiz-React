import React, { createContext, useContext, useState, useEffect } from 'react';
import { QuestionsState, Difficulty, fetchQuizQuestions } from '../API';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

interface GameContextType {
  questions: QuestionsState[];
  number: number;
  userAnswers: AnswerObject[];
  score: number;
  gameOver: boolean;
  timesOver: boolean;
  loading: boolean;
  totalQuestions: number;
  difficulty: Difficulty;
  startTrivia: () => Promise<void>;
  checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void;
  nextQuestion: () => void;
  resetGame: () => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (number === TOTAL_QUESTIONS - 1) {
      setTimeout(() => {
        setGameOver(true);
      }, 1000);
    }

    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prev => prev + 1);

      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers(prev => [...prev, answerObject]);
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
        number,
        userAnswers,
        score,
        gameOver,
        timesOver,
        loading,
        totalQuestions: TOTAL_QUESTIONS,
        difficulty,
        startTrivia,
        checkAnswer,
        nextQuestion,
        resetGame,
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

