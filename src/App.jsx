import React, { useState } from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import Welcome from './views/Welcome'
import Settings from './views/Settings'

export default function App() {
  const [isContinued, setIsContinued] = useState(false)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function goNext() {
    if (isLoading) return
    setIsLoading(true)
    try {
      const res = await fetch('https://opentdb.com/api_category.php')
      if (!res.ok) throw new Error(res.status)
      const data = await res.json()
      setCategories(data.trivia_categories)
      setIsContinued(true)
      toast.dismiss()
    } catch (err) {
      toast.error(err.message)
    }
    setIsLoading(false)
  }

  return (
    <main>
      <SwitchTransition>
        <CSSTransition key={isContinued} timeout={300} classNames="fade">
          {isContinued ? <Settings categories={categories} /> : <Welcome isLoading={isLoading} goNext={goNext} />}
        </CSSTransition>
      </SwitchTransition>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  )
}
