/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { useSelector, useDispatch } from 'react-redux';
import CommentProfile from '../CommentProfile';
import { getCommentsAction } from 'redux/brands/comments/actions';
import { Spin, Empty } from 'antd';

const Comment = (props) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  const [commentsData, setCommentsData] = useState([]);
  const [commentsDataLocalTs, setCommentsDataTs] = useState([]);
  const [emptystate, setEmptystate] = useState(false);
  const { meta, commentData, commentDataTs } = useSelector(
    (store) => store.comments
  );

  const { creativeId } = props;
  useEffect(() => {
    getCommentsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const getCommentsData = () => {
    setLoader(true);

    dispatch(getCommentsAction({ page, id: creativeId }));
  };

  useEffect(() => {
    if (commentDataTs !== commentsDataLocalTs && commentData) {
      setCommentsData(commentData);
      setLoader(false);
    }
  }, [commentData, commentDataTs, commentsDataLocalTs]);

  return (
    <div className='demo-class'>
      {commentData &&
        commentData.map((item, index) => {
          if (index === commentData.length - 1) {
            return (
              <>
                <CommentProfile data={item} key={`comment-${index}`} />
                {!loader && page < meta?.totalPages && (
                  <Waypoint onEnter={() => setPage(page + 1)} />
                )}
              </>
            );
          } else {
            return <CommentProfile data={item} key={`comment-${index}`} />;
          }
        })}
      {/* {loader && Loading} */}
      {!loader ? (
        ''
      ) : (
        <div className='loader-row'>
          <Spin />
        </div>
      )}

      {commentData.length === 0 && (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: '0px' }} />
      )}
    </div>
  );
};
export default Comment;
