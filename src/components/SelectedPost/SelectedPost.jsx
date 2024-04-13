import React,{useState} from 'react';
import { Typography } from 'antd';
import { format } from 'date-fns';

import BlogService from '../../services/blogService';

import s from './SelectedPost.module.scss';

const test = new BlogService();

const ohae = await test.getOneArticles('dorogoj-dnevnik-xsfcnn');

const { Text } = Typography;
const forTest = ohae.article;

const tager = (arr) => arr.map((item,index) => item !== '' ? <li key={index} className={s.tag}>{item}</li> : null);

const SelectedPost = (slug = forTest) => {
  const { author,
    body,
    createdAt,
    description,
    favorited,
    favoritedCount,
    tagList,
    title,
  } = forTest;

  const { username, image } = author;

  const [liked, setLiked] = useState(false);
  const [id] = useState(Math.floor(Math.random() * 10));
  const changeLike = (value) => {
    setLiked(!value);
  };
  return(
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
            <label className={favorited ? s.LikeCounterCheked : s.LikeCounterUncheked} htmlFor={id}>
              <span>{favoritedCount > 0 ? favoritedCount : 0}</span>
            </label>
          </div>
          <ul className={s.tags}>
            {tager(tagList)}
          </ul>
        </div>
        <div className={s.HeaderRight}>
          <div>
            <h3>{username}</h3>
            <span>{`${format(new Date(createdAt), 'MMMM dd, yyyy')}`}</span>
          </div>
          <img style={{borderRadius: '50%'}} src={image} />
        </div>
      </div>
      <div className={s.DescPost}>
        <span className={s.DescPost}>
          {description}
        </span>
      </div>
      <div style={{marginTop: '20px'}}>
        <Text>{body}</Text>
      </div>
    </li>
  );
};

export default SelectedPost;

