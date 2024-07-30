import React from 'react'
import "./Award.css"

import Laurel from '../../assets/laurel.svg'

const Award = ({translations}) => {
  return (
    <section id="mysterious-award" className='award-section'>
        <div className="right">
            <div className="award-teaser">
                <h3>{translations.awardLeftTitle}</h3>
                <p>{translations.awardLeftDescription}</p>
                <img src={Laurel} alt="Award Teaser" id="laurel" />
            </div>
            
        </div>
        <div className="left">
                <div className="challenge-details">
                    <h3>{translations.awardRightTitle}</h3>
                    <ul>
                        <li>{translations.criteria1}</li>
                        <li>{translations.criteria2}</li>
                        <li>{translations.criteria3}</li>
                        <li>{translations.criteria4}</li>
                    </ul>
                </div>
        </div>
    </section>

  )
}

export default Award