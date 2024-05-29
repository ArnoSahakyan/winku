import './Friend.scss'

type TUser = {
  id: string;
  name: string;
  email: string;
  onlineStatus: string;
  img: string;
}

type FriendProps = {
  user: TUser;
  onlyImg: boolean
}

export default function Friend({ user, onlyImg }: FriendProps) {
  return (
    <div className='Friend'>
      <div className="Friend__img">
        <img src={user.img} alt={user.name} />
        <div className={`status ${user.onlineStatus}`}></div>
      </div>
      {
        onlyImg ? null
          : <div className="Friend__content">
            <h6>{user.name}</h6>
            <p>{user.email}</p>
          </div>
      }

    </div>
  )
}
