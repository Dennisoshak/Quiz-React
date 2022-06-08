import React, {useState} from 'react';
import './App.css';
import QuestionCard from './components/QuestionCard';
import Timer from "./components/Timer";
import {fetchQuizQuestions} from './API'
import {Difficulty, QuestionsState} from './API'
import {GlobalStyle, Wrapper} from "./App.styles"


export type AnswerObject = {
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
const [timesOver, setTimesOver] = useState(false)
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
setTimesOver(false)
 }

 const checkAnswers = (e: React.MouseEvent<HTMLButtonElement>) => {
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
if (nextQuestion === TOTAL_QUESTIONS || timesOver) {
  setGameOver(true)
}
else {
  setNumber(nextQuestion)
}
 }
  return (
    <>
<GlobalStyle />
<Wrapper>
  <h1>React Quiz</h1>
  {gameOver || timesOver || userAnswers.length === TOTAL_QUESTIONS ? (
  <button className='start'onClick={startTrivia}>Start</button>
  ): null}
  {!gameOver && <div className='score'>Score: {score}{!timesOver?<Timer setTimesOver={setTimesOver}/>:<p>Time's Over</p>}</div>}
  {loading &&<p>Loading Questions...</p>}
 {!loading && !gameOver && !timesOver && <QuestionCard questionNr={number+1} totalQuestions={TOTAL_QUESTIONS} question={questions[number].question} answers={questions[number].answers} userAnswer={userAnswers? userAnswers[number] : undefined} callback={checkAnswers}/> }
 {!gameOver && !timesOver && !loading && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS-1 &&
  <button className='next' onClick={nextQuestion}>Next Question</button>}
    </Wrapper>
    </>
  );
}

export default App;
