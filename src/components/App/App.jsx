import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import Header from '../Header';
import CreateProfilePage from '../Pages/CreateProfilePage';
import FeedPage from '../Pages/FeedPage';
import SignInPage from '../Pages/SignInPage';
import CreateArticle from '../Pages/CreateArticle';
import SelectedPost from '../SelectedPost';

import A from './App.module.scss';

const App = () => {
  const msg = useSelector((state) => state.message);
  return (
    <div className={A.App}>
      <Header />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path='/feed' exact element={<FeedPage />} />
        <Route path='/feed/:slug' element={<SelectedPost slug={'problematika-nizhnego-belya-v-stranah-sng-2hhk0n'} />} />
        <Route path="/create" element={<CreateArticle />} />
        <Route path="/newuser" element={<CreateProfilePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="*" element={<FeedPage />} />
      </Routes> 
      <h1>{msg}</h1>
    </div>
  );
};

export default App;
