import { TComments, TReplies } from '../../../store/features/post/postSlice'
import Comment from '../Comment/Comment'
import './CommentBar.scss'

interface ICommentBar {
  comments: TComments[],
  replyData: TComments | null,
  setReplyData: React.Dispatch<React.SetStateAction<TReplies | null>>
}

export default function CommentBar({ comments, replyData, setReplyData }: ICommentBar) {
  return (
    <>
      {
        comments.map(comment => {
          return <div key={comment.commentId} className='CommentBar'>
            <Comment replyData={replyData} setReplyData={setReplyData} isReply={false} comment={comment} />
            {
              comment.replies ? comment.replies.map(reply => {
                return <Comment replyData={replyData} setReplyData={setReplyData} key={reply.commentId} comment={reply} isReply={true} />
              }) : null
            }
          </div>
        })
      }
    </>
  )
}
