import React from 'react'
import blur1 from '../../assets/Blur/blur-1.svg';

import './Category.css'

/// Components
import Footer from '../Footer/Footer'
import Award from '../Award/Award';
import QuizMaster from '../QuizMaster/QuizMaster';
import LatestQuiz from '../Latest/Latest'; 



import { GoArrowRight } from "react-icons/go";

// Category SVGs
import Cinema from '../../assets/Category/popcorn.svg';
import Tech from '../../assets/Category/tech.svg';
import Math from '../../assets/Category/math.svg';
import Sport from '../../assets/Category/sport.svg';
import Knowledge from '../../assets/Category/knowledge.svg';
import Science from '../../assets/Category/science.svg';
import Geography from '../../assets/Category/geo.svg';
import Music from '../../assets/Category/microphone1.svg';
import History from '../../assets/Category/history.svg';
import Architecture from '../../assets/Category/architecture.svg';
import Climate from '../../assets/Category/climate.svg';
import Literature from '../../assets/Category/literature.svg';
import Fashion from '../../assets/Category/fashion.svg';
import Vehicle from '../../assets/Category/vehicle.svg';
import Bugs from '../../assets/Category/bug.svg';
import Fish from '../../assets/Category/fish.svg';
import Food from '../../assets/Category/food.svg';
import MakeUp from '../../assets/Category/makeUp.svg';

// Logo
import Logo from '../../assets/logo.svg'

const Category = ({quizTitle, name, handleCategorySelect,  handleLanguageChange, currentLanguage, translations, setShowProfile,  setCategory, setShowCategory}) => {

  const storedName = localStorage.getItem("name");
  const storedLanguage = localStorage.getItem("language");
  const storedStatus = localStorage.getItem('quizMaster');

  const handleProfileClick = () => {
    console.log("Opening profile...");
    setShowProfile(true);
    setShowCategory(false);
  };

  return (
    <div className='category-container relative'>
       
        <nav>
        <h1 className='language-title'><img src={Logo} alt="" id='nav-img' /> <span>{quizTitle}</span> </h1>
        <div className="btn-container">
          <select  value={storedLanguage ? storedLanguage : currentLanguage} onChange={handleLanguageChange}>
            <option value="HUN">Hun</option>
            <option value="ENG">Eng</option>
            <option value="GER">Ger</option>
          </select>
          
          <button onClick={handleProfileClick}>{translations.profileTitle}</button>
        </div>
        </nav>
        <div className="content-wrapper">
        <h3>Hello, {storedName ? storedName : name} 👋</h3>
        {storedStatus ? <h2 className='quizMaster'>{translations.quizMasterTitle}</h2> : <h2>{translations.playTitle}</h2>}
        
          <div className="bg-blur">
            <img src={blur1} alt="" style={{width:610, height:730}} />
            <img src={blur1} alt="" style={{width:610, height:730}} />
          </div>
          <div className="best" style={storedStatus ? {borderColor:'#e7a604'} : {}}>
            <div className='left'>
            <h2>{translations.bestTitle}</h2>
            </div>

            <div  className="right relative">
                <img src={blur1} className='blur1' style={{width:610, height:730}} alt="blur img" />
                <img src={blur1} className='blur1' style={{width:610, height:730, left: 300}} alt="blur img" />

              <button className='category-card' onClick={() => handleCategorySelect("cinema")}>
                <div className='card-title'>
                  <img src={Cinema} alt="" />
                  <h4>{translations.cinema}</h4>
                </div>
                <p>{translations.bestButton} <GoArrowRight /></p>
              </button>
              <button className='category-card' onClick={() => handleCategorySelect("sports")}>
                <div className='card-title'>
                  <img src={Sport} alt="" />
                  <h4>{translations.sports}</h4>
                </div>
                <p>{translations.bestButton} <GoArrowRight /></p>
              </button>
            </div>
          </div>



          <h3>Recently Added</h3>
          <div className='single-wrapper'>
            <button className='single' onClick={() => handleCategorySelect("tech")}>
              <img src={Tech} alt="" />
              <h4>{translations.tech}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("science")}>
              <img src={Science} alt="" />
              <h4>{translations.science}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("architecture")}>
              <img src={Architecture} alt="" />
              <h4>{translations.architecture}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("climate")}>
              <img src={Climate} alt="" />
              <h4>{translations.climate}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("makeUp")}>
              <img src={MakeUp} alt="" />
              <h4>{translations.makeUp}</h4>
            </button>
          </div>
          <h3>Explore</h3>
          <div className='single-wrapper'>
            <button className='single' onClick={() => handleCategorySelect("math")}>
              <img src={Math} alt="" />
              <h4>{translations.math}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("knowledge")}>
              <img src={Knowledge} alt="" />
              <h4>{translations.knowledge}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("music")}>
              <img src={Music} alt="" />
              <h4>{translations.music}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("geography")}>
              <img src={Geography} alt="" />
              <h4>{translations.geography}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("history")}>
              <img src={History} alt="" />
              <h4>{translations.history}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("literature")}>
              <img src={Literature} alt="" />
              <h4>{translations.literature}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("fashion")}>
              <img src={Fashion} alt="" />
              <h4>{translations.fashion}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("vehicle")}>
              <img src={Vehicle} alt="" />
              <h4>{translations.vehicle}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("bugs")}>
              <img src={Bugs} alt="" />
              <h4>{translations.bugs}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("fish")}>
              <img src={Fish} alt="" />
              <h4>{translations.fish}</h4>
            </button>
            <button className='single' onClick={() => handleCategorySelect("food")}>
              <img src={Food} alt="" />
              <h4>{translations.food}</h4>
            </button>
          </div>
          {storedStatus ? <QuizMaster translations={translations} /> : <Award translations={translations}/>}
        </div>

          <br />
        



        <Footer></Footer>

      </div>
  )
}

export default Category