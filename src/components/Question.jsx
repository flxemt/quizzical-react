import React, { useState, useEffect } from 'react'
import AnswerButton from './AnswerButton'

export default function Question({ handleChange, question, isCompleted, isAnswerCorrect }) {
  const [allAnswers, setAllAnswers] = useState([])

  useEffect(() => {
    const randomIndex = Math.round(Math.random() * question.incorrect_answers.length)
    const allAnswers = question.incorrect_answers
    allAnswers.splice(randomIndex, 0, question.correct_answer)
    setAllAnswers(allAnswers)
  }, [])

  const answerButtons = allAnswers.map((answer, index) => (
    <AnswerButton key={index} answer={answer} question={question} handleChange={handleChange} isCompleted={isCompleted} />
  ))

  let answerClass = isAnswerCorrect ? 'correct' : 'incorrect'

  return (
    <div className={`quiz-question ${isCompleted ? answerClass : ''}`}>
      <h3 className="question-title">{decodeURIComponent(question.question)}</h3>
      <div className="buttons">{answerButtons}</div>
    </div>
  )
}
