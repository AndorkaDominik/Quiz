import React from 'react'
import blur1 from '../../assets/Blur/blur-1.svg';

import './Language.css'

const Language = ({name, title, hun, eng, ger, selectLanguage, setShowCategory}) => {
  return (
    <div className="wrapper height">
        <div className='container language-container'>
          <h1 className='language-title'>Hello, <br />{name}</h1>
          <h3 className='language-title'>{title}</h3>
          <button onClick={() => {selectLanguage('HUN'); setShowCategory(true)}}>{hun}</button>
          <button onClick={() => {selectLanguage('ENG'); setShowCategory(true)}}>{eng}</button>
          <button onClick={() => {selectLanguage('GER'); setShowCategory(true)}}>{ger}</button>
          <img src={blur1} className='blur1' alt="" />
        </div>
      </div>
  )
}

export default Language