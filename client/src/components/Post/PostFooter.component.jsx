import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { likePost, unlikePost } from '../../redux/actions/postAction'

const PostFooter = ({likes, comments, postId}) => {
  const [isLike, setIsLike] = useState(false)
  const {userInfo: {userId}} = useSelector(state => state.auth)
  const {posts} = useSelector(state => state.homePosts);
  const dispatch = useDispatch();

  const targetPost = posts.find(item => item._id === postId);

  useEffect(() => {
    if(likes.includes(userId)) {
      setIsLike(true)
    }
  }, [likes, userId]) 

  const handleLike = async () => {
    dispatch(likePost(targetPost));
    setIsLike(true)
  };

  const handleUnLike = async () => {
    setIsLike(false)
    dispatch(unlikePost(targetPost));
  };

    return (
        <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          borderTop: "1px solid #e5e0e0",
          borderBottom: "1px solid #e5e0e0",
          padding: "10px 0",
        }}
        className="my-4"
      >
        <div style={{ color: isLike ? "#05a684" : "#808080", cursor: "pointer"}} onClick={isLike ? handleUnLike : handleLike}>
          <span className="like-count mx-1"
          >{likes.length}</span>Like
        </div>
        <div style={{ color: "#808080" }}>
          <span className="comment-count mx-1">{comments.length}</span>Comment
        </div>
        <div style={{ color: "#808080" }}>
          <span className="share-count mx-1">10</span>Share
        </div>
      </div>
    )
}

export default PostFooter
