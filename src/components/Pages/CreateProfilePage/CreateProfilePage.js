import React, { useState } from 'react';

import s from './CreateProfile.module.scss';

const CreateProfilePage = () => {
  const [privacy, setPrivacy] = useState(false);
  return (
    <form className={s.CreateProfilePageBase}>
      <h3>Create new account</h3>
      <div className={s.inputField}>
        <span>Username</span>
        <input required placeholder="Username" type="text"></input>
      </div>
      <div className={s.inputField}>
        <span>Email address</span>
        <input placeholder="Email adress" type="text"></input>
      </div>
      <div className={s.inputField}>
        <span>Password</span>
        <input placeholder="Password" type="text"></input>
      </div>
      <div className={s.inputField}>
        <span>Repeat password</span>
        <input placeholder="Repeat password" type="text"></input>
      </div>
      <label className={s.inputAgree}>
        <input type="checkbox" onChange={(e) => setPrivacy(e.target.checked)}></input>
        <span>I agree to the processing of my personal information</span>
      </label>
      <button
        className={privacy ? s.CreateBtn : [s.CreateBtn, s.CreateBtnDisabled].join(' ')}
        disabled={!privacy}
        onClick={(e) => {
          e.preventDefault();
          console.log(privacy);
        }}
      >
        Create
      </button>
      <span>
        Already have account? <a className={s.SignIn}>Sign In</a>.
      </span>
    </form>
  );
};

export default CreateProfilePage;
