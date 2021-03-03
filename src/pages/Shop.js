import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import Footer from '../components/Footer';
import '../styles/styles.scss';

import howlyrLogo from '../images/howlry_logo.png';

const Shop = () => {
   const history = useHistory();
   return (
      <>
         <nav className="navbar sticky-top navbar-expand-lg bg-white navbar-light border-bottom justify-content-between align-items-center">
            <img src={howlyrLogo} className="howlyr-logo" onClick={()=>{
               history.push('/')
            }} />
            <HamburgerMenu />
         </nav>
         <div className="d-flex flex-column justify-content-center align-items-center pb-5" id="wrapper-100vh">
            <h1 className="shop-title">Coming soon...</h1>
         </div>
         <Footer/>
      </>
   )
}

export default Shop;