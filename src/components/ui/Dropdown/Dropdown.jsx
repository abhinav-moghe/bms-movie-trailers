import './styles.css'
import DownArrow from '../../../assets/down-arrow.png'

import { useState } from 'react'

const Dropdown = ({ displayText, isMultiSelect, options }) => {
  const [open, setOpen] = useState(false)

  const onSelect = (option) => {
    // TO-DO: remove this
    console.log(option)
  }

  return (
    <div
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button className='btn-drop-down'>
        {<span>{displayText}</span>}
        <img className='img-arrow' src={DownArrow} />
      </button>

      {(open && options &&
        <ul className="drop-down-wrap">
          {
            options.map(o =>
              <li className='drop-down-list-item' key={o.text} onClick={() => onSelect(o)}>
                {isMultiSelect && <input type="checkbox" />}
                <span>{o.text}</span>
              </li>)
          }
        </ul>
      )}
    </div>
  )
}

export default Dropdown
