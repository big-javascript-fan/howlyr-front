import React from 'react';
import '../styles/landing.scss';

import howlyrLogoWhite from '../images/howlry_logo_white.png';
import { Link } from 'react-router-dom';

const Footer = (props) => {
   const { logo } = props;
   return (
      <footer>
         <div className="row justify-content-center">
            <div className="col-12 col-md-3">
               <Link to="/"><img src={howlyrLogoWhite}/> </Link>
               </div>	
            <div className="col-12 col-md-3">
               <h4> Company </h4>
               <Link to="/about">
                  <p> About Howlyr</p>
               </Link>
               <Link to="/community">
                  <p> Community Guidelines</p>
               </Link>
            </div>	
            <div className="col-12 col-md-3">
               <h4> Legal </h4>
               <Link to="/terms-of-use"> 
                  <p> Terms of Use </p> 
               </Link>
               <Link to="/privacy-policy">
                  <p> Privacy Policy</p> 
               </Link>
            </div>	
            <div className="col-12 col-md-3">
               <h4> Questions? </h4>
               <a href="mailto:support@howlyr.com"> 
                  <p>support@howlyr.com</p>
               </a>
            </div>		
         </div>
      </footer>
   )
}

export default Footer;