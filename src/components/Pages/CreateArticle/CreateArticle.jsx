import React from 'react';
import {Card, Typography, Flex, Input, Button,} from 'antd';

import t from './CreateArticle.module.scss';

const {Title, Text} = Typography;

const Tags = () => {
  return (
    <Flex justify="flex-start" gap="10px">
      <Input placeholder='Tag' style={{ width: '35%' }} />
      <Button danger>Delete</Button>
      <Button type="primary" ghost>
        Add tag
      </Button>
    </Flex>
  );
};

const CreateArticle = () => {
  return (
    <Card style={{ width: '80%' }} className={t.CreateArticle}>
      <Title style={{textAlign: 'center'}} level={2}>Create new article</Title>
      <Flex vertical={'vertical'} gap={'10px'}>
        <Text style={{fontWeight: '500'}}>Title</Text>
        <Input placeholder='Title'/>
        <Text style={{fontWeight: '500'}}>Short description</Text>
        <Input placeholder='Short description' />
        <Text style={{fontWeight: '500'}}>Text</Text>
        <Input.TextArea
          showCount
          placeholder="Text"
          style={{ height: 168, resize: 'none' }}
        />
        <Text style={{fontWeight: '500'}}>Tags</Text>
        <Tags />
        <Tags />
        <Button type="primary" style={{ width: '37%' }} primary>
          Send
        </Button>
      </Flex>
    </Card>
  );
};

export default CreateArticle;
