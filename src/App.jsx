import React, { useState } from 'react'

import Welcome from './views/Welcome'
import Settings from './views/Settings'

export default function App() {
  const [isContinued, setIsContinued] = useState(false)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function goNext() {
    if (isLoading) return
    setIsLoading(true)

    const res = await fetch('https://opentdb.com/api_category.php')
    const data = await res.json()

    setCategories(data.trivia_categories)
    setIsLoading(false)
    setIsContinued(true)
  }

  return <main>{isContinued ? <Settings categories={categories} /> : <Welcome isLoading={isLoading} goNext={goNext} />}</main>
}
