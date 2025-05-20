import React from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import Timer from "./components/Timer";
import {GlobalStyle, Wrapper} from "./App.styles"
import { GameProvider, useGame } from './contexts/GameContext'
import { AnswerObject } from './contexts/GameContext'

const AppContent: React.FC = () => {
  const {
    questions,
    currentQuestionNumber,
    userAnswer,
    score,
    gameOver,
    timesOver,
    loading,
    totalQuestions,
    startTrivia,
    checkAnswer,
    nextQuestion
  } = useGame();

  const handleCheckAnswer = (answer: string) => {
    if (!gameOver) {
      checkAnswer(answer);
    }
  };

  const handleTimerTimesOver = () => {
    // This function is just a placeholder since we're using the GameContext
    // The actual timesOver state is managed by the GameContext
  };

  const handleRestartGame = () => {
    // This function is just a placeholder since we're using the GameContext
    // The actual restartGame state is managed by the GameContext
  };

  return (
    <Wrapper>
      <h1>Quiz</h1>
      {gameOver || timesOver ? (
        <button className="start" onClick={startTrivia}>
          Start
        </button>
      ) : null}
      {!gameOver && !timesOver && (
        <div className="score">
          Score: {score}
          {!timesOver && !gameOver && !loading ? (
            <Timer setTimesOver={handleTimerTimesOver} gameOver={gameOver} />
          ) : null}
        </div>
      )}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && !timesOver && (
        <QuestionCard 
          questionNr={currentQuestionNumber + 1} 
          totalQuestions={totalQuestions} 
          question={questions[currentQuestionNumber].question} 
          answers={questions[currentQuestionNumber].answers} 
          userAnswer={userAnswer} 
          callback={(answer: string) => handleCheckAnswer(answer)}
          gameOver={gameOver}
        />
      )}
      {!gameOver && !timesOver && !loading && userAnswer && currentQuestionNumber !== totalQuestions - 1 && (
        <button className='next' onClick={nextQuestion}>
          Next Question
        </button>
      )}
    </Wrapper>
  );
};

const App: React.FC = () => {
  return (
    <GameProvider>
      <GlobalStyle />
      <AppContent />
    </GameProvider>
  );
};

export default App;



