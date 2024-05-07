import { TComments } from '../../../store/features/postSlice'
import Comment from '../Comment/Comment'
import './CommentBar.scss'

interface ICommentBar {
  comments: TComments[]
}

export default function CommentBar({ comments }: ICommentBar) {
  return (
    <>
      {
        comments.map(comment => {
          return <div key={comment.id} className='CommentBar'>
            <Comment isReply={false} comment={comment} />
            {
              comment.replies ? comment.replies.map(reply => {
                return <Comment key={reply.id} comment={reply} isReply={true} />
              }) : null
            }
          </div>
        })
      }
    </>
  )
}
