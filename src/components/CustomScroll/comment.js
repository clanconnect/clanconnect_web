/* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { Waypoint } from "react-waypoint";
// import { useSelector, useDispatch } from "react-redux";
// import CommentProfile from "../CommentProfile";
// import { getCommentsAction } from "redux/brands/comments/actions";
// import { Spin, Empty } from "antd";

// const Comment = (props) => {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   const [loader, setLoader] = useState(false);
//   const [commentsData, setCommentsData] = useState([]);
//   const [commentsDataLocalTs, setCommentsDataTs] = useState([]);
//   const [emptystate, setEmptystate] = useState(false);
//   const { meta, commentData, commentDataTs } = useSelector(
//     (store) => store.comments
//   );

//   const { creativeId } = props;
//   //   useEffect(() => {
//   //     getCommentsData();
//   //     // eslint-disable-next-line react-hooks/exhaustive-deps
//   //   }, []);

//   //   const getCommentsData = () => {
//   //     setLoader(true);

//   //     dispatch(getCommentsAction({ page, id: creativeId }));
//   //   };

//   //   useEffect(() => {
//   //     if (commentDataTs !== commentsDataLocalTs && commentData) {
//   //       setCommentsData(commentData);
//   //       setLoader(false);
//   //     }
//   //   }, []);

//   return (
//     <div className="demo-class">
//       {commentData &&
//         commentData.map((item, index) => {
//           if (index === commentData.length - 1) {
//             return (
//               <>
//                 <CommentProfile data={item} key={`comment-${item.id}`} />
//                 {!loader && page < meta?.totalPages && (
//                   <Waypoint onEnter={() => setPage(page + 1)} />
//                 )}
//               </>
//             );
//           }
//           return <CommentProfile data={item} key={`comment-${item.id}`} />;
//         })}
//       {/* {loader && Loading} */}
//       {!loader ? null : (
//         <div className="loader-row">
//           <Spin />
//         </div>
//       )}

//       {commentData.length === 0 && (
//         <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: "0px" }} />
//       )}
//     </div>
//   );
// };
// export default Comment;

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommentProfile from "../CommentProfile";
import { getCommentsAction } from "redux/brands/comments/actions";
import { Spin, Empty } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const Comment = (props) => {
  const { creativeId } = props;
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const { meta, commentData, commentDataTs } = useSelector(
    (store) => store.comments
  );
  console.log("commentData ====>", commentData);
  useEffect(() => {
    dispatch(getCommentsAction({ page: 1, id: creativeId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const fetchMoreData = () => {
    const nextPage = page + 1;
    if (nextPage <= meta?.totalPages && nextPage === meta?.nextPage) {
      setPage(nextPage);
      dispatch(getCommentsAction({ page: nextPage, id: creativeId }));
      console.log("Fetch More Data", nextPage, meta);
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
        display: "flex",
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
          commentData.map((item, index) => {
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

export default Comment;

// const Comments = () => {
//   const { meta, commentData, commentDataTs } = useSelector(
//     (store) => store.comments
//   );
//   return (
//     <>
//       {commentData &&
//         commentData.map((item, index) => {
//           return <CommentProfile data={item} key={`comment-${item.id}`} />;
//         })}
//       {commentData.length === 0 && (
//         <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: "0px" }} />
//       )}
//     </>
//   );
// };
