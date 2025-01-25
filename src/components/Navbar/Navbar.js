import {Link} from 'react-router-dom'



import './Navbar.css'

const Navbar = props => {
 

  return (
    <nav className="nav-header">
    <div className="nav-content">
     

      <div className="nav-bar-large-container">
        <Link to="/" className="shopper-logo-name">
        <span >Sample App</span>
        </Link>
      
        <ul className="nav-menu">
         

          

          <li className="nav-menu-item">
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
             Home
            </Link>
          </li>
        </ul>
        
      </div>
    </div>
   
   
  </nav>
  )
}

export default Navbar;
