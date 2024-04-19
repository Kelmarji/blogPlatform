import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';

import Header from '../Header';
import CreateProfilePage from '../Pages/CreateProfilePage';
import FeedPage from '../Pages/FeedPage';
import SignInPage from '../Pages/SignInPage';
import CreateArticle from '../Pages/CreateArticle';
import SelectedPost from '../SelectedPost';
import EditProfilePage from '../Pages/EditProfilePage';

import A from './App.module.scss';

const App = () => {
  const token = useSelector((state) => state.token);
  return (
    <div className={A.App}>
      <Header />
      <Routes>
        <Route path="/" element={<FeedPage />} />
        <Route path='/articles' exact element={<FeedPage />} />
        <Route path='/articles/:slug' element={<RenderSelectedPost />} />
        <Route path="/create" element={token ? <CreateArticle /> : <FeedPage />} />
        <Route path="/sign-up" element={!token ? <CreateProfilePage /> : <FeedPage />} />
        <Route path="/sign-in" element={!token ? <SignInPage /> : <FeedPage />} />
        <Route path="/profile" element={token ? <EditProfilePage /> : <FeedPage />} />
        <Route path="*" element={<FeedPage />} />
      </Routes>
    </div>
  );
};

const RenderSelectedPost = () => {
  const { slug } = useParams();
  return <SelectedPost slug={slug} />;
};


export default App;
