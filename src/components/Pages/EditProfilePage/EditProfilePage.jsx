import React from 'react';
import { useForm } from 'react-hook-form';

import s from './EditProfile.module.scss';

const EditProfilePage = () => {
  
  const {register, formState: {errors}, handleSubmit} = useForm({mode:'onBlur'});

  const onSubmit = (data) => {
    console.log(data);
    alert(JSON.stringify(data));
  };
  
  return (
    <form className={s.CreateProfilePageBase} onSubmit={handleSubmit(onSubmit)}>
      <h3>edit you profile</h3>
      <div className={s.inputField}>
        <span>Username</span>
        <input required placeholder="Username" type="text"
          {...register('userName', {
            minLength: {value: 3, message: 'минимум 3 символа'},
            maxLength: {value: 20, message: 'максимум 20 символов'},
          })}
        />
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.userName && <p style={{margin: '0'}}>от 3 до 20 символов</p>}</div>
      </div>
      <div className={s.inputField}>
        <span>Email address</span>
        <input placeholder="Email adress" type="email" 
          {...register('email', {
            required: 'обязательное поле',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'неверный формат адреса электронной почты',
            },
          })}
        />
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.email && <p style={{margin: '0'}}>{errors.email.message}</p>}</div>
      </div>
      <div className={s.inputField}>
        <span>New password</span>
        <input placeholder="New password" type="password" 
          {...register('password', {
            required: 'обязательное поле',
            minLength: {value: 6, message: 'минимум 6 символов'},
            maxLength: {value: 40, message: 'максимум 40 символов'},
          })}
        />
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.password && <p style={{margin: '0'}}>от 6 до 40 символов</p>}</div>
      </div>
      <div className={s.inputField}>
        <span>Avatar image (url)</span>
        <input placeholder="url avatar" type="text"
          {...register('url_avatar', {
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'неверный формат URL адреса',
            },
          })}
        />

      </div>
      <input type="submit" className={s.CreateBtn} value='Save' />
    </form>
  );
};

export default EditProfilePage;