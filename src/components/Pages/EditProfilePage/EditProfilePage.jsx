import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Flex, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';

import BlogService from '../../../services/blogService';

import s from './EditProfile.module.scss';

const blogApi = new BlogService();


const EditProfilePage = () => {
  localStorage.page = 1;
  const navigate = useNavigate();
  const disp = useDispatch();
  const [err, setErr] = useState({errs: false, errMsg:''});
  const token = useSelector((state) => state.token);
  const {register, formState: {errors}, handleSubmit} = useForm({mode:'onBlur'});
  const dispToken = (txt) => {
    const type = 'setToken';
    disp({ type, payload: txt });
  };

  const onSubmit = (data) => {
    if (token.length > 0 ) {
      blogApi.updUser(data, token)
        .then((body) => {
          if (body.errors) {
            setErr({errs: true, errMsg:'Не удалось сохранить изменения, попробуйте позже'});
            setTimeout(() => {
              setErr({errs: false, errMsg:''});
            }, 6000);
          }
          if (body.user) {
            dispToken(body.user.token);
            localStorage.logedToken= body.user.token;
            setTimeout(() => navigate('/article'), 500);
          }
        })
        .catch(() => {
          setErr({errs: true, errMsg:'Не удалось сохранить изменения, попробуйте позже'});
          setTimeout(() => {
            setErr({errs: false, errMsg:''});
          }, 6000);
        });
    };
  };

  if (err.errs) {
    return (<Flex style={{height: '80vh'}} align='center' justify='space-between'><Alert style={{fontSize:'2em'}} showIcon type="error" message='Ops, something wrong' description={err.errMsg} /></Flex>);
  }
  
  return (
    <form className={s.CreateProfilePageBase} onSubmit={handleSubmit(onSubmit)}>
      <h3>edit you profile</h3>
      <div className={s.inputField}>
        <span>Username</span>
        <input required placeholder="Username" type="text"
          {...register('username', {
            minLength: {value: 3, message: 'минимум 3 символа'},
            maxLength: {value: 20, message: 'максимум 20 символов'},
            pattern: {
              value: /^[^\s]+$/,
              message: 'Имя пользователя не должно содержать пробелы'
            }
          })}
        />
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.username && <p style={{margin: '0'}}>{errors.username.message}</p>}</div>
      </div>
      <div className={s.inputField}>
        <span>Email address</span>
        <input required placeholder="Email adress" type="email" 
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
            // required: 'обязательное поле',
            minLength: {value: 6, message: 'минимум 6 символов'},
            maxLength: {value: 40, message: 'максимум 40 символов'},
          })}
        />
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.password && <p style={{margin: '0'}}>от 6 до 40 символов</p>}</div>
      </div>
      <div className={s.inputField}>
        <span>Avatar image (url)</span>
        <input placeholder="url avatar" type="text"
          {...register('image', {
            pattern: {
              value: /^(ftp|http|https):\/\/[^ "]+$/,
              message: 'неверный формат URL адреса',
            },
          })}
        />
        <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.url_avatar && <p style={{margin: '0'}}>{errors.url_avatar.message}</p>}</div>
      </div>
      <input type="submit" className={s.CreateBtn} value='Save' />
    </form>
  );
};

export default EditProfilePage;
