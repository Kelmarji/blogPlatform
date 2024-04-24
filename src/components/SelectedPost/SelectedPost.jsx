import React, { useEffect, useState } from 'react';
import { Button, Flex, Spin, Typography } from 'antd';
import { format } from 'date-fns';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useSelector } from 'react-redux';

import BlogService from '../../services/blogService';

import s from './SelectedPost.module.scss';

const BlogApi = new BlogService();

const { Text } = Typography;

const tager = (arr) =>
  arr.map((item, index) =>
    item !== '' ? (
      <li key={index} className={s.tag}>
        {item}
      </li>
    ) : null
  );

const SelectedPost = ({ slug }) => {
  const [liked, setLiked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const yourName = useSelector((state) => state.name);
  const token = useSelector((state) => state.token);
  console.log(useParams());
  const [postName] = useState(slug);
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState({});


  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postBody = await BlogApi.getOneArticles(postName);
        console.log(postBody);
        setPost(postBody);
        setLiked(postBody.article.favorited)
        setLoaded(true);
      } catch (error) {
        console.error('Ошибка при получении поста:', error);
      }
    };
    fetchPost();
  }, [postName, liked]);

  
  const [id] = useState(Math.floor(Math.random() * 10));
  const changeLike = (value) => {
    setLiked(!value);
  };
  if (loaded) {
    const { author, body, createdAt, description, favorited, favoritesCount, tagList, title } = post.article;
    const { username, image } = author;
    const isYourPost = username === yourName;
    console.log('1', username, '2', yourName);
    console.log(`ourPost? ${isYourPost}`);
    return (
      <li key={slug.slug} id={slug.slug} className={s.listItem}>
        <input
          style={{ display: 'none' }}
          type="checkbox"
          checked={favorited}
          id={id}
          onChange={() => changeLike(liked)}
        ></input>
        <div className={s.HeaderItem}>
          <div className={s.HeaderTitle}>
            <div className={s.HeaderLeft}>
              <h2>{title}</h2>
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
            <ul className={s.tags}>{tager(tagList)}</ul>
          </div>
          <div className={s.HeaderRight}>
            <div>
              <h3>{username}</h3>
              <span>{`${format(new Date(createdAt), 'MMMM dd, yyyy')}`}</span>
            </div>
            <img style={{ borderRadius: '50%' }} src={image} />
          </div>
        </div>
        <Flex gap="10px">
          <div style={{ width: '75%', wordWrap: 'break-word' }} className={s.DescPost}>
            <span className={s.DescPost}>{description}</span>
          </div>
          {isYourPost ? (
            <div>
              <div className={!isOpen ? s.modal : [s.modal, s.isOpen].join(' ')}>
                <Flex vertical justify="space-around" style={{height:'100%', padding: '0px 10px'}}>
                  <span>Are you sure to delete this article?</span>
                  <Flex justify='flex-end' gap="12px">
                    <Button onClick={() => setIsOpen(false)}>No</Button>
                    <Button type='primary'
                      onClick={() => {
                        test.deletePost(token, slug);
                        setTimeout(() => navigate('/feed'), 500);
                      }}
                    >Yes</Button>
                  </Flex>
                </Flex>
              </div>
              <Flex className={s.btns} gap="10px">
                <button
                  onClick={() => setIsOpen(true)}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setTimeout(() => navigate(`/articles/${slug}/edit`), 500);
                  }}
                >
                  Edit
                </button>
              </Flex>
            </div>
          ) : null}
        </Flex>
        <div style={{ marginTop: '20px' }}>
          <Text>
            <ReactMarkdown>{body}</ReactMarkdown>
          </Text>
        </div>
      </li>
    );
  }
  return <Spin />;
};

export default SelectedPost;
