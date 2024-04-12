import React,{useState} from 'react';
import { Typography } from 'antd';

import Ava from '../assets/Rectangle 1.png';

import s from './SelectedPost.module.scss';

const { Text } = Typography;

const SelectedPost = () => {
  const [liked, setLiked] = useState(false);
  const [id] = useState(Math.floor(Math.random() * 10));
  const changeLike = (value) => {
    setLiked(!value);
  };
  return(
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
      <div  style={{marginTop: '20px'}}>
        <Text>pu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text dohya vajniipu pu pu text </Text>
      </div>
    </li>
  );
};

export default SelectedPost;

