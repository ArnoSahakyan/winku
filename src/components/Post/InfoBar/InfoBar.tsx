import './InfoBar.scss'
import { TInsigths } from '../Post'

const formatNumber = (number: number) => {
  const symbols = ['K', 'M', 'B', 'T'];
  const tier = Math.log10(Math.abs(number)) / 3 | 0;
  if (tier === 0) return number;
  const suffix = symbols[tier - 1];
  const scale = Math.pow(10, tier * 3);
  const scaled = number / scale;
  return scaled.toFixed(1) + suffix;
};

export default function InfoBar({ insights }: { insights: TInsigths }) {

  return (
    <div className='InfoBar'>
      <ul>
        <li>
          &#xF341; <span>{formatNumber(insights.views)}</span>
          <p>Views</p>
        </li>
        <li>
          &#xF268; <span>{formatNumber(insights.comments)}</span>
          <p>Comments</p>
        </li>
        <li>
          &#xF417; <span>{formatNumber(insights.likes)}</span>
          <p>Likes</p>
        </li>
        <li>
          &#xF771; <span>{formatNumber(insights.dislikes)}</span>
          <p>Dislikes</p>
        </li>
        <li className='share'>
          &#xF52D;
        </li>
      </ul>
    </div>
  )
}
