// Profile.js
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

   const handleNameUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem('name', newName);
  };

  const handleLanguageUpdate = (e) => {
    e.preventDefault();
    localStorage.setItem('language', newLanguage);
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

        <LatestQuiz translations={translations} /> 

        <Footer />
    </>
  );
};

export default Profile;
