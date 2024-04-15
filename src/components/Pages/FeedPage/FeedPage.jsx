import React, { useEffect, useState } from 'react';
import { Pagination, ConfigProvider, Spin } from 'antd';
// import { useParams } from 'react-router-dom';

import PostBody from '../../PostBody/PostBody';
import BlogService from '../../../services/blogService';


import s from './FeedPage.module.scss';

const BlogApi = new BlogService();

const FeedPage = () => {
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(5);
  const [loaded, setLoaded] = useState(false);
  
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const body = await BlogApi.getArticles(page);
        console.log(body);
        setPostCount(Math.floor(body.articlesCount / 5));
        setPosts(body.articles.map((article) => <PostBody key={article.slug} slug={article.slug} />));
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [ page ]);

  console.log(postCount);
  
  if (!loaded || posts.length === 0) {
    return <Spin />;
  }

  return (
    <div className={s.ListPage}>
      <ul className={s.list}>
        {posts}
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
        <Pagination defaultCurrent={1} current={page} pageSize={5} total={postCount} showSizeChanger={false} onChange={(e) => setPage(e)}/>
      </ConfigProvider>
    </div>
  );
};

export default FeedPage;
