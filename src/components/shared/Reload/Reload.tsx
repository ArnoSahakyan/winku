import './Reload.scss'

type ReloadProps = {
  func: () => void;
};

export default function Reload({ func }: ReloadProps) {
  return (
    <div className="reload" onClick={() => func()}>
      <span>&#xF116;</span>
    </div>
  )
}
