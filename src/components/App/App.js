import React from 'react';
import { useSelector } from 'react-redux';

import Header from '../Header';
import CreateProfilePage from '../CreateProfilePage';

import A from './App.module.scss';

const App = () => {
  const msg = useSelector((state) => state.message);
  return (
    <div className={A.App}>
      <Header />
      <CreateProfilePage />
      <h1>{msg}</h1>
    </div>
  );
};

export default App;
