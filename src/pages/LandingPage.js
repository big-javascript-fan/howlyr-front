import React from 'react';
import Flickity from 'react-flickity-component';
import Footer from '../components/Footer';
import HamburgerMenu from '../components/HamburgerMenu';
import '../styles/landing.scss';
import '../styles/burger.scss';

// image assets
import dogImage from '../images/dog-image.png';
import trending from '../images/trending.jpg';
import send from '../images/send.jpg';
import message from '../images/message.jpg';
import treat from '../images/treat.png';
import howlyrPhone from '../images/Howlyr_phone_2.png';
import howlyrLogo from '../images/howlry_logo.png';
import facebookIcon from '../images/icon-facebook_teal.png';
import twitterIcon from '../images/icon-twitter_teal.png';
import instagramIcon from '../images/icon-instagram_teal.png';
import download from '../images/download-badge.png';
import howlyrLogoWhite from '../images/howlry_logo_white.png';

const flickityOptions = {
   initialIndex: 2
}

const LandingPage = () => {
   return (
      <>
         <HamburgerMenu />
         <main>
            <div className="row justify-content-center">
               <div id="left" className="col-12"> 
                  <div id="treat">
                     <img src={treat}/>
                  </div>
               </div>
               <div id="middle" className="col-12">
                  <Flickity
                     className={'carousel'}
                     elementType={'div'}
                     options={flickityOptions}
                     reloadOnUpdate={true}
                     options={{ wrapAround: true, autoPlay: 6500}}
                     static
                  >
                     <div className="carousel-cell"> 
                        <img style={{ width: '100%' }} src={dogImage}/> 
                     </div>
                     <div className="carousel-cell"> 
                        <img style={{ width: '100%' }} src={trending}/> 
                     </div>
                     <div className="carousel-cell"> 
                        <img style={{ width: '100%' }} src={send}/> 
                     </div>
                     <div className="carousel-cell"> 
                        <img style={{ width: '100%' }} src={message}/> 
                     </div>
                  </Flickity>
                  <div className="iphone-frame">
                     <div><img src={howlyrPhone}/></div>
                  </div>
               </div> 
               <div className="clear"></div>
               <div id="right" className="col-12">
                  <div className="howlyr-logo_2">
                     <img src={howlyrLogo}/> 
                  </div>
                  <h2> 
                     At a loss for words? <br/>
                     <span> 
                        There's a Howl for that. 
                     </span>
                  </h2>
                  <h2>Search. Favorite. Share </h2>
                  <h2>
                     Create the Soundtrack <br/>
                     of your life. 
                  </h2>
                  <div className="actions">
                     <div id="badge"> 
                        <a href="https://itunes.apple.com/us/app/howlyr-audio-messaging-memes/id1434219368?ls=1&mt=8">
                           <img src={download} /> 
                        </a> 
                     </div>
                     <div id="social"> 
                        <ul> 
                           <li> <a href="fb://profile/347833315776031" className="facebook"><img src={facebookIcon} /></a> </li>
                           <li> <a href="https://twitter.com/howlyrapp"> <img src={twitterIcon} /> </a>  </li>
                           <li> <a href="https://www.instagram.com/howlyrapp/"> <img src={instagramIcon} /> </a> </li>
                        </ul>
                        <div className="clear"></div>
                     </div>
                  </div>
               </div>
            </div>
         </main>
         <Footer/>
      </>
   )
}

export default LandingPage;