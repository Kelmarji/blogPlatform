import React from 'react';

import s from './CreateProfile.module.scss';
import Post from './Post';

const CreateProfilePage = () => {
  return (
    <ul className={s.list}>
      <Post />
      <Post />
      <Post />
    </ul>
  );
};

export default CreateProfilePage;
