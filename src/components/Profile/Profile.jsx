import React, { useState, useEffect } from 'react';
import './Profile.css'; 

import LatestQuiz from '../Latest/Latest';
import Footer from '../Footer/Footer';

import blur1 from '../../assets/Blur/blur-1.svg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Profile = ({goBack, translations, handleNameChange}) => {
    const storedName = localStorage.getItem('name');
    const storedLanguage = localStorage.getItem('language');

    const [newName, setNewName] = useState(storedName || '');
    const [newLanguage, setNewLanguage] = useState(storedLanguage || '');

    const toastNamePlaceholder = translations.toastNamePlaceholder;
    const toastLanguagePlaceholder = translations.toastLanguagePlaceholder;

    // Save category stats and load
    const categoryStats = JSON.parse(localStorage.getItem('categoryStats')) || {};
    const categories = Object.keys(categoryStats).length > 0 ? categoryStats : {
        No: { lastScore: "Tries", bestScore: "Added", attempts: "Yet" }
    };

    // Sorting part
    const [sortCriteria, setSortCriteria] = useState('bestScore');
    const [sortOrder, setSortOrder] = useState('asc');

    const sortedCategories = Object.keys(categories).sort((a, b) => {
        if (sortOrder === 'asc') {
            return categories[a][sortCriteria] - categories[b][sortCriteria];
        } else {
            return categories[b][sortCriteria] - categories[a][sortCriteria];
        }
    });

    const notifyName = () => toast.success(`${toastNamePlaceholder}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
    const notifyLanguage = () => toast.success(`${toastLanguagePlaceholder}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

    // Handling functions

   const handleNameUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem('name', newName);
  };

  const handleLanguageUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem('language', newLanguage);
  };

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };


  return (
    <>
        <ToastContainer 
        theme="dark"
        >
        </ToastContainer>
        <div className="profile-container relative">
            <h1>{translations.profileTitle}</h1>
            <div className="bg-blur">
                <img src={blur1} alt="" style={{width:610, height:730}} />
                <img src={blur1} alt="" style={{width:610, height:730}} />
            </div>
            <div className="form-container">
                <form onSubmit={handleNameUpdate}>
                    <label>
                    {translations.nameFormLabel}:
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    />
                    </label>
                    <button type="submit" onClick={notifyName} className='profileBtn'>{translations.nameFormButton}</button>
                </form>
                <form onSubmit={handleLanguageUpdate}>
                    <label>
                    {translations.languageFormLabel}:
                    <select
                        value={newLanguage}
                        onChange={(e) => setNewLanguage(e.target.value)}
                    >
                        <option value="ENG">{translations.english}</option>
                        <option value="HUN">{translations.hungarian}</option>
                        <option value="GER">{translations.german}</option>
                    </select>
                    </label>
                    <button type="submit" className='profileBtn' onClick={notifyLanguage}>{translations.languageFormButton}</button>

                </form>
            </div>
            <div className="btn-container">
                <button onClick={goBack} className='profileBtn'>{translations.homePageButton}</button>
                <button onClick={handleNameChange} className='profileBtn'>{translations.logOut}</button>
            </div>

            
        </div>

        <div className="category-stats" >
            <h2>{translations.categoryStatsTitle}</h2>
            <p>{translations.categoryStatsNote}</p>
            <table>
                <thead>
                <tr>
                    <th>{translations.category}</th>
                    <th onClick={() => handleSort('lastScore')}>{translations.lastScore}</th>
                    <th onClick={() => handleSort('bestScore')}>{translations.bestScore}</th>
                    <th onClick={() => handleSort('attempts')}>{translations.attempts}</th>
                </tr>
                </thead>
                <tbody>
                {sortedCategories.map((category) => (
                    <tr key={category}>
                    <td className='capitalize'>{category}</td>
                    <td>{categories[category].lastScore}</td>
                    <td>{categories[category].bestScore}</td>
                    <td>{categories[category].attempts}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>

        <LatestQuiz translations={translations} /> 

        <Footer />
    </>
  );
};

export default Profile;
