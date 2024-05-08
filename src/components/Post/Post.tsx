import InfoBar from './InfoBar/InfoBar'
import './Post.scss'
import { PostState } from '../../store/features/postSlice';
import CommentBar from './CommentBar/CommentBar';
import CommentInput from './CommentInput/CommentInput';

export type TInsigths = {
  id: string;
  views: number;
  comments: number;
  likes: number;
  dislikes: number;
}

const dateOptions: Intl.DateTimeFormatOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  hour12: true
};

export default function Post({ postData }: { postData: PostState }) {

  const formatDate = (date: Date) => new Intl.DateTimeFormat('en-US', dateOptions).format(date);

  return (
    <div className='Post'>
      <div className="Post__user">
        <img className='pfp' src={postData.pfp} />
        <div className="name">
          <h5>{postData.name}</h5>
          <span>Published: {formatDate(postData.date)}</span>
        </div>
      </div>
      <div className="Post__content">
        {(postData.img || postData.file) && <img className='pfp' src={postData.img ?? ''} />}
        <InfoBar insights={postData.insights} />
        {postData.text && <p>{postData.text}</p>}
      </div>
      {
        postData.comments &&
        <div className="Post__comments">
          <CommentBar comments={postData.comments} />
        </div>
      }
      <CommentInput post={postData} />
    </div>
  )
}