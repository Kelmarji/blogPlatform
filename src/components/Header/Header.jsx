import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import BlogService from '../../services/blogService';
import Ava from '../assets/Rectangle 1.png';

import h from './Header.module.scss';

const blogApi = new BlogService();

const Header = () => {
  
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const [loged, SetLoged] = useState(false);
  const [name, setName] = useState('jony poe');

  const logOut = () => {
    dispatch({type:'logout'});
    localStorage.removeItem('logedToken');
    SetLoged(false);
  };

  useEffect(() => {
    if (token.length > 0 ) {
      SetLoged(true);
    }
    if (token.length === 0) {
      SetLoged(false);
    }
  }, [token]);

  useEffect( () => {
    if (loged) blogApi.getLoged(token).then((res) => setName(res.user.username));
    if (!loged) setName('jonh poe');
  }, [loged]);

  return (
    <div className={h.HeaderBase}>
      <Link to='/articles' ><span>Realworld Blog</span></Link>
      <div className={h.HeaderBtnGroup}>
        {loged ? (
          <div className={loged ? [h.HeaderBtnGroup, h.LogedBtn].join(' ') : h.HeaderBtnGroup}>
            <Link to="/create" className={[h.HeaderBtn, h.signUp, h.CreateBtn].join(' ')} >Create Article</Link>
            <Link to="/profile" style={{display:'flex', gap: '5px'}}>
              <span>{name}</span>
              <img src={Ava} />
            </Link>

            <button className={[h.HeaderBtn, h.LogoutBtn].join(' ')} onClick={logOut}>Log out</button>
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
