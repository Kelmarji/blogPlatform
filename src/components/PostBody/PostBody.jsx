import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Spin } from 'antd';

import BlogService from '../../services/blogService';

import s from './PostBody.module.scss';

const BlogApi = new BlogService();

const PostBody = ({ slug }) => {
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { article } = await BlogApi.getOneArticles(slug);
        setPost(article);
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticles();
  }, [slug]);

  const { author, createdAt, description, favorited, favoritedCount, tagList, title } = post;

  // Check if post is loaded and author exists before destructuring
  const username = author ? author.username : '';
  const image = author ? author.image : '';

  // Function to render tag list
  const renderTags = (arr) => arr.map((item, index) => item !== '' ? <li key={index} className={s.tag}>{item}</li> : null);

  const [liked, setLiked] = useState(false);
  const [id] = useState(Math.floor(Math.random() * 10));
  const changeLike = (value) => {
    setLiked(!value);
  };

  if (!loaded) {
    return <Spin />;
  }

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
          <img style={{borderRadius: '50%'}} src={image} alt={username} />
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
