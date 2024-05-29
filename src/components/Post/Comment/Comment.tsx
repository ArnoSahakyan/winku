import { TReplies } from '../../../store/features/postSlice'
import './Comment.scss'


export default function Comment({ comment, isReply }: { comment: TReplies, isReply: boolean }) {
  return (
    <div className={`Comment ${isReply ? 'reply' : ''} `}>
      <div className="Comment__pfp">
        <img src={comment.pfp} alt='profile picture' />
      </div>
      <div className="Comment__box">
        <div className="top">
          <h5>{comment.name}</h5>
          <p>{comment.date}</p>
          <span>&#xF51F;</span>
        </div>
        <p>{comment.message}</p>
      </div>
    </div>
  )
}
