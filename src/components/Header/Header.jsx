import React from 'react';

import Ava from '../Pages/FeedPage/Rectangle 1.png';

import h from './Header.module.scss';

const Header = () => {
  const isLoged = true;
  return (
    <div className={h.HeaderBase}>
      <span>Realworld Blog</span>
      <div className={h.HeaderBtnGroup}>
        {isLoged ? (
          <div className={isLoged ? [h.HeaderBtnGroup, h.LogedBtn].join(' ') : h.HeaderBtnGroup}>
            <button className={[h.HeaderBtn, h.signUp, h.CreateBtn].join(' ')}>Create Article</button>
            <span>Jonh Doe</span>
            <img src={Ava} />

            <button className={[h.HeaderBtn, h.LogoutBtn].join(' ')}>Log out</button>
          </div>
        ) : (
          <div className={h.HeaderBtnGroup}>
            <button className={h.HeaderBtn}>Sign in</button>
            <button className={[h.HeaderBtn, h.signUp].join(' ')}>Sing up</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
