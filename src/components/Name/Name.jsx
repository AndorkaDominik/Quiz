import React from 'react'
import blur1 from '../../assets/Blur/blur-1.svg';


const Name = ({handleNameSubmit}) => {
  return (
        <div className="wrapper height">
          <div className='container'>
          <h1 className='language-title'>Welcome</h1>
          <p>Please, enter your nickname to start the session.</p>
          <form onSubmit={handleNameSubmit}>
            <input
            type="text"
            name="name" 
            placeholder="Enter your name"
            required
            />
            <button type="submit">Start Quiz</button>
          </form>
          <img src={blur1} className='blur1' alt="" />
        </div>
      </div>
  )
}

export default Name