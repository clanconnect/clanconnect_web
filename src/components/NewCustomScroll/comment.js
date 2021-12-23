import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentProfile from "../CommentProfile";
import { getCommentsAction } from "redux/brands/comments/actions";
import { Spin, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const NewComment = (props) => {
  const { creativeId } = props;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { meta, commentData } = useSelector((store) => store.comments);

  useEffect(() => {
    dispatch(getCommentsAction({ page: 1, id: creativeId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchMoreData = () => {
    const nextPage = page + 1;
    if (nextPage <= meta?.totalPages && nextPage === meta?.nextPage) {
      setPage(nextPage);
      dispatch(getCommentsAction({ page: nextPage, id: creativeId }));
      return;
    }
    if (nextPage >= meta?.totalPages) {
      setHasMore(false);
    }
  };
  return (
    <div
      id="scrollableDiv"
      className="demo-class"
      style={{
        overflow: "auto",
        flexDirection: "column-reverse",
      }}
    >
      <InfiniteScroll
        dataLength={commentData.length}
        next={fetchMoreData}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        inverse={true}
        hasMore={hasMore}
        loader={
          <div className="loader-row">
            <Spin />
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        {commentData &&
          commentData.sort(({ createdAt: previousID }, { createdAt: currentID }) => previousID >currentID? 1:-1).map((item, index) => {
            return <CommentProfile data={item} key={`comment-${item.id}`} />;
          })}
        {commentData.length === 0 && (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            style={{ margin: "0px" }}
          />
        )}
      </InfiniteScroll>
    </div>
  );
};

export default NewComment;
