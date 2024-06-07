import { formatDate } from '../../../hooks/dateFormat'
import { TComments, TReplies } from '../../../store/features/post/postSlice'
import './Comment.scss'

interface commentComponent {
  comment: TReplies,
  isReply: boolean,
  replyData: TComments | null
  setReplyData: React.Dispatch<React.SetStateAction<TReplies | null>>
}

export default function Comment({ comment, isReply, replyData, setReplyData }: commentComponent) {
  const handleClick = (comment: TReplies) => {
    replyData?.commentId === comment.commentId
      ? setReplyData(null)
      : setReplyData(comment)
  }
  return (
    <div className={`Comment ${isReply ? 'reply' : ''} `}>
      <div className="Comment__pfp">
        <img src={comment.pfp} alt='profile picture' />
      </div>
      <div className="Comment__box">
        <div className="top">
          <h5>{comment.fname}</h5>
          <p>{formatDate(comment.createdAt)}</p>
          <span className={`${comment.commentId === replyData?.commentId ? 'clicked' : ''}`} onClick={() => handleClick(comment)}>&#xF51F;</span>
        </div>
        <p>{comment.content}</p>
      </div>
    </div>
  )
}
