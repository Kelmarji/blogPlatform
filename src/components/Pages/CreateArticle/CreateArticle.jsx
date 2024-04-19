import React, { useEffect, useState } from 'react';
import { Card, Typography, Flex, Input, Button } from 'antd';

import t from './CreateArticle.module.scss';

const { Title, Text } = Typography;

const Tags = ({ key , id}) => {
  console.log(key, id);
  return (
    <div key={key}>
      <Flex justify="flex-start" gap="10px">
        <Input placeholder='Tag' style={{ width: '100%' }} />
        <Button danger onClick={() => console.log(id)}>Delete</Button>
      </Flex>
    </div>
  );
};

const CreateArticle = () => {
  const [tagsCount, setTagsCount] = useState(1)
  const [tags, setTags] = useState([<Tags key={tagsCount} />]);

  const newTag = () => {
    setTagsCount((count) => count + 1);
    const newTags = [...tags, <Tags key={tagsCount + 1} id={tagsCount} />];
    setTags(newTags);
  }

  useEffect(() => {}
    , [tags])
  return (
    <Card style={{ width: '80%' }} className={t.CreateArticle}>
      <Title style={{ textAlign: 'center' }} level={2}>Create new article</Title>
      <form>
        <Flex vertical={'vertical'} gap={'10px'}>
          <Text style={{ fontWeight: '500' }}>Title</Text>
          <Input placeholder='Title' />
          <Text style={{ fontWeight: '500' }}>Short description</Text>
          <Input placeholder='Short description' />
          <Text style={{ fontWeight: '500' }}>Text</Text>
          <Input.TextArea
            showCount
            placeholder="Text"
            style={{ height: 168, resize: 'none' }}
          />
          <Text style={{ fontWeight: '500' }}>Tags</Text>
          <Flex gap='10px'>
          <Flex vertical={true} gap="10px">{tags.length > 0 ? [...tags] : null}</Flex>
          <Flex align='flex-end' justify='flex-end'><Button type='primary' ghost onClick={newTag}>Add Tag</Button></Flex>
          </Flex>          
          <input type='submit' className={t.sendBtn} value={'Send'} />
        </Flex>
      </form>
    </Card>
  );
};

export default CreateArticle;
