import React from 'react';
import { Badge, Input } from 'antd';

import CustomScroll from '../CustomScroll';
import img1 from 'assets/images/project1.jpg';
import chat from 'assets/images/chat.svg';

import './styles.scss';

const CommentBox = ({ name }) => {
  return (
    <div className='comment-box'>
      <div className='comment-scroll'>
        <div className='flex justify-between'>
          <h3 className='chat-title'>Creative Name here</h3>
          <div className='chat-icon'>
            <Badge count={5} size='small'>
              <img src={chat} alt='' className='' width='18' />
            </Badge>
          </div>
        </div>
        <CustomScroll />
      </div>

      <Input placeholder='Type something here…' className='custom-input' />
      <div className='comment-btns'>
        <button className='btn-cancel'>cancel</button>
        <button className='btn-submit'>Submit</button>
      </div>
    </div>
  );
};

export default CommentBox;
