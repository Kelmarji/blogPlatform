import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Ava from '../assets/Rectangle 1.png';

import h from './Header.module.scss';

const Header = () => {
  const [loged, SetLoged] = useState(false);
  return (
    <div className={h.HeaderBase}>
      <Link to='/articles' ><span>Realworld Blog</span></Link>
      <div className={h.HeaderBtnGroup}>
        {loged ? (
          <div className={loged ? [h.HeaderBtnGroup, h.LogedBtn].join(' ') : h.HeaderBtnGroup}>
            <Link to="/create" className={[h.HeaderBtn, h.signUp, h.CreateBtn].join(' ')} >Create Article</Link>
            <span>Jonh Doe</span>
            <img src={Ava} />

            <button className={[h.HeaderBtn, h.LogoutBtn].join(' ')} onClick={() => SetLoged(false)}>Log out</button>
          </div>
        ) : (
          <div className={h.HeaderBtnGroup}>
            <Link to="/sign-in" className={h.HeaderBtn} onClick={() => SetLoged(false)}>Sign in</Link>
            <Link to="/sign-up" className={[h.HeaderBtn, h.signUp].join(' ')}>Sing up</Link>
          </div>
        )}
      </div>
    </div>
  );
};
export default Header;
