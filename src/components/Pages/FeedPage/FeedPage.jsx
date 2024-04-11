import React from 'react';
import { Pagination, ConfigProvider } from 'antd';

import s from './FeedPage.module.scss';
import Post from './Post';

const FeedPage = () => {
  return (
    <div className={s.ListPage}>
      <ul className={s.list}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </ul>
      <ConfigProvider
        theme={{
          components: {
            Pagination: {
              itemActiveBg: '#1890FF',
              itemLinkBg: 'white',
              itemInputBg: 'white',
              /* here is your component tokens */
            },
          },
          token: {
            colorPrimary: 'white',
          },
        }}
      >
        <Pagination defaultCurrent={1} pageSize={5} total={1700 / 5} showSizeChanger={false} />
      </ConfigProvider>
    </div>
  );
};

export default FeedPage;
