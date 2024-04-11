import React, { useState } from 'react';

import Ava from './Rectangle 1.png';
import s from './FeedPage.module.scss';

const Post = () => {
  const [liked, setLiked] = useState(false);
  const [id] = useState(Math.floor(Math.random() * 10));
  const changeLike = (value) => {
    setLiked(!value);
  };
  return (
    <li className={s.listItem}>
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
            <h2>Some Article Title </h2>
            <label className={liked ? s.LikeCounterCheked : s.LikeCounterUncheked} htmlFor={id}>
              <span>12</span>
            </label>
          </div>
          <ul className={s.tags}>
            <li className={s.tag}>some tag</li>
            <li className={s.tag}>tags</li>
          </ul>
        </div>
        <div className={s.HeaderRight}>
          <div>
            <h3>John Doe</h3>
            <span>march 5, 2020</span>
          </div>
          <img src={Ava} />
        </div>
      </div>
      <div className={s.DescPost}>
        <span className={s.DescPost}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
          magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
          consequat.
        </span>
      </div>
    </li>
  );
};

export default Post;
