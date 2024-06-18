import './Reload.scss'
export default function Reload({ func }) {
  return (
    <div className="reload" onClick={() => func()}>
      <span>&#xF116;</span>
    </div>
  )
}
