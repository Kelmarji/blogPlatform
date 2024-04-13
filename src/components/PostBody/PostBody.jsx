import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Alert, Flex, Spin } from 'antd';

import BlogService from '../../services/blogService';
import Ava from '../assets/Rectangle 1.png';

import s from './PostBody.module.scss';

const BlogApi = new BlogService();

const PostBody = ({ slug }) => {
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errmsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        await BlogApi.getOneArticles(slug)
          .then((body) => {
            if (body.errors.error.status === 404) throw new Error('we have problem');
            setPost(body.article);
            setLoaded(true);
            setError(false);
          })
          .catch((e) => {
            setErrMsg(e.message);
            setError(true);
          });
      } catch (err) {
        setError(true);
        setErrMsg(err.message);
      }
    };

    fetchArticles();
  }, [slug]);

  if (!loaded && error) {
    return <li key={slug} id={slug} className={s.listItem}><Flex justify='center'><Alert type='warning' message={errmsg} /></Flex></li>;
  }

  if (!loaded && !error) {
    return <li key={slug} id={slug} className={s.listItem}><Spin /></li>;
  }

  const { author, createdAt, description, favorited, favoritedCount, tagList, title } = post;
  const username = author ? author.username : '';
  const image = author ? author.image : '';
  const renderTags = (arr) => arr.map((item, index) => item !== '' ? <li key={index} className={s.tag}>{item}</li> : null);
  const [liked, setLiked] = useState(false);
  const [id] = useState(Math.floor(Math.random() * 10));
  const changeLike = (value) => {
    setLiked(!value);
  };
  return (
    <li key={slug} id={slug} className={s.listItem}>
      <input
        style={{ display: 'none' }}
        type="checkbox"
        checked={liked}
        id={id}
        onChange={() => changeLike(liked)}
      ></input>
      <div className={s.HeaderItem}>
        <div className={s.HeaderTitle}>
          <div className={s.HeaderLeft}>
            <h2>{title}</h2>
            <label className={favorited ? s.LikeCounterCheked : s.LikeCounterUncheked} htmlFor={id}>
              <span>{favoritedCount > 0 ? favoritedCount : 0}</span>
            </label>
          </div>
          <ul className={s.tags}>
            {renderTags(tagList)}
          </ul>
        </div>
        <div className={s.HeaderRight}>
          <div>
            <h3>{username}</h3>
            <span>{format(new Date(createdAt), 'MMMM dd, yyyy')}</span>
          </div>
          <img style={{borderRadius: '50%'}} src={image.startsWith('http') ? image : Ava} alt={username} />
        </div>
      </div>
      <div className={s.DescPost}>
        <span className={s.DescPost}>
          {description}
        </span>
      </div>
    </li>
  );
};

export default PostBody;
