import React, { useState, useRef, useEffect } from 'react';
import './quiz.css';
import { categories, translations } from '../../assets/data';


/// Components
import Name from '../Name/Name';
import Language from '../Language/Language';
import Category from '../Category/Category';
import Profile from '../Profile/Profile';

/// Quiz Master Reward
import Crown from '../../assets/crown.svg';


const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(null);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [language, setLanguage] = useState(null);
  const [category, setCategory] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [incorrectAnswers, setIncorrectAnswers] = useState([]);
  const [name, setName] = useState('');
  const [quizMaster, setQuizMaster] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);

  const option_array = [Option1, Option2, Option3, Option4];

  const selectLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    scrollToTop();
  };

  const getRandomQuestions = (questions, maxQuestions) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, maxQuestions);
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      const selectedAnswer = question[`option${ans}`];
      const correctAnswer = question[`option${question.ans}`];

      if (question.ans === ans) {
        e.target.classList.add("correct");
        setLock(true);
        setScore(prev => prev + 1);
      } else {
        e.target.classList.add("wrong");
        setLock(true);
        option_array[question.ans - 1].current.classList.add("correct");

        setIncorrectAnswers(prev => {
          const newIncorrectAnswer = {
            question: question.question,
            selected: selectedAnswer,
            correct: correctAnswer
          };
          return [...prev, newIncorrectAnswer];
        });
      }
    }
  };
  const next = () => {
    if (index === selectedQuestions.length - 1) {
      setResult(true);

      const categoryStats = JSON.parse(localStorage.getItem('categoryStats')) || {};
      const categoryData = categoryStats[category] || { lastScore: 0, bestScore: 0, attempts: 0 };
      categoryData.lastScore = score;
      categoryData.bestScore = Math.max(categoryData.bestScore, score);
      categoryData.attempts += 1;
      categoryStats[category] = categoryData;
      localStorage.setItem('categoryStats', JSON.stringify(categoryStats));

      if (score === selectedQuestions.length) {
        localStorage.setItem('quizMaster', 'true');
        setQuizMaster(true);
      }
      return;
    }
    if (lock) {
      const nextIndex = index + 1;
      setIndex(nextIndex);
      setQuestion(selectedQuestions[nextIndex]);
      setLock(false);
      option_array.forEach(option => {
        if (option.current) {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        }
      });
      
    } 
  };

  const reset = () => {
    localStorage.setItem('latestQuiz', JSON.stringify({
      score: score,
      incorrectAnswers: incorrectAnswers,
      category: category,
      currentQuestionIndex: index
    }));

    setIndex(0);
    setQuestion(null);
    setScore(0);
    setLock(false);
    setResult(false);
    setCategory("");
    setShowCategory(true)
    scrollToTop();
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();
    const enteredName = e.target.elements.name.value; 
    localStorage.setItem('name', enteredName);
    setName(enteredName); 
    if (enteredName.trim() !== '') {
      setLanguage(null);
    }
  };

  const handleNameChange = () => {
    setName('');
    localStorage.removeItem('name');
    setLanguage('')
    localStorage.removeItem('language');
    setQuizMaster(false);
    localStorage.removeItem('quizMaster');
    localStorage.removeItem('latestQuiz');
    localStorage.removeItem('categoryStats');
  }

  const handleLanguageChange = (e) => {
    const newLanguage = e.target.value;
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };


  const handleCategorySelect = (category) => {
    setCategory(category);
    const allQuestions = categories[category][language];
    const questions = getRandomQuestions(allQuestions, 5);
    setSelectedQuestions(questions);
    setQuestion(questions[0]);
    setIndex(0);
    setIncorrectAnswers([]);
    setShowCategory(false)
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
    });
  };

  const storedName = localStorage.getItem('name');
  const storedLanguage = localStorage.getItem('language');
  const storedQuizMaster = localStorage.getItem('quizMaster');

   useEffect(() => {
    const storedName = localStorage.getItem('name');
    const storedLanguage = localStorage.getItem('language');
    const storedQuizMaster = localStorage.getItem('quizMaster');

    if (storedName) setName(storedName);
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedQuizMaster === 'true') setQuizMaster(true);
  }, [name, language, quizMaster]);

  useEffect(() => {
    if (storedName) setName(storedName);
    if (storedLanguage) setLanguage(storedLanguage);
    if (storedQuizMaster === 'true') setQuizMaster(true);
  }, [storedName, storedLanguage, storedQuizMaster]);

  const storedStatus = localStorage.getItem('quizMaster');

  if (!name) {
    return (
      <Name handleNameSubmit={handleNameSubmit} />
    );
  }

  if (!language) {
    return (
      <Language 
        name={name} 
        title={translations.ENG.selectLanguage} 
        beforeC={translations.ENG.beforeCreator} 
        creator={translations.ENG.creator} 
        hun={translations.HUN.hungarian} 
        eng={translations.ENG.english}
        ger={translations.GER.german}
        selectLanguage={selectLanguage}
        setShowCategory={setShowCategory}
      />
    );
  }

  
  if (showProfile && !showCategory) {
    return (
      <Profile
        translations={translations[language]}
        handleNameChange={handleNameChange}
        goBack={() =>{ setShowProfile(false); setShowCategory(true)}}
      />
    );
  }


  if (!category || showCategory) {
    return (
      <Category 
        quizTitle={translations[language].quizTitle}
        translations={translations[language]}
        name={name}
        handleCategorySelect={handleCategorySelect}
        handleLanguageChange={handleLanguageChange} 
        currentLanguage={language}
        setShowProfile={setShowProfile}
        setCategory={setCategory}
        setShowCategory={setShowCategory}
      />
    );

    
  }
  

  return (
    <div className='container' style={storedStatus ? {borderColor:'#e7a604'} : {}}>
      <div className="wrapper">
        <h1>{translations[language].quizTitle}</h1>
        <hr />
        {result ? 
          <>    
            <h2>{translations[language].score} {score}{translations[language].outOf} {selectedQuestions.length}</h2>
            <button onClick={reset}>{translations[language].reset}</button>
            {incorrectAnswers.length === 0 ? (
              <div className="congrats-message incorrect-answers">
                <h3>{translations[language].congrats}</h3>
                <img src={Crown} alt="" />
              </div>
            ) : (
              <div className="incorrect-answers" >
                <h3>{translations[language].incorrectAnswers}</h3>
                <ul>
                  {incorrectAnswers.map((item, index) => (
                    <li key={index} id='li'>
                      <p className='question'><strong>Question:</strong> {item.question}</p>
                      <p id='red' className='answer'><strong>Your Answer:</strong> <br /> {item.selected}</p>
                      <p id='green' className='answer'><strong>Correct Answer:</strong> <br /> {item.correct}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </> :
          <div className='relative quiz-container'>
            <h2>{index + 1}. {question.question}</h2>
            <ul>
              <li ref={Option1} onClick={(e) => checkAns(e, 1)}>{question.option1}</li>
              <li ref={Option2} onClick={(e) => checkAns(e, 2)}>{question.option2}</li>
              <li ref={Option3} onClick={(e) => checkAns(e, 3)}>{question.option3}</li>
              <li ref={Option4} onClick={(e) => checkAns(e, 4)}>{question.option4}</li>
            </ul>
            <button onClick={next}>{translations[language].next}</button>
            <div className="index">{index + 1} of {selectedQuestions.length} questions</div>
          </div>
        }
      </div>
    </div>
  );
  
};

export default Quiz;