import React, { useState } from 'react';

import s from './SingInPage.module.scss';

const SignInPage = () => {
  const [username, setUsername] = useState('');
  const [pass, setPass] = useState('');
  return (
    <form className={s.CreateProfilePageBase}>
      <h3>Sign In</h3>
      <div className={s.inputField}>
        <span>Email Address</span>
        <input required placeholder="Email Address" type="text" onChange={(e) => setUsername(e.target.value)}></input>
      </div>
      <div className={s.inputField}>
        <span>Password</span>
        <input placeholder="Password" type="password" onChange={(e) => setPass(e.target.value)}></input>
      </div>
      <button
        className={username.length > 0 ? s.CreateBtn : [s.CreateBtn, s.CreateBtnDisabled].join(' ')}
        disabled={!(username.length > 0)}
        onClick={(e) => {
          e.preventDefault();
          console.log(username, pass);
        }}
      >
        Create
      </button>
      <span>
        Don&apos;t have an account?{' '}
        <a href="#" className={s.SignIn}>
          {' '}
          Sign Up
        </a>
        .
      </span>
    </form>
  );
};

export default SignInPage;
