import React from 'react'

export default function AnswerButton({ question, answer, handleChange, isCompleted }) {
  const checkedClass = question.currentAnswer == answer ? 'checked' : ''

  return (
    <label className={`answer ${checkedClass}`}>
      <input
        type="radio"
        name={question.id}
        onChange={() => handleChange(question.id, answer)}
        disabled={isCompleted}
        checked={question.currentAnswer === answer}
      />
      {decodeURIComponent(answer)}
    </label>
  )
}
