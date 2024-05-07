import './Comment.scss'

export default function Comment({ comment, isReply }) {
  return (
    <div className={`Comment ${isReply ? 'reply' : ''} `}>
      <div className="Comment__pfp">
        <img src={comment.pfp} />
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
