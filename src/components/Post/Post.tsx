import InfoBar from './InfoBar/InfoBar'
import './Post.scss'
import { PostState, TComments } from '../../store/features/post/postSlice';
import CommentBar from './CommentBar/CommentBar';
import CommentInput from './CommentInput/CommentInput';
import { useState } from 'react';
import { formatDate } from '../../hooks/dateFormat';
import { deletePost } from '../../store/features/post/postThunks';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store/setup';
import { getUserID } from '../../store/features/userInfo/userInfoSlice';

export type TInsigths = {
  likesCount: number,
  commentsCount: number
}

export default function Post({ postData }: { postData: PostState }) {
  const [activeDelete, setActiveDelete] = useState(null);
  const dispatch = useDispatch<AppDispatch>();
  const [replyData, setReplyData] = useState<TComments | null>(null);
  const userId = useSelector(getUserID)

  const handleDeleteButton = (postId: number) => {
    if (activeDelete === postId) setActiveDelete(null)
    else setActiveDelete(postId)
  }

  const countComments = (comments: TComments[] | null) => {
    if (!comments) {
      return 0;
    }

    const commentCount = comments.length + comments.reduce((acc, comment) => {
      return acc + (comment.replies ? comment.replies.length : 0);
    }, 0);

    return commentCount;
  };

  return (
    <div className='Post'>
      <div className="Post__user">
        <div>
          <img className='pfp' src={postData.pfp} alt='profile picture' />
          <div className="name">
            <h5>{postData.fname}</h5>
            <span>Published: {formatDate(postData.createdAt)}</span>
          </div>
        </div>
        <div className="delete">
          <span onClick={() => handleDeleteButton(postData.postId)}>&#xF5D4;</span>
          {
            postData.userId == userId &&
            <button
              onClick={() => dispatch(deletePost(postData.postId))}
              className={activeDelete ? 'active' : 'not-active'}
            >
              Delete Post
            </button>
          }
        </div>
      </div>
      <div className="Post__content">
        {postData.content && <p>{postData.content}</p>}
        {(postData.image) && <img className='pfp' src={postData.image} alt='profile picture' />}
        <InfoBar likesCount={postData.likes} commentsCount={countComments(postData.comments)} />
      </div>
      {
        postData.comments &&
        <div className="Post__comments">
          <CommentBar replyData={replyData} setReplyData={setReplyData} comments={postData.comments} />
        </div>
      }
      <CommentInput replyData={replyData} setReplyData={setReplyData} post={postData} />
    </div>
  )
}