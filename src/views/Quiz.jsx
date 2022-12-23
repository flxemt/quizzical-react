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

  if (totalQuestions === 0) {
    return (
      <div className="container-small">
        <h2>No questions found based on your settings</h2>
        <button className="btn btn-small" onClick={props.backToSettings} style={{ marginTop: '0.5em', alignSelf: 'center' }}>
          Go back
        </button>
      </div>
    )
  }

  return (
    <div className="container">
      {questions}
      <div className="result">
        {isCompleted && (
          <p>
            You scored {correctsCount}/{totalQuestions} correct answers
          </p>
        )}
        <button className="btn btn-small" onClick={checkAnswers}>
          {isCompleted ? 'Play again' : 'Check answers'}
        </button>
      </div>
    </div>
  )
}
