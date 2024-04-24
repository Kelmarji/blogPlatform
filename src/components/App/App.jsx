import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';
import { Online,Offline } from 'react-detect-offline';
import { Flex, Typography } from 'antd';

import Header from '../Header';
import CreateProfilePage from '../Pages/CreateProfilePage';
import FeedPage from '../Pages/FeedPage';
import SignInPage from '../Pages/SignInPage';
import CreateArticle from '../Pages/CreateArticle';
import SelectedPost from '../SelectedPost';
import EditProfilePage from '../Pages/EditProfilePage';
import EditArticle from '../Pages/EditArticle';

import A from './App.module.scss';

const {Title} = Typography;

const App = () => {
  const RenderSelectedPost = () => {
    const { slug } = useParams();
    return <SelectedPost slug={slug} />;
  };
  const token = useSelector((state) => state.token);
  return (
    <div className={A.App}>
      <Header />
      <Online style={{width: '100%'}}>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path='/articles' exact element={<FeedPage />} />
          <Route path='/articles/:slug' element={<RenderSelectedPost />} />
          <Route path='/articles/:slug/edit' exact element={<EditArticle />} />
          <Route path="/new-article" element={token ? <CreateArticle /> : <FeedPage />} />
          <Route path="/sign-up" element={!token ? <CreateProfilePage /> : <FeedPage />} />
          <Route path="/sign-in" element={!token ? <SignInPage /> : <FeedPage />} />
          <Route path="/profile" element={token ? <EditProfilePage /> : <FeedPage />} />
          <Route path="*" element={<FeedPage />} />
        </Routes>
      </Online>
      <Offline style={{with: '100%'}}>  
        <Flex style={{height: '80vh'}} align='center' justify="space-between">
          <Title style={{fontSize:'3em'}}> you are Offline, check you connection.</Title>
        </Flex>
      </Offline>
    </div>
  );
};

export default App;
