import React, { useEffect, useState } from 'react';
import { Pagination, ConfigProvider, Spin, Alert, Flex } from 'antd';
// import { useParams } from 'react-router-dom';

import PostBody from '../../PostBody/PostBody';
import BlogService from '../../../services/blogService';

import s from './FeedPage.module.scss';

const BlogApi = new BlogService();

const startingPage = localStorage.page ? localStorage.page : 0;

const FeedPage = () => {
  const [page, setPage] = useState(startingPage);
  const [posts, setPosts] = useState([]);
  const [postCount, setPostCount] = useState(5);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const body = await BlogApi.getArticles(page - 1);
        setPostCount(Math.floor(body.articlesCount / 5));
        setPosts(body.articles.map((article) => <PostBody key={article.slug} slug={article.slug} />));
        setLoaded(true);
        setError(false);
      } catch {
        setError(true);
        setErrMsg('Хьюстон у нас проблемки, мы уже фиксики трай ит лэйтэр');
      }
    };

    fetchArticles();
  }, [page]);

  if (!postCount.length && error) {
    return (
      <Flex style={{ height: '80vh' }} align="center" justify="space-between">
        <Alert
          style={{ fontSize: '2em' }}
          showIcon
          type="error"
          message="Ops, something wrong"
          description={[errMsg].join('\n')}
        />
      </Flex>
    );
  }

  if (!loaded || posts.length === 0) {
    return <Spin />;
  }

  return (
    <div className={s.ListPage}>
      <ul className={s.list}>{posts}</ul>
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
        <Pagination
          defaultCurrent={1}
          current={page}
          pageSize={5}
          total={postCount}
          showSizeChanger={false}
          onChange={(e) => {
            setPage(e);
            localStorage.page = e;
          }}
        />
      </ConfigProvider>
    </div>
  );
};

export default FeedPage;
