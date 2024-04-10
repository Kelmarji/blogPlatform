import React from 'react';

import h from './Header.module.scss';

const Header = () => {
  return (
    <div className={h.HeaderBase}>
      <span>Realworld Blog</span>
      <div className={h.HeaderBtnGroup}>
        <button className={h.HeaderBtn}>sign in</button>
        <button className={[h.HeaderBtn, h.signUp].join(' ')}>sing up</button>
      </div>
    </div>
  );
};

export default Header;
