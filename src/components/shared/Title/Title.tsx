import './Title.scss'

export default function Title({ title }: { title: JSX.Element }) {
  return (
    <h4 className='Title'>{title}</h4>
  )
}
