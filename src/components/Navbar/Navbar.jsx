import './styles.css'
import Logo from '../../assets/logo.png'

import { useContext } from 'react'
import Button from '../ui/Button/Button'
import Dropdown from '../ui/Dropdown/Dropdown'
import { DataContext } from '../../App'

const Navbar = () => {
  const { data } = useContext(DataContext)

  return (
    <nav className='container-nav-bar'>
      <div className='nav-bar-left'>
        <img src={Logo} className='img-logo' />

        <Button text={'COMING SOON'} isActive={true} />
        <Button text={'NOW SHOWING'} isActive={false} />
      </div>

      <div className='nav-bar-right'>
        <Dropdown type={'LANG'} displayText={'All Languages'} isMultiSelect={true} options={data.languageList} />
      </div>
    </nav>
  )
}

export default Navbar