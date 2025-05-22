import React, {useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import Timer from "./components/Timer";
import {fetchQuizQuestions} from './API'
import {Difficulty, QuestionsState} from './API'
import {GlobalStyle, Wrapper} from "./App.styles"
import { log } from 'console';


export type AnswerObject = {
  question:string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}


enum ScreenState {
  Start = 'start',
  Quiz = 'quiz',
  Gameover = 'gameover',
}

const MOTIVATIONAL_MESSAGES = [
  (score: number, total: number) => score === total ? 'Outstanding! You got every question right.' : null,
  (score: number, total: number) => score >= total * 0.7 ? 'Well done! You scored high.' : null,
  (score: number, total: number) => score >= total * 0.4 ? 'Not bad! Keep practicing to improve.' : null,
  () => "Don't give up! Try again to beat your score.",
];

const App = () => {
const [loading,setLoading] = useState(false)
const [questions,setQuestions] = useState<QuestionsState[]>([])
const [number,setNumber] = useState(0)
const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([])
const [score,setScore] = useState(0)
const [gameOver, setGameOver]= useState(true)
const [timesOver, setTimesOver] = useState(false)
const [screen, setScreen] = useState<ScreenState>(ScreenState.Start);
const TOTAL_QUESTIONS = 10

 const startTrivia = async () => {
  setLoading(true)
  setGameOver(false)
  setScreen(ScreenState.Quiz);
  const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.MEDIUM)
  setQuestions(newQuestions)
  setScore(0)
  setUserAnswers([])
  setNumber(0)
  setLoading(false)
  setTimesOver(false)
 }

 const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
  if (number === TOTAL_QUESTIONS-1) {
    setTimeout(()=>{
      setGameOver(true);
      setScreen(ScreenState.Gameover);
    },1000)
  }
    
if (!gameOver) {
  const answer = e.currentTarget.value;
  const correct = questions[number].correct_answer === answer
  if (correct)  setScore(prev=>prev+1)
  const answerObject = {
    question: questions[number].question,
    answer,
    correct,
    correctAnswer: questions[number].correct_answer
  }
  setUserAnswers(prev=> [...prev,answerObject])

  
}

 }
 const nextQuestion = () => {
const nextQuestion = number+1;
console.log(nextQuestion)
if (nextQuestion === TOTAL_QUESTIONS || timesOver) {
  setGameOver(true)
  setScreen(ScreenState.Gameover)
}
else {
  setNumber(nextQuestion)
}
 }
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quizzing</h1>
        {/* Start Screen */}
        {screen === ScreenState.Start && (
          <div className='start-screen'>
            <h2>Welcome to the Quiz!</h2>
            <p>Test your knowledge with 10 fun questions. Try to get the highest score possible. Good luck!</p>
            <button className='start' onClick={startTrivia}>Start Quiz</button>
          </div>
        )}
        {/* Quiz Screen */}
        {screen === ScreenState.Quiz && (
          <>
            <div className='score'>Score: {score}
              {!timesOver && !gameOver && !loading ? <Timer setTimesOver={(over) => { setTimesOver(over); if (over) { setGameOver(true); setScreen(ScreenState.Gameover); } }} gameOver={gameOver} /> : null}
            </div>
            {loading && <p>Loading Questions...</p>}
            {!loading && !gameOver && !timesOver &&
              <QuestionCard
                questionNr={number + 1}
                totalQuestions={TOTAL_QUESTIONS}
                question={questions[number].question}
                answers={questions[number].answers}
                userAnswer={userAnswers ? userAnswers[number] : undefined}
                callback={checkAnswers}
              />}
            {!gameOver && !timesOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 &&
              <button className='next' onClick={nextQuestion}>Next Question</button>}
          </>
        )}
        {/* Game Over Screen */}
        {screen === ScreenState.Gameover && (
          <div className='gameover-screen'>
            <h2>Game Over!</h2>
            <p>Your score is: {score} out of {TOTAL_QUESTIONS}</p>
            <p>
              {MOTIVATIONAL_MESSAGES.map(fn => fn(score, TOTAL_QUESTIONS)).find(Boolean)}
            </p>
            <button className='start' onClick={startTrivia}>Play Again?</button>
          </div>
        )}
      </Wrapper>
    </>
  );
}

export default App;







