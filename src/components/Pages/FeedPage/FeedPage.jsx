import React from 'react';
import { Pagination, ConfigProvider } from 'antd';

import PostBody from '../../PostBody/PostBody';

import s from './FeedPage.module.scss';

const FeedPage = () => {
  return (
    <div className={s.ListPage}>
      <ul className={s.list}>
        <PostBody />
        <PostBody />
        <PostBody />
        <PostBody />
        <PostBody />
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
