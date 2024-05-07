import { newtonsCradle, helix } from 'ldrs'
newtonsCradle.register()
helix.register()
import './Loader.scss'


export default function Loader() {
  return (
    <div className='Loader'>
      <l-helix
        size="100"
        speed="2.5"
        color="white"
      ></l-helix>
    </div>
  )
}
