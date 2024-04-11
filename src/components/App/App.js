import React from 'react';
import { useSelector } from 'react-redux';

// import CreateProfilePage from '../Pages/CreateProfilePage';
// import FeedPage from '../Pages/FeedPage';
// import SignInPage from '../Pages/SignInPage';

import Header from '../Header';
import CreateArticle from '../CreateArticle';

import A from './App.module.scss';

const App = () => {
  const msg = useSelector((state) => state.message);
  return (
    <div className={A.App}>
      <Header />
      <CreateArticle />
      <h1>{msg}</h1>
    </div>
  );
};

export default App;
