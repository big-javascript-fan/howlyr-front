import React, {useState, useEffect, useRef} from 'react';
import { reportClip } from '../apis/Api';

import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import ShareIcon from '@material-ui/icons/Share';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import LinkIcon from '@material-ui/icons/Link';
import FlagIcon from '@material-ui/icons/Flag';
import CloseIcon from '@material-ui/icons/Close';

import { useToasts } from 'react-toast-notifications';
import cardImage from '../images/brent-profile.jpg';
import bgImage from '../images/background-2.jpg';
import '../styles/styles.scss';

const Card = (props) => {
   const { onClick, item, selectedItem } = props;
   const [pause, setPause] = useState(false);
   const [isShow, setIsShow] = useState(false);
   const [showModal, setShowModal] = useState(false);
   const [showReport, setShowReport] = useState(false);
   const [reportError, setReportError] = useState(null);
   const [isCopiedTooltip, showCopiedTooltip] = useState(false);
   const { addToast } = useToasts();
   const modalRef = useRef(null);

   useEffect(() => {
      const handleClickOutside = (event) => {
         if (modalRef.current && !modalRef.current.contains(event.target)) {
            setShowModal(false);
            setShowReport(false);
            setReportError(null);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener("mousedown", handleClickOutside);
      };
   }, [modalRef]);

   useEffect(() => {
      if(selectedItem === null) {
         stopAudio();
      }
      if(selectedItem !== item) {
         setPause(false);
      }
   }, [selectedItem]);

   const stopAudio = async () => {
      let audioElement = document.getElementById('audio-play');
      await audioElement.pause();
   }

   const checkOne = (index) => {
      setReportError(null);
      let checkBoxList = [0,1,2,3,4,5];
      let checkElements = document.getElementsByClassName('checkbox');
      checkElements[index].checked = true;
      checkBoxList.splice(index, 1);
      for(let j = 0; j<checkBoxList.length; j++) {
         checkElements[checkBoxList[j]].checked = false;
      }
   }

   const handleReport = async (clipId) => {
      let checkElements = document.getElementsByClassName('checkbox');
      let checkedArray = '';
      for(let i = 0; i<checkElements.length; i++ ) {
         if(checkElements[i].checked) {
            checkedArray = i + 1;
            break;
         }
      }
      if(checkedArray) {
         let response = await reportClip(clipId, checkedArray);
         if(response.success) {
            setShowModal(false);
            addToast('Reported Successfully!', { appearance: 'success' });
         }
      } else {
         setReportError('Please check the reason.');
      }
   }

   const handleCopiedTooltip = () => {
      if(isCopiedTooltip === false) {
         showCopiedTooltip(true);
         setTimeout(() => {
            showCopiedTooltip(false);
         }, 1000);
      }
   }
   
   return (
      <div className="card-container">
         <div 
            className="card-thumbnail" 
            onMouseEnter={() => {
               setIsShow(true);
            }}
            onMouseLeave = {() => {
               setIsShow(false);
            }}
         >
            <img src={item.imagePath} className="card-image" />
         </div>
         {
            (isShow || pause) ? 
            <div 
               className="card-play"
               onMouseEnter={() => {
                  setIsShow(true);
               }}
               onMouseLeave = {() => {
                  setIsShow(false);
               }}
            >
               {
                  !pause ? 
                     <PlayArrowIcon 
                        className="card-btn-play"
                        onClick={async () => {
                           setPause(true);
                           props.onPlayClick(item);
                           let audioElement = document.getElementById('audio-play');
                           await audioElement.pause();
                           audioElement.src = item.audioPath;
                           await audioElement.play();
                           audioElement.onended = function() {
                              setPause(false);
                           }
                        }} 
                     /> :
                     <PauseIcon 
                        className="card-btn-pause"
                        onClick={async () => {
                           setPause(false);
                           let audioElement = document.getElementById('audio-play');
                           await audioElement.pause();
                        }}
                     />
               }
            </div> : null
         }
         <div 
            className="card-title" 
            onClick={() => {
               if(onClick) {
                  onClick();
               }
            }}
         >
            <span>{item.content.length > 45 ? item.content.substr(0, 45) + '...' : item.content}</span>
         </div>
         <div className="card-share">
            <ShareIcon 
               className="share-btn" 
               onClick={() => {
                  setShowModal(true);
               }}
            />
            {
               showModal && <div className="share-modal" ref={modalRef}>
                  <div className="close-btn">
                     <CloseIcon className="close" onClick={()=>{
                        setShowModal(false);
                        setShowReport(false);
                     }} />
                  </div>
                  <div className={!showReport ? "text-center" : "text-center report"}>
                     {!showReport ? 'SHARE' : 'Reason for Reporting Howl'}
                  </div>
                  {
                     !showReport ? <>
                           <div className="row justify-content-around align-items-center w-100 m-0">
                              <div className="btn-outline"
                                 onClick={() => {
                                    window.open(
                                       'https://www.facebook.com/sharer.php?u=' + encodeURIComponent(`${window.origin}/profile/${item.id}`),
                                       "Share to Facebook",
                                       "width=500,height=500"
                                    )
                                 }}
                              >
                                 <FacebookIcon className="btn-icon" />
                              </div>
                              <div className="btn-outline">
                                 <TwitterIcon className="btn-icon"
                                    onClick={() => {
                                       window.open(
                                          'https://twitter.com/intent/tweet?url=' + encodeURIComponent(`${window.origin}/profile/${item.id}`) + '&text= &via= &hashtags= ',
                                          "Share to Twitter",
                                          "width=500,height=500"
                                       )
                                    }}
                                 />
                              </div>
                              <div className="btn-outline">
                                 <LinkIcon className="btn-icon"
                                    onClick = {() => {
                                       const el = document.createElement('textarea');
                                       el.value = `${window.origin}/profile/${item.id}`;
                                       document.body.appendChild(el);
                                       el.select();
                                       document.execCommand('copy');
                                       document.body.removeChild(el);
                                       handleCopiedTooltip();
                                    }}
                                 />
                                 <span className={isCopiedTooltip?"copy-tooltip active": "copy-tooltip"}>Copied</span>
                              </div>
                           </div> 
                           <div
                              className="row justify-content-center align-items-center m-2" 
                              id="report-btn"
                              onClick={() => {
                                 setShowReport(true);
                              }}
                           >
                              <FlagIcon className="btn-icon"/>
                              <span className="text-white">REPORT HOWL</span>
                           </div> 
                        </> : 
                        <>
                           <div className="checkbox-row">
                              <input type="checkbox" onClick={() => checkOne(0)} className="checkbox" value="Offensive content" />
                              <span>Offensive content</span>  
                           </div>
                           <div className="checkbox-row">
                              <input type="checkbox" onClick={() => checkOne(1)} className="checkbox" value="Incorrectly Tagged" />
                              <span>Incorrectly Tagged</span>  
                           </div>
                           <div className="checkbox-row">
                              <input type="checkbox" onClick={() => checkOne(2)} className="checkbox" value="Safety Issue or Illegal" />
                              <span>Safety Issue or Illegal</span>  
                           </div>
                           <div className="checkbox-row">
                              <input type="checkbox" onClick={() => checkOne(3)} className="checkbox" value="Commercial or Spam" />
                              <span>Commercial or Spam</span>  
                           </div>
                           <div className="checkbox-row">
                              <input type="checkbox" onClick={() => checkOne(4)} className="checkbox" value="Posted in Error" />
                              <span>Posted in Error</span>  
                           </div>
                           <div className="checkbox-row">
                              <input type="checkbox" onClick={() => checkOne(5)} className="checkbox" value="Infringement Claim" />
                              <span>Infringement Claim</span>  
                           </div>
                           <div className="error-container">
                              <span className="error-text">{reportError}</span>
                           </div>
                           <div
                              className="row justify-content-center align-items-center m-2" 
                              id="report-btn-red"
                              onClick={() => {
                                 handleReport(item.id)
                              }}
                           >
                              <span className="text-white">REPORT HOWL</span>
                           </div>
                        </>
                  }
               </div>
            }
            
         </div>
               
      </div>
   )
}

export default Card;