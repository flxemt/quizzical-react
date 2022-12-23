import React from 'react'

export default function Welcome(props) {
  return (
    <div className="container-small">
      <h1 className="welcome-title">Quizzical</h1>
      <p className="welcome-text">Test your knowledge</p>
      <button className="btn" onClick={props.goNext}>
        {props.isLoading ? <img src="loader.svg" alt="loading" /> : 'Start quiz'}
      </button>
    </div>
  )
}
