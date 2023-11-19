import './styles.css'

const Button = ({ text, isActive }) => {
  return (
    <button className={`btn ${isActive ? 'active' : ''}`}>
      {text}
    </button>
  )
}

export default Button