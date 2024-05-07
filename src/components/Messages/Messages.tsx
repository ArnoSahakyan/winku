import './Messages.scss'
import MessagesContent from './MessagesContent/MessagesContent'
import Title from '../shared/Title/Title'

export default function Messages() {
  return (
    <div className='Messages'>
      <div className="Messages__top">
        <Title title={<><span>&#xF18A;</span> All Messages</>} />
        <span>&#xF5D4;</span>
      </div>
      <MessagesContent />
    </div>
  )
}
