import React, { useEffect, useState } from 'react';
import './Latest.css'; 

const LatestQuiz = ({ translations }) => {
    const [latestQuiz, setLatestQuiz] = useState(null);

    useEffect(() => {
        const storedQuiz = localStorage.getItem('latestQuiz');
        if (storedQuiz) {
        setLatestQuiz(JSON.parse(storedQuiz));
        }
    }, []);

    if (!latestQuiz) {
        return <div></div>;
    }

  return (
    <div className='incorrect-answers latest-quiz-container' id='latestContainer'>
      
      {latestQuiz.incorrectAnswers.length > 0 ? (
        <>
            <h3 className='latestTitle'>{translations.latestQuizTitle}</h3>
            <div className='latestSubDatas'>
                <p>{translations.score}: {latestQuiz.score} / 5</p>
                <p className="capitalize">{translations.category}: {latestQuiz.category}</p>
            </div>
            <h3 className='latestTitle'>{translations.incorrectAnswers}</h3>
            <ul>
                {latestQuiz.incorrectAnswers.map((item, index) => (
                <li key={index}>
                      <p><strong>{translations.question}:</strong> <br />{item.question}</p>
                      <p><strong>{translations.yourAnswer}:</strong> <span id='red'><br />{item.selected}</span> </p>
                      <p><strong>{translations.correctAnswer}:</strong><span id='green' ><br />{item.correct}</span> </p>                
                </li>
                ))}
            </ul>
        </>
      ) : (
        <p>{translations.noIncorrectAnswers}</p>
      )}
    </div>
  );
};

export default LatestQuiz;
