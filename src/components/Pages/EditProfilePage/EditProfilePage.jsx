import React, { useState } from 'react';

import s from './EditProfile.module.scss';

const EditProfilePage = () => {
  const [privacy] = useState(true);
  return (
    <form className={s.CreateProfilePageBase}>
      <h3>edit you profile</h3>
      <div className={s.inputField}>
        <span>Username</span>
        <input required placeholder="Username" type="text"></input>
      </div>
      <div className={s.inputField}>
        <span>Email address</span>
        <input placeholder="Email adress" type="email"></input>
      </div>
      <div className={s.inputField}>
        <span>New password</span>
        <input placeholder="New password" type="password"></input>
      </div>
      <div className={s.inputField}>
        <span>Avatar image (url)</span>
        <input placeholder="url avatar" type="text"></input>
      </div>
      <button
        className={privacy ? s.CreateBtn : [s.CreateBtn, s.CreateBtnDisabled].join(' ')}
        disabled={!privacy}
        onClick={(e) => {
          e.preventDefault();
          console.log(privacy);
        }}
      >
        Save
      </button>
    </form>
  );
};

export default EditProfilePage;
