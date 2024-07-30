import React from 'react'
import blur1 from '../../assets/Blur/blur-1.svg';

import './Language.css'

const Language = ({name, title, beforeC, creator, hun, eng, ger, selectLanguage}) => {
  return (
    <div className="wrapper height">
        <div className='container language-container'>
          <h1 className='language-title'>Hello, <br />{name}</h1>
          <h3 className='language-title'>{title}</h3>
          <button onClick={() => selectLanguage('HUN')}>{hun}</button>
          <button onClick={() => selectLanguage('ENG')}>{eng}</button>
          <button onClick={() => selectLanguage('GER')}>{ger}</button>
          <img src={blur1} className='blur1' alt="" />
        </div>
      </div>
  )
}

export default Language