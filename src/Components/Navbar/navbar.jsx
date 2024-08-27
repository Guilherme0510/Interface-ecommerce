import React, { useContext, useState } from 'react';
import './navbar.css';
import logo from '../Assets/Frontend_Assets/logo.png';
import cart_icon from '../Assets/Frontend_Assets/cart_icon.png';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';

const Navbar = () => {
  const [menu, setMenu] = useState('shop');
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="Logo" />
        <p>SHOPPER</p>
      </div>
      <ul className="nav-menu">
        <li onClick={() => { setMenu('shop'); }}> 
          <Link to="/">Shop</Link>  
          {menu === 'shop' ? <hr /> : <></>} 
        </li>
        <li onClick={() => { setMenu('mens'); }}> 
          <Link to="mens">Men</Link>  
          {menu === 'mens' ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu('womens'); }}> 
          <Link to="womens">Women</Link>  
          {menu === 'womens' ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu('kids'); }}> 
          <Link to="kids">Kids</Link>  
          {menu === 'kids' ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
        ?
      <button className='btn-logout' onClick={() => {localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
      :
      <Link to="/login"><button>Login</button></Link>}
        
        <Link to="/cart"><img src={cart_icon} alt="Cart Icon" /></Link>
        <div className="nav-cart-count">
          {getTotalCartItems()}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
