import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Welcome from './views/Welcome'
import Quiz from './views/Quiz'

export default function App() {
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function startGame() {
    if (isLoading) return
    setIsLoading(true)

    const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple&encode=url3986')
    const data = await res.json()

    const questions = data.results.map(question => ({
      ...question,
      id: uuidv4(),
      currentAnswer: ''
    }))

    setQuestions(questions)
    setIsStarted(true)
    setIsLoading(false)
  }

  function handleAnswerChange(id, currentAnswer) {
    setQuestions(prevQuestion =>
      prevQuestion.map(question => {
        return question.id === id ? { ...question, currentAnswer } : question
      })
    )
  }

  function backToWelcome() {
    setIsStarted(false)
  }

  const view = isStarted ? (
    <Quiz questions={questions} handleChange={handleAnswerChange} backToWelcome={backToWelcome} />
  ) : (
    <Welcome startGame={startGame} isLoading={isLoading} />
  )

  return <main>{view}</main>
}
