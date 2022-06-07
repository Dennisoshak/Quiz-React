import React, {useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions} from './API'
import {Difficulty, QuestionState} from './API'

type AnswerObject = {
  question:string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}


const App = () => {
const [loading,setLoading] = useState(false)
const [questions,setQuestions] = useState<QuestionState[]>([])
const [number,setNumber] = useState(0)
const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([])
const [score,setScore] = useState(0)
const [gameOver, setGameOver]= useState(true)
const TOTAL_QUESTIONS = 10

console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))

 const startTrivia = async () => {
setLoading(true)
setGameOver(false)
const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.MEDIUM)
setQuestions(newQuestions)
setScore(0)
setUserAnswers([])
setNumber(0)
setLoading(false)
 }

 const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {

 }
 
  return (

<div>
  <h1>React Quiz</h1>
  <button onClick={startTrivia}>Start</button>
  <p className='score'>Score:</p>
  <p>Loading Questions...</p>
  {/* <QuestionCard questionNr={number+1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers? userAnswers[number] : undefined} callback={checkAnswer}/> */}
  {/* <button className='next' onClick={nextQuestion}>Next Question</button> */}
    </div>
  );
}

export default App;
