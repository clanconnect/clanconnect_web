import React from "react";
import { Spin } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import CommentProfile from "../CommentProfile";
// import { commentData } from 'common/dataManager';
import "./styles.scss";

export default class CustomScroll extends React.Component {
  state = {
    items: this.props.commentData.slice(0, 5),
    hasMore: true,
    emptystate: false,
  };

  fetchMoreData = () => {
    const { commentData } = this.props;
    if (this.state.items.length >= commentData.length) {
      this.setState({ hasMore: false });
      return;
    }

    setTimeout(() => {
      const { commentData } = this.props;
      this.setState({
        items: commentData.slice(0, 5).concat(this.state.items),
      });
    }, 500);
  };

  // componentDidMount() {
  //   if (this.state.items.length === 0) {
  //     this.setState({ hasMore: false });
  //     this.setState({ emptystate: true });
  //   }
  // }

  render() {
    console.log(this.state.items);
    return (
      <InfiniteScroll
        dataLength={this.state.items.length}
        next={this.fetchMoreData}
        hasMore={this.state.hasMore}
        loader={
          <div className="loader-row">
            <Spin />
          </div>
        }
        height={300}
        endMessage={
          this.state.emptystate ? (
            <p className="seen-text">No Comments...</p>
          ) : (
            <p className="seen-text">Yay! You have seen it all Comments</p>
          )
        }
      >
        <div>
          {this.state.items.map((item) => (
            <CommentProfile data={item} key={item.id} />
          ))}
        </div>
      </InfiniteScroll>
    );
  }
}
