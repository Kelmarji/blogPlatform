import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import BlogService from '../../../services/blogService';

import s from './SingInPage.module.scss';

const blogApi = new BlogService();

const SignInPage = () => {
  localStorage.page = 1;
  const [errs, setErrs] = useState({err:false, errMsg: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dispLog = (txt) => {
    const type = 'setToken';
    dispatch({ type, payload: txt });
  };
  const dispName = (txt) => {
    const type = 'setName';
    dispatch({ type, payload: txt });
  };

  const userMail = useRef();
  const [pass, setPass] = useState('');
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ mode: 'onBlur' });

  const onSubmit = async (data) => {
    await blogApi.login(data).then((out) => {
      setErrs({err:false, errMsg: ''});
      if (out.user) {
        const { username, token } = out.user;
        localStorage.setItem('logedToken', token);
        dispLog(token);
        dispName(username);
        navigate('/feed');
      }
      if (out.errors) {
        setErrs({err:true, errMsg: 'неверно введён логин или пароль'});
      };
    })
      .catch(() => setErrs({err:true, errMsg: 'Технические неполадки, мы уже разбираемся с этим'}));
    
  };

  if (localStorage.logedToken) {
    if (localStorage.logedToken.length > 0) {
      navigate('/feed');
    }
  }

  return (
    <form className={s.CreateProfilePageBase} onSubmit={handleSubmit(onSubmit)}>
      <h3>Sign In</h3>
      <div className={s.inputField}>
        <span>Email address</span>
        <input
          ref={userMail}
          placeholder="Email adress"
          type="email"
          {...register('email', {
            required: 'обязательное поле',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'неверный формат адреса электронной почты',
            },
          })}
          onChange={() => setErrs({err:false, errMsg: ''})}
        />
        <div style={{ height: '30', color: 'tomato', marginTop: '5px' }}>
          {errors?.email && <p style={{ margin: '0' }}>{errors.email.message}</p>}
        </div>
      </div>
      <div className={s.inputField}>
        <span>Password</span>
        <input
          placeholder="Password"
          type="password"
          {...register('password', {
            required: 'обязательное поле',
            minLength: { value: 6, message: 'минимум 6 символов' },
            maxLength: { value: 40, message: 'максимум 40 символов' },
          })}
          onChange={(e) => {
            setPass(e.target.value);
            setErrs({err:false, errMsg: ''});}
          }/>
        <div style={{ height: '30', color: 'tomato', marginTop: '5px' }}>
          {errors?.password && <p style={{ margin: '0' }}>от 6 до 40 символов</p>}
        </div>
      </div>
      <div style={{ height: '30', color: 'tomato', marginTop: '5px' }}>
        {errs.err && <p style={{ margin: '0' }}>{errs.errMsg}</p>}
      </div>
      <input
        type="submit"
        disabled={!!userMail.current || pass.length === 0}
        className={!userMail.current && pass.length > 0 ? s.CreateBtn : [s.CreateBtn, s.CreateBtnDisabled].join(' ')}
        value={'Login'}
      />
      <span>
        Don&apos;t have an account?{' '}
        <Link to="/sign-up" className={s.SignIn}>
          {' '}
          Sign Up
        </Link>
        .
      </span>
    </form>
  );
};

export default SignInPage;
