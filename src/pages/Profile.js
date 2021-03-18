import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import Footer from '../components/Footer';
import { getClipDetail } from '../apis/Api';
import '../styles/category.scss';
import '../styles/styles.scss';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import howlyrLogo from '../images/howlry_logo.png';
import cardImage from '../images/brent-profile.jpg';


const Profile = (props) => {
   const clipId = props.match.params.clipId;
   const history = useHistory();
   const [clipDetail, setClipDetail] = useState({});
   const [isShow, setIsShow] = useState(false);
   const [pause, setPause] = useState(false);

   useEffect(async() => {
      const detail = await getClipDetail(clipId);
      setClipDetail(detail);
   }, [clipId])

   return (
      <>
         <nav className="navbar sticky-top navbar-expand-lg bg-white navbar-light border-bottom justify-content-between align-items-center">
            <img src={howlyrLogo} className="howlyr-logo" onClick={()=>{
               history.push('/')
            }} />
            <HamburgerMenu />
         </nav>
         <div className="d-flex flex-column justify-content-start align-items-center" id="wrapper-100vh">
            <div className="card-container mt-5 mb-3">
               <div className="card-thumbnail" >
                  <img src={clipDetail.imagePath} className="card-image large" />
               </div>
                  <audio
                     id="audio-detail"
                     src={clipDetail.audioPath}
                     style={{ display: 'none' }}
                  ></audio>
                  <div className="card-play large" >
                     {
                        !pause ? 
                           <PlayArrowIcon 
                              className="card-btn"
                              onClick={() => {
                                 setPause(true);
                                 let audioElement = document.getElementById('audio-detail');
                                 audioElement.play();
                                 audioElement.onended = function() {
                                    setPause(false);
                                 }
                              }} 
                           /> :
                           <PauseIcon 
                              className="card-btn"
                              onClick={() => {
                                 setPause(false);
                                 let audioElement = document.getElementById('audio-detail');
                                 audioElement.pause();
                              }}
                           />
                     }
                  </div>
            </div>
            <div className="description">
               <div className="row m-2 align-items-center">
                  <span className="title font-weight-bold">Lyric/Line:</span>
                  <span className="content">{clipDetail.content}</span>
               </div>
               <div className="row m-2 align-items-center">
                  <span className="title font-weight-bold">Speaker:</span>
                  <span className="content">{clipDetail.speaker}</span>
               </div>
               <div className="row m-2 align-items-center">
                  <span className="title font-weight-bold">Source:</span>
                  <span className="content">{clipDetail.source}</span>
               </div>
            </div>
            <button
               className="btn btn-secondary m-3"
               onClick={() => {
                  history.goBack();
               }}
            >
               <ArrowBackIosIcon style={{width: '15px'}} />
               Back
            </button>
         </div>
         <Footer/>
      </>
   )
}

export default Profile;
