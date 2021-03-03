import React from 'react';
import '../styles/landing.scss';

import howlyrLogoWhite from '../images/howlry_logo_white.png';

const Footer = (props) => {
   const { logo } = props;
   return (
      <footer>
         <div className="row justify-content-center">
            <div className="col-12 col-md-3">
               <a href="index.html"><img src={howlyrLogoWhite}/> </a>
               </div>	
            <div className="col-12 col-md-3">
               <h4> Company </h4>
               <a href="about-howlyr.html">
                  <p> About Howlyr</p>
               </a>
               <a href="community-guidelines.html">
                  <p> Community Guidelines</p>
               </a>
            </div>	
            <div className="col-12 col-md-3">
               <h4> Legal </h4>
               <a href="terms-of-use.html"> 
                  <p> Terms of Use </p> 
               </a>
               <a href="privacy-policy.html">
                  <p> Privacy Policy</p> 
               </a>
            </div>	
            <div className="col-12 col-md-3">
               <h4> Questions? </h4>
               <a href="mailto:support@howlyr.com"> 
                  <p>support@howlyr.com </p>
               </a>
            </div>		
         </div>
      </footer>
   )
}

export default Footer;