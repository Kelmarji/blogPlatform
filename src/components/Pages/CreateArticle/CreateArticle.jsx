import React, { useCallback, useEffect, useState } from 'react';
import { Card, Typography, Flex, Button, Alert } from 'antd';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import BlogService from '../../../services/blogService';

import t from './CreateArticle.module.scss';
import Tags from './Tags';

const { Title, Text } = Typography;
const blogApi = new BlogService();


const CreateArticle = () => {
  const token = useSelector((state) => state.token);
  const [tagCounter, setTagCounter] = useState(0);
  const [tags, setTags] = useState([]);
  const [err,setErr] = useState({errs:false, errMsg:''});
  const {register, formState: {errors}, handleSubmit, unregister} = useForm({mode:'onBlur'});
  const navigate = useNavigate();



  const onDeleted = useCallback((id) => {
    setTags(prevTags => prevTags.filter(tag => tag.id !== id));
    unregister(`tags[${id}]`);
  }, [tags, unregister]);

  const newTager = () => {
    console.log(tags);
    const newTags = [...tags, { key: tagCounter + 1, id: tagCounter + 1, onDeleted, register }];
    setTags(newTags);
    setTagCounter((count) => count + 1);
  };

  useEffect(() => {
  }, [tags] );

  const onSubmit = (data) => {
    console.log(data);
    let newTags = [];
    if (data.tags) {
      if (data.tags.length > 0)
        newTags = data.tags.filter((item) => item.length > 0);
    }
    blogApi.createArticle({...data, tags: newTags}, token, blogApi)
      .then(() => {
        setTimeout(() => navigate('/articles'), 500);
      })
      .catch((e) => {
        setErr({errs:true, errMsg:e.message});
      });
  };

  if (err.errs) {
    return (<Flex style={{height: '80vh'}} align='center' justify='space-between'><Alert style={{fontSize:'2em'}} showIcon type="error" message='Ops, something wrong' description={err.errMsg} /></Flex>);
  }
  return (
    <Card style={{ width: '80%' }} className={t.CreateArticle}>
      <Title style={{ textAlign: 'center' }} level={2}>Create new article</Title>
      <form onSubmit={handleSubmit(onSubmit)} >
        <Flex vertical={'vertical'} gap={'10px'}>
          <Text style={{ fontWeight: '500' }}>Title</Text>
          <input type="text" className={t.customInput} placeholder='Title'
            {...register('title', {
              required: 'обязательное поле',
            })}
          />
          <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.title && <p style={{margin: '0'}}>{errors.title.message}</p>}</div>
          <Text style={{ fontWeight: '500' }}>Short description</Text>
          <input className={t.customInput} placeholder='Short description'
            {...register('description', {
              required: 'обязательное поле',
            })}
          />
          <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.desc && <p style={{margin: '0'}}>{errors.desc.message}</p>}</div>
          <Text style={{ fontWeight: '500' }}>Text</Text>
          <textarea type="text" className={t.customInput}
            placeholder="Text"
            style={{ height: 168, resize: 'none'}}
            {...register('body', {
              required: 'обязательное поле',
            })}
          />
          <div style={{height:'30', color:'tomato', marginTop: '5px'}}>{errors?.body && <p style={{margin: '0'}}>{errors.body.message}</p>}</div>   
          <Text style={{ fontWeight: '500' }}>Tags</Text>
          <Flex gap='10px'>
            <Flex vertical={true} gap="10px">{tags.length > 0 ? 
              tags.map((item) => {
                return <Tags key={item.key} id={item.id} onDeleted={item.onDeleted} register={item.register} />;
              })
              :
              null}</Flex>
            <Flex align='flex-end' justify='flex-end'><Button type='primary' ghost onClick={newTager}>Add Tag</Button></Flex>
          </Flex>          
          <input type='submit' className={t.sendBtn} value={'Send'} />
        </Flex>
      </form>
    </Card>
  );
};

export default CreateArticle;

/* 
Добавьте страницу создания статьи. Правила валидации - title, short description и text обязательны для заполнения.
*/

