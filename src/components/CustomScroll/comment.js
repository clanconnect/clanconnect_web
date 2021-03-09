import React, { useEffect, useState } from 'react';
import { Waypoint } from 'react-waypoint';
import { useSelector, useDispatch } from 'react-redux';
import CommentProfile from '../CommentProfile';
import { getCommentsAction } from 'redux/brands/comments/actions';
import { Spin } from 'antd';
// import { cloneDeep} from 'lodash'
{
  /* <Waypoint
  onEnter={this._handleWaypointEnter}
  onLeave={this._handleWaypointLeave}
/> */
}
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
  console.log(meta.totalPages);
  useEffect(() => {
    getCommentsData();
  }, [page]);

  const getCommentsData = () => {
    setLoader(true);
    setTimeout(
      () => dispatch(getCommentsAction({ page, id: creativeId })),
      3000
    );
  };
  useEffect(() => {
    if (commentDataTs !== commentsDataLocalTs && commentData) {
      setCommentsData(commentData);
      setLoader(false);
    }
  }, [commentDataTs]);
  return (
    <div className='demo-class'>
      {commentData &&
        commentData.map((item, index) => {
          if (index == commentData.length - 1) {
            return (
              <>
                <CommentProfile data={item} key={index} />
                {!loader && page < meta?.totalPages && (
                  <Waypoint onEnter={() => setPage(page + 1)} />
                )}
              </>
            );
          } else {
            return <CommentProfile data={item} key={index} />;
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
        <div className='comment-empty'>
          <p>No Comments</p>
        </div>
      )}
    </div>
  );
};
export default Comment;
