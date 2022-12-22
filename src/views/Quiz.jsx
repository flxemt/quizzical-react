import React, { useState } from 'react'
import Question from '../components/Question'

export default function Quiz(props) {
  const [isCompleted, setIsCompleted] = useState(false)

  const questions = props.questions.map(question => {
    const isAnswerCorrect = question.correct_answer === question.currentAnswer

    return (
      <Question
        key={question.id}
        question={question}
        handleChange={props.handleChange}
        isAnswerCorrect={isAnswerCorrect}
        isCompleted={isCompleted}
      />
    )
  })

  function checkAnswers() {
    if (isCompleted) {
      props.backToSettings()
    }

    setIsCompleted(true)
  }

  const correctsCount = props.questions.filter(question => question.correct_answer === question.currentAnswer).length
  const totalQuestions = props.questions.length

  return (
    <div className="container">
      {questions}
      <div className="result">
        {isCompleted && (
          <p>
            You scored {correctsCount}/{totalQuestions} correct answers
          </p>
        )}
        <button className="btn btn-answer" onClick={checkAnswers}>
          {isCompleted ? 'Play again' : 'Check answers'}
        </button>
      </div>
    </div>
  )
}
