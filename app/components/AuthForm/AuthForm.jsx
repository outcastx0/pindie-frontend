'use client';

import Styles from './AuthForm.module.css';
import { endpoints } from '@/app/api/config';
import { authorize, normalizeDataObject, register } from '@/app/api/api-utils';
import { isResponseOk } from '@/app/api/api-utils';
import { useState, useEffect } from 'react';
import { useStore } from '@/app/store/app-store';

export const AuthForm = (props) => {
  const [authData, setAuthData] = useState({ username: "", email: "", password: "" });
  const [message, setMessage] = useState({ status: null, text: null });
  const authContext = useStore();

  const handleInput = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value, });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var userData = null;
    props.title == 'Авторизация' ? (
      userData = await authorize(endpoints.auth, authData)
    ) : (
      userData = await authorize(endpoints.register, authData)
    );
    if (isResponseOk(userData)) {
      const user = {...userData, id: userData._id};
      authContext.login(user, userData.jwt);
      props.title == 'Авторизация' ? (setMessage({ status: "success", text: "Вы авторизовались!" })) : (setMessage({ status: "success", text: "Вы авторизовались!" }));
    }
    else {
      {
        props.title == 'Авторизация' ?
          (setMessage({ status: "error", text: "Неверные почта или пароль" })) : (setMessage({ status: "error", text: "Неверные логин или почта" }))
      }
    }
  };

  useEffect(() => {
    let timer;
    if (authContext.user) {
      timer = setTimeout(() => {
        props.close();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [authContext.user]);

  return (
    <form onSubmit={handleSubmit} className={Styles["form"]}>
      <h2 className={Styles['form__title']}>{props.title}</h2>
      <div className={Styles['form__fields']}>
        {props.title == 'Авторизация' ? (null) : (
          <label className={Styles['form__field']}>
            <span className={Styles['form__field-title']}>Username</span>
            <input className={Styles['form__field-input']} name='username' type="username" placeholder="username" onInput={handleInput} />
          </label>
        )}
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Email</span>
          <input className={Styles['form__field-input']} name='email' type="email" placeholder="hello@world.com" onInput={handleInput} />
          {/* <input className={Styles['form__field-input']} name={props.title == "Авторизация" ? 'identifier' : 'email'} type="email" placeholder="hello@world.com" onInput={handleInput} /> */}
        </label>
        <label className={Styles['form__field']}>
          <span className={Styles['form__field-title']}>Пароль</span>
          <input className={Styles['form__field-input']} name="password" type="password" placeholder='***********' onInput={handleInput} />
        </label>
      </div>
      {message.status && (
        <p className={Styles['form__message']}>{message.text}</p>
      )}
      {props.title == 'Авторизация' ? (
        <div className='form_buttons'>
          <div className={Styles['form__actions']}>
            <button className={Styles['form__reset']} type="reset">Очистить</button>
            <button className={Styles['form__submit']} type="submit">Войти</button>
          </div>
          <button className={Styles['form__submit']} onClick={() => (props.setTitle('Регистрация'))}>Зарегистрироваться</button>
        </div>
      ) : (
        <div className='form_buttons'>
          <button className={Styles['form__submit']} type='submit'>Зарегистрироваться</button>
        </div>
      )}
    </form>
  )
};