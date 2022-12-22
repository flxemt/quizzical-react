import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Quiz from './Quiz'

export default function Settings(props) {
  const [isStarted, setIsStarted] = useState(false)
  const [questions, setQuestions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const [settings, setSettings] = useState({
    questionsCount: 5,
    category: 'any',
    difficulty: 'any'
  })
  console.log(settings)

  function getQueryParam(setting) {
    return setting !== 'any' ? setting : ''
  }

  function getApiURL() {
    const count = getQueryParam(settings.questionsCount)
    const category = getQueryParam(settings.category)
    const difficulty = getQueryParam(settings.difficulty)

    return `https://opentdb.com/api.php?amount=${count}&category=${category}&difficulty=${difficulty}&type=multiple&encode=url3986`
  }

  async function startGame(event) {
    event.preventDefault()
    if (isLoading) return
    setIsLoading(true)

    const res = await fetch(getApiURL())
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

  function handleSettingsChange(event) {
    const { name, value } = event.target
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: value
    }))
  }

  function handleAnswerChange(id, currentAnswer) {
    setQuestions(prevQuestion =>
      prevQuestion.map(question => {
        return question.id === id ? { ...question, currentAnswer } : question
      })
    )
  }

  function backToSettings() {
    setIsStarted(false)
  }

  return !isStarted ? (
    <div className="container settings-container">
      <h2 className="settings-heading">Choose your settings:</h2>
      <form>
        <label htmlFor="questions-count">Number of Questions:</label>
        <select name="questionsCount" id="questionsCount" value={settings.questionsCount} onChange={handleSettingsChange}>
          {new Array(10).fill(null).map((item, index) => (
            <option value={(index + 1) * 5}>{(index + 1) * 5}</option>
          ))}
        </select>
        <label htmlFor="category">Category:</label>
        <select name="category" id="category" value={settings.category} onChange={handleSettingsChange}>
          <option value="any">Any Category</option>
          {props.categories?.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <label htmlFor="difficulty">Difficulty:</label>
        <select name="difficulty" id="difficulty" defaultValue={settings.difficulty} onChange={handleSettingsChange}>
          <option value="any">Any Difficulty</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button className="btn" onClick={startGame}>
          {isLoading ? 'Loading...' : 'Start quiz'}
        </button>
      </form>
    </div>
  ) : (
    <Quiz questions={questions} handleChange={handleAnswerChange} backToSettings={backToSettings} />
  )
}
