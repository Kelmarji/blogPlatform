import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Spin } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import BlogService from '../../services/blogService';

import s from './PostBody.module.scss';

const BlogApi = new BlogService();

const PostBody = ({ slug }) => {
  const [liked, setLiked] = useState(false);
  const [post, setPost] = useState({});
  const [loaded, setLoaded] = useState(false);
  const token = useSelector((state) => state.token);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const { article } = await BlogApi.getOneArticles(slug);
        setLiked(article.favorited);
        setPost(article);
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticles();
  }, [slug, liked]);

  const { author, createdAt, description, favorited, favoritesCount, tagList, title } = post;

  const username = author ? author.username : '';
  const image = author ? author.image : '';

  const renderTags = (arr) => arr.map((item, index) => item !== '' ? <li key={index} className={s.tag}>{item}</li> : null);
  const [id] = useState(Math.floor(Math.random() * 10));
  const changeLike = (value) => {
    setLiked(!value);
  };
  const titler = (titl = 'untitled') => titl.length > 35 ? `${titl.slice(0, 35)}...` : titl;
  const descr = (desc = 'no descript') => desc.length > 150 ? `${desc.slice(0, 150)}` : desc;
  const validate = (txt,func) => txt ? func(txt) : console.log('gg',slug, txt, 'gnida ebanaya');

  if (!loaded) {
    return <Spin />;
  }
  return (
    <li key={slug} id={slug} className={s.listItem}>
      <input
        style={{ display: 'none' }}
        type="checkbox"
        checked={favorited}
        id={id}
        onChange={() => changeLike(!liked)}
      />
      <div className={s.HeaderItem}>
        <div className={s.HeaderTitle}>
          <div className={s.HeaderLeft}>
            <Link style={{textDecoration: 'none'}} key={slug} to={`/articles/${slug}`}>
              <h2>{validate(title, titler)}</h2>
            </Link>
            <div 
              style={{paddingLeft: '10px', width:'auto', cursor:'pointer'}}
              onClick={() => {
                BlogApi.unlikeLikePost(liked, token, slug)
                  .then((articl) => setLiked(articl.favorited));
                changeLike(!liked);
              }}>
              <label onClick={() => changeLike(!liked)} className={favorited ? s.LikeCounterCheked : s.LikeCounterUncheked} htmlFor={id}>
                <span>
                  {favoritesCount > 0 ? favoritesCount : 0}</span>
              </label>
            </div>
          </div>
          <ul className={s.tags}>
            {renderTags(tagList.slice(0, 6))}
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
          {validate(description, descr)}
        </span>
      </div>
    </li>
  );
};

export default PostBody;