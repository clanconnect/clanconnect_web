import React from 'react';
import { Spin } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import CommentProfile from '../CommentProfile';
import { commentData } from 'common/dataManager';
import './styles.scss';

export default class CustomScroll extends React.Component {
  state = {
    items: commentData.slice(0, 5),
    hasMore: true,
  };

  fetchMoreData = () => {
    if (this.state.items.length >= commentData.length) {
      this.setState({ hasMore: false });
      return;
    }

    setTimeout(() => {
      this.setState({
        items: commentData.slice(0, 5).concat(this.state.items),
      });
    }, 500);
  };

  render() {
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        loader={
          <div className='loader-row'>
            <Spin />
          </div>
        }
        height={300}
        endMessage={
          <p className='seen-text'>Yay! You have seen it all Comments</p>
        }
      >
        <div>
          {this.state.items.map((item, index) => (
            <CommentProfile data={item} key={index} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}
