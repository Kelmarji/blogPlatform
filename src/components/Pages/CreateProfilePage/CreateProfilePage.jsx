import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import BlogService from '../../../services/blogService';

import s from './CreateProfile.module.scss';


const blogApi = new BlogService(); 

const CreateProfilePage = () => {
  const {register, formState: {errors}, handleSubmit} = useForm({mode:'onBlur'});
  const [privacy, setPrivacy] = useState(true);
  const [pass, setPass] = useState('');
  const [repPass, setRepPass] = useState('');


  const onSubmit = (data) => {
    if (pass !== repPass) {
      return;
    }
    blogApi.register(data);
  };

  return (
    <form className={s.CreateProfilePageBase} onSubmit={handleSubmit(onSubmit)}>
      <h3>Create new account</h3>
      <div className={s.inputField}>
        <span>Username</span>
        <input placeholder="Username" type="text" 
          {...register('username', {
            required: 'обязательное поле',
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
        <span>Password</span>
        <input 
          placeholder="Password" type="password"
          {...register('password', {
            required: 'обязательное поле',
            minLength: {value: 6, message: 'минимум 6 символов'},
            maxLength: {value: 40, message: 'максимум 40 символов'},
          })
          }
          
          onChange={(e) => setPass(e.target.value)}
        />
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.password && <p style={{margin: '0'}}>от 6 до 40 символов</p>}</div>
      </div>
      <div className={s.inputField}>
        <span>Repeat password</span>
        <input placeholder="Repeat password" type="password" onChange={(e) => setRepPass(e.target.value)}></input>
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{pass !== repPass ? <p style={{margin: '0'}}>пароли не совпадают</p> : null}</div>
      </div>
      <label className={s.inputAgree}>
        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)}></input>
        <span>I agree to the processing of my personal information</span>
      </label>
      <input type="submit" disabled={!privacy} className={privacy ? s.CreateBtn : [s.CreateBtn, s.CreateBtnDisabled].join(' ')} value={'Create'} /> 
      <span>
        Already have account? <Link to='/sign-in' className={s.SignIn}>Sign In</Link>.
      </span>
    </form>
  );
};

export default CreateProfilePage;
