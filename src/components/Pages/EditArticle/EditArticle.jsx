import React, { useCallback, useEffect, useState } from 'react';
import { Card, Typography, Flex, Button } from 'antd';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import BlogService from '../../../services/blogService';

import t from './EditArticle.module.scss';

const { Title, Text } = Typography;
const blogApi = new BlogService();

const TagsEdit = ({ label, onDeleted, id, register }) => {
  const [tagText, setTagText] = useState(label);
  return (
    <div id={id}>
      <Flex justify="flex-start" gap="10px">
        <input
          value={tagText}
          className={t.customInput}
          placeholder="Tag"
          style={{ width: '100%' }}
          {...register(`tags[${id}]`)}
          onChange={(e) => {
            setTagText(e.target.value);
          }}
        />
        <Button danger onClick={() => onDeleted(id)}>
          Delete
        </Button>
      </Flex>
    </div>
  );
};

const EditArticle = () => {
  const sl = useParams();
  const { slug } = sl;
  const [namePost, setNamePost] = useState('');
  const [short, setShort] = useState('');
  const [text, setText] = useState('');
  const [tags, setTags] = useState([]);
  const [tagCounter, setTagCounter] = useState(1);
  const token = useSelector((state) => state.token);
  const {
    register,
    formState: { errors },
    handleSubmit,
    unregister,
  } = useForm({ mode: 'onBlur' });
  const navigate = useNavigate();

  const onDeleted = useCallback(
    (id) => {
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
      unregister(`tags[${id}]`);
    },
    [tags, unregister]
  );

  const newTager = () => {
    console.log(tags);
    const newTags = [...tags, { label: '', key: tagCounter + 1, id: tagCounter + 1, onDeleted, register }];
    setTags(newTags);
    setTagCounter((count) => count + 1);
  };

  useEffect(() => {
    blogApi.getOneArticles(slug).then((res) => {
      const { title, description, body, tagList } = res.article;
      setNamePost(title);
      setShort(description);
      setText(body);
      setTagCounter(tagList.length);
      const tagsObjects = tagList.map((item, index) => {
        setTagCounter(index+1);
        return {label: item,
          key: index,
          id: index,
          onDeleted,
          register};
      });
      setTags(tagsObjects);
    });
  }, []);

  useEffect(() => {}, [tags]);

  const onSubmit = (data) => {
    console.log(data);
    let newTags = [];
    if (data.tags) {
      if (data.tags.length > 0) newTags = data.tags.filter((item) => item.length > 0);
    }
    // blogApi.UPDARTICLE({ ...data, tags: newTags }, token, blogApi);
    blogApi.updArticle({ ...data, tags: newTags }, token, slug);
    setTimeout(() => navigate(`/articles/${slug}`), 500);
  };

  return (
    <Card style={{ width: '80%' }} className={t.CreateArticle}>
      <Title style={{ textAlign: 'center' }} level={2}>
        Edit Article
      </Title>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex vertical={'vertical'} gap={'10px'}>
          <Text style={{ fontWeight: '500' }}>Title</Text>
          <input
            value={namePost}
            type="text"
            className={t.customInput}
            placeholder="Title"
            {...register('title', {
              required: 'обязательное поле',
            })}
            onChange={(e) => setNamePost(e.target.value)}
          />
          <div style={{ height: '30', color: 'tomato', marginTop: '5px' }}>
            {errors?.title && <p style={{ margin: '0' }}>{errors.title.message}</p>}
          </div>
          <Text style={{ fontWeight: '500' }}>Short description</Text>
          <input
            value={short}
            className={t.customInput}
            placeholder="Short description"
            {...register('description', {
              required: 'обязательное поле',
            })}
            onChange={(e) => setShort(e.target.value)}
          />
          <div style={{ height: '30', color: 'tomato', marginTop: '5px' }}>
            {errors?.desc && <p style={{ margin: '0' }}>{errors.desc.message}</p>}
          </div>
          <Text style={{ fontWeight: '500' }}>Text</Text>
          <textarea
            value={text}
            type="text"
            className={t.customInput}
            placeholder="Text"
            style={{ height: 168, resize: 'none' }}
            {...register('body', {
              required: 'обязательное поле',
            })}
            onChange={(e) => setText(e.target.value)}
          />
          <div style={{ height: '30', color: 'tomato', marginTop: '5px' }}>
            {errors?.body && <p style={{ margin: '0' }}>{errors.body.message}</p>}
          </div>
          <Text style={{ fontWeight: '500' }}>Tags</Text>
          <Flex gap="10px">
            <Flex vertical={true} gap="10px">
              {tags.length > 0
                ? tags.map((item) => {
                    return (
                      <TagsEdit
                        label={item.label}
                        key={item.key}
                        id={item.id}
                        onDeleted={item.onDeleted}
                        register={item.register}
                      />
                    );
                  })
                : null}
            </Flex>
            <Flex align="flex-end" justify="flex-end">
              <Button type="primary" ghost onClick={newTager}>
                Add Tag
              </Button>
            </Flex>
          </Flex>
          <input type="submit" className={t.sendBtn} value={'Save'} />
        </Flex>
      </form>
    </Card>
  );
};

export default EditArticle;