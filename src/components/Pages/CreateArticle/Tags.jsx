import React from 'react';
import {Flex, Button } from 'antd';

import t from './CreateArticle.module.scss';

const Tags = ({ onDeleted, id, register}) => {
  return (
    <div id={id}>
      <Flex justify="flex-start" gap="10px">
        <input 
          className={t.customInput} 
          placeholder='Tag' 
          style={{ width: '100%' }} 
          {...register(`tags[${id}]`)} 
        />
        <Button danger onClick={() => onDeleted(id)}>Delete</Button>
      </Flex>
    </div>
  );
};

export default Tags;