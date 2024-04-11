import React from 'react';
import * as a from 'antd';

import t from './CreateArticle.module.scss';

const Tags = () => {
  return (
    <a.Flex justify="flex-start" gap="5px">
      <a.Input style={{ width: '20%' }} />
      <a.Button danger>Delete</a.Button>
      <a.Button type="primary" ghost>
        Add tag
      </a.Button>
    </a.Flex>
  );
};

const CreateArticle = () => {
  return (
    <a.Card style={{ width: '80%' }} className={t.CreateArticle}>
      <a.Flex vertical={'vertical'} gap={'10px'}>
        <a.Typography.Text>Title</a.Typography.Text>
        <a.Input />
        <a.Typography.Text>Short description</a.Typography.Text>
        <a.Input />
        <a.Typography.Text>Text</a.Typography.Text>
        <a.Input.TextArea
          showCount
          maxLength={100}
          placeholder="disable resize"
          style={{ height: 120, resize: 'none' }}
        />
        <a.Typography.Text>Tags</a.Typography.Text>
        <Tags />
        <Tags />
        <a.Button type="primary" style={{ width: '20%' }} primary>
          Send
        </a.Button>
      </a.Flex>
    </a.Card>
  );
};

export default CreateArticle;
