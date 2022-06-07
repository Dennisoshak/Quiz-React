import React, {useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import {fetchQuizQuestions} from './API'
import {Difficulty, QuestionsState} from './API'

type AnswerObject = {
  question:string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}


const App = () => {
const [loading,setLoading] = useState(false)
const [questions,setQuestions] = useState<QuestionsState[]>([])
const [number,setNumber] = useState(0)
const [userAnswers,setUserAnswers] = useState<AnswerObject[]>([])
const [score,setScore] = useState(0)
const [gameOver, setGameOver]= useState(true)
const TOTAL_QUESTIONS = 10

console.log(fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY))

 const startTrivia = async () => {
setLoading(true)
setGameOver(false)
const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS,Difficulty.EASY)

setQuestions(newQuestions)
console.log(questions)
setScore(0)
setUserAnswers([])
setNumber(0)
setLoading(false)
 }

 const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {

 }
 const nextQuestion = () => {

 }
  return (

<div>
  <h1>React Quiz</h1>
  {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
  <button onClick={startTrivia}>Start</button>
  ): null}
  {!gameOver && <p className='score'>Score:</p>}
  {loading &&<p>Loading Questions...</p>}
 {!loading && !gameOver && <QuestionCard questionNr={number+1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers? userAnswers[number] : undefined} callback={checkAnswers}/> }
 {!gameOver && !loading && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS-1 &&
  <button className='next' onClick={nextQuestion}>Next Question</button>}
    </div>
  );
}

export default App;
