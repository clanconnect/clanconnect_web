import React from 'react';
import { Badge, Checkbox } from 'antd';
import user from 'assets/images/user.jpg';

import './styles.scss';

const CommentProfile = ({ data }) => {
  console.log(data, 'data');
  return (
    <div className='comment-profile'>
      <img src={user} className='user-icon' />
      <div className='user-chat'>
        <div className='flex justify-between'>
          <h4 className='msg-title'>{data?.username}</h4>
          <span className='msg-date'>{data?.date}</span>
        </div>
        <p className='msg-para'>{data?.userComment}</p>
      </div>
    </div>
  );
};

export default CommentProfile;
