import React from 'react'

import "./QuizMaster.css"

/// Quiz Master Reward
import Crown from '../../assets/crown.svg';

import { TiTick } from "react-icons/ti";
import { HiCursorClick } from "react-icons/hi";



const QuizMaster = ({translations}) => {
  return (
    <section id="mysterious-award" className='award-section' style={{borderColor: '#e7a604'}}>
        <div className="right">
            <div className="award-teaser">
                <h3 className='quizMaster'>{translations.masterLeftTitle}</h3>
                <p>{translations.masterLeftDescription}</p>
                <img src={Crown} alt="Award Teaser" id="laurel" />
            </div>
            
        </div>
        <div className="left">
                <div className="challenge-details masterDetails">
                    <h3>{translations.awardRightTitle} <HiCursorClick className='tick' /></h3>
                    <ul>
                        <li className='masterLi'>{translations.criteria1} <TiTick className='tick' /></li>
                        <li className='masterLi'>{translations.criteria2} <TiTick className='tick' /></li>
                        <li className='masterLi'>{translations.criteria3} <TiTick className='tick' /></li>
                        <li className='masterLi'>{translations.criteria4} <TiTick className='tick' /></li>
                    </ul>
                </div>
        </div>
    </section>
  )
}

export default QuizMaster