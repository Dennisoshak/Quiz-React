import React from 'react'
import { AnswerObject } from '../contexts/GameContext'
import { Wrapper, ButtonWrapper } from './QuestionCard.styles';

interface Props {
  questionNr: number;
  question: string;
  answers: string[];
  callback: (answer: string) => void;
  userAnswer: AnswerObject | undefined;
  totalQuestions: number;
  gameOver: boolean;
}
const QuestionCard: React.FC<Props> = ({ question, answers, callback, userAnswer, questionNr, totalQuestions, gameOver }) => {
  const handleCheckAnswer = (answer: string) => {
    if (!gameOver) {
      callback(answer);
    }
  };

  return (
    <Wrapper>
      <p className='number'>Question: {questionNr} / {totalQuestions}</p>
      <span dangerouslySetInnerHTML={{__html: question}} />
      <div>
        {answers.map((answer) => (
          <ButtonWrapper 
            key={answer}
            correct={userAnswer?.correctAnswer === answer}
            userClicked={userAnswer?.answer === answer}
            disabled={!!userAnswer}
            onClick={() => handleCheckAnswer(answer)}
          >
            <span dangerouslySetInnerHTML={{__html: answer}} />
          </ButtonWrapper>
        ))}
      </div>
    </Wrapper>
  );
}

export default QuestionCard;