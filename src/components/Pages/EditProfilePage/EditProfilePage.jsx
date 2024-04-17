import React from 'react';

import s from './EditProfile.module.scss';

const EditProfilePage = () => {
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
        className={s.CreateBtn}
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        Save
      </button>
    </form>
  );
};

export default EditProfilePage;
