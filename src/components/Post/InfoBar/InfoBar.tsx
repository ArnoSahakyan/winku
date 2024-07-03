import './InfoBar.scss'
import { TInsigths } from '../Post'
import { likePost, unlikePost } from '../../../store/features/post/postThunks';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../store/setup';
import { PostState } from '../../../store/features/post/postSlice';

const formatNumber = (number: number) => {
  const symbols = ['K', 'M', 'B', 'T'];
  const tier = Math.log10(Math.abs(number)) / 3 | 0;
  if (tier === 0) return number;
  const suffix = symbols[tier - 1];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  return scaled.toFixed(1) + suffix;
};

export default function InfoBar({ post, commentsCount }: TInsigths) {

  const handleLike = (post: PostState) => {
    const data = {
      postId: post.postId,
      userId: post.userId
    }
    !post.likedByUser
      ? dispatch(likePost(data))
      : dispatch(unlikePost(data))
  }

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div className='InfoBar'>
      <ul>
        <li className={post.likedByUser ? "liked" : "not-liked"} onClick={() => handleLike(post)}>
          {post.likedByUser ? <>&#xF415;</> : <>&#xF417;</>} <span>{formatNumber(post.likeCount)}</span>
          <p>Likes</p>
        </li>
        <li className='comment'>
          &#xF268; <span>{formatNumber(commentsCount)}</span>
          <p>Comments</p>
        </li>
        <li className='share'>
          &#xF52D;
        </li>
      </ul>
    </div>
  )
}
