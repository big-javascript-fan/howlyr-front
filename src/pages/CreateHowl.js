import React, {useState, useEffect, useRef, useMemo} from 'react';
import { useHistory } from 'react-router-dom';
import HamburgerMenu from '../components/HamburgerMenu';
import Footer from '../components/Footer';
import Carousel from 'nuka-carousel';
import { getThumbnails } from 'video-metadata-thumbnails';
import Draggable from 'react-draggable';
import { uploadHowlWeb, uploadHowlYoutube, ytToS3 } from '../apis/Api';
import { ToastProvider, useToasts } from 'react-toast-notifications';

import TitleIcon from '@material-ui/icons/Title';
import MovieIcon from '@material-ui/icons/Movie';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import BackupIcon from '@material-ui/icons/Backup';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import CircularProgress from '@material-ui/core/CircularProgress';

import howlyrLogo from '../images/howlry_logo.png';
import cardImage from '../images/default.png';
import cardImage1 from '../images/default1.png';
import '../styles/category.scss';
import '../styles/styles.scss';

const checkYoutubeMusicUrl = (link) => {
   return /(?:https?:\/\/)?(?:music\.)?youtu(.be\/|be\.com\/watch\?v=)(.{11,})/g.test(link);
}

const range = (start, end) => {
   return Array(end - start + 1).fill().map((_, idx) => start +idx);
}

const FileUploader = props => {
   const {uploadType, handleFile} = props;
   const hiddenFileInput = useRef(null);
   
   const handleClick = event => {
     hiddenFileInput.current.click();
   };
   const handleChange = event => {
     const fileUploaded = event.target.files[0];
     handleFile(fileUploaded);
   };
   return (
     <>
       <button 
         className="btn btn-secondary m-3"
         type="button"
         onClick={handleClick}>
         Select Files
       </button>
       <input type="file"
              ref={hiddenFileInput}
              onChange={handleChange}
              accept={uploadType == 'audio' ? "audio/*,video/*" : "image/*"}
              style={{display:'none'}} 
       /> 
     </>
   );
};

const PrevVideo = (props) => {
   const {startTime, endTime, file, thumbnail, newPhotoFile} = props;
   const video = useRef(null);
   useEffect(() => {
      if(video) {
         let playBtnIcon = document.getElementById('play-icon');
         let pauseBtnIcon = document.getElementById('pause-icon');
         let audioElement = document.getElementById('audio-field');
         
         let playTimeout;
         if(typeof file == 'string') {
            if(!(video.current.currentTime > startTime && video.current.currentTime < endTime)) {
               video.current.currentTime = startTime;
            }
         } else {
            if(file?.type.split('/')[0] === 'video') {
               if(!(video.current.currentTime > startTime && video.current.currentTime < endTime)) {
                  video.current.currentTime = startTime;
               }
            } else {
               if(!(audioElement.currentTime > startTime && audioElement.currentTime < endTime)) {
                  audioElement.currentTime = startTime;
               }
            }
         }
         
         const playTime = (start, end) => {
            let rangeTime;
            if(typeof file == 'string') {
               rangeTime = (end - video.current.currentTime) * 1000;
            } else {
               if(file?.type.split('/')[0] === 'video') {
                  rangeTime = (end - video.current.currentTime) * 1000;
               } else {
                  rangeTime = (end - audioElement.currentTime) * 1000;
               }
            }
            playTimeout = setTimeout(() => {
               fadeBtn();
               if(typeof file == 'string') {
                  video.current.currentTime = start;
               } else {
                  if(file?.type.split('/')[0] === 'video') {
                     video.current.currentTime = start;
                  } else {
                     audioElement.currentTime = start;
                  }
               }
            }, (rangeTime));
         }
         const fadeBtn = (e) => {
            playBtnIcon.style.display = 'block';
            pauseBtnIcon.style.display = 'none';
            clearTimeout(playTimeout);
            if(typeof file == 'string') {
               video.current.pause();
            } else {
               if(file?.type.split('/')[0] === 'video') {
                  video.current.pause();
               } else {
                  audioElement.pause();
               }
            }
         }
         const showBtn = (e) => {
            playBtnIcon.style.display = 'none';
            pauseBtnIcon.style.display = 'block';
            if(typeof file == 'string') {
               video.current.play();
            } else {
               if(file?.type.split('/')[0] === 'video') {
                  video.current.play();
               } else {
                  audioElement.play();
               }
            }
            playTime(startTime, endTime);
         }
         playBtnIcon.addEventListener('click', showBtn, false);
         pauseBtnIcon.addEventListener('click', fadeBtn, false);
         return () => {
            playBtnIcon.removeEventListener('click', showBtn, false);
            pauseBtnIcon.removeEventListener('click', fadeBtn, false);
         }
      }
   }, [video])

   return (
      <div className="card-container mb-2">
         <div className="card-thumbnail">
            {
               typeof file == 'string' ? 
                  <div className="video-container">
                     <div className="play-button">
                        <PlayArrowIcon id="play-icon"/>
                        <PauseIcon id="pause-icon" />
                     </div>
                     <video
                        src={file} 
                        id="video-play" 
                        width="100%"
                        height="100%"
                        ref={video}
                     />
                  </div> :
               file?.type.split('/')[0] === 'audio' ?
                  <div className="audio-container">
                     <img src={cardImage} className="card-image" />
                     <audio 
                        id="audio-field"
                        src={URL.createObjectURL(file)}
                        preload="metadata"
                     ></audio>
                     <div className="play-button">
                        <PlayArrowIcon id="play-icon" style={{color: '#333'}}/>
                        <PauseIcon id="pause-icon" style={{color: '#333'}} />
                     </div>
                  </div> :
                  <div className="video-container">
                     <div className="play-button">
                        <PlayArrowIcon id="play-icon"/>
                        <PauseIcon id="pause-icon" />
                     </div>
                     <video
                        src={URL.createObjectURL(file)} 
                        id="video-play" 
                        width="100%"
                        height="100%"
                        ref={video}
                     />
                  </div>
            }
         </div>
         <img src={newPhotoFile} id="new-upload-photo" width="300px" height="200px" style={{objectFit: 'contain', position: 'absolute'}} />
      </div>
   )
}

const ShowUploadHowl = (props) => {
   const { showUploadHowl, showTrimContainer, youtubeId, file, startTime, endTime, thumbnail } = props;
   const history = useHistory();
   const { addToast } = useToasts();
   
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const [newThumb, setNewThumb] = useState(null);
   const [title, setTitle] = useState(null);
   const [name, setName]   = useState(null);
   const [speaker, setSpeaker] = useState(null);
   const [tags, setTags]   = useState(null);

   const handleUpload = async () => {
      let image;
      if(!title && !name && !speaker) {
         setError('Please input the required tags');
         return;
      }
      if(!title) {
         setError('Please input the title')
         return ;
      }
      if(!name) {
         setError('Please input the name')
         return ;
      }
      if(!speaker) {
         setError('Please input the speaker name')
         return ;
      }
      if(!newThumb) {
         image = thumbnail.blob;
      } else {
         image = newThumb
      }
      setIsLoading(true);
      setError(null);
      let result;
      if(typeof file == 'string') {
         result = await uploadHowlYoutube(startTime, endTime, youtubeId, image, name, tags, title, speaker);
      } else {
         result = await uploadHowlWeb(startTime, endTime, file, image, name, tags, title, speaker);
      }
      try {
         if(result && result.success) {
            addToast('Upload Successfully!', { appearance: 'success' });
            history.push(`/profile/${result.id}`);
         } else {
            addToast('Upload failed!', { appearance: 'error' });
         }
      } catch(error) {
         addToast('Upload failed!', { appearance: 'error' });
      }
      setIsLoading(false)
   }

   const [newPhotoFile, setNewPhotoFile] = useState(null);

   useEffect(() => {
      let newImgElement = document.getElementById('new-upload-photo');
      newImgElement.style.display = "none";
   }, [])

   const renderVideo = useMemo(() => (
      <PrevVideo startTime={startTime} endTime={endTime} thumbnail={thumbnail} file={file} newPhotoFile={newPhotoFile}/>
   ), [file, startTime, endTime, thumbnail, newPhotoFile]);

   return (
         <div className="d-flex flex-column justify-content-start align-items-center text-center" style={{width: '240px'}} >
            { renderVideo }
            <span className="text-secondary" style={{ cursor: 'pointer' }} onClick={() => showUploadHowl(false)}>
               <small>Re-Crop Howl</small>
            </span>
            <div className="row justify-content-center align-items-center mt-3">
               <span className="font-weight-bold">Upload new thumbnail</span>
               <FileUploader 
                  handleFile={(uploadFile) => {
                     setNewThumb(uploadFile);
                     setNewPhotoFile(URL.createObjectURL(uploadFile));
                     let newImgElement = document.getElementById('new-upload-photo');
                     newImgElement.style.display = "block";

                     if(file?.type && file?.type.split('/')[0] === 'audio') {
                        let imgElementOrigin = document.getElementsByClassName('card-image')[0];
                        if(imgElementOrigin) {
                           imgElementOrigin.style.display="none";
                        }
                     } else {
                        let videoElement = document.getElementById('video-play');
                        if(videoElement) {
                           videoElement.style.display = "none";
                        }
                     }
                  }}
                  uploadType={'image'}
               />
            </div>
            <div className="input-field">
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-sm">
                        <TitleIcon style={{height: '20px'}}/>
                     </span>
                  </div>
                  <input 
                     type="text" 
                     className="form-control" 
                     aria-label="Small" 
                     aria-describedby="inputGroup-sizing-sm"
                     placeholder="Spoken Lyric/Line of Clip"
                     onChange={(event) => setTitle(event.target.value)}
                  />
               </div>
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-sm">
                        <MovieIcon style={{height: '20px'}}/>
                     </span>
                  </div>
                  <input 
                     type="text" 
                     className="form-control" 
                     aria-label="Small" 
                     aria-describedby="inputGroup-sizing-sm"
                     placeholder="Name of Movie, Show, Song, etc"
                     onChange={(event) => setName(event.target.value)}
                  />
               </div>
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-sm">
                        <SettingsVoiceIcon style={{height: '20px'}}/>
                     </span>
                  </div>
                  <input 
                     type="text" 
                     className="form-control" 
                     aria-label="Small" 
                     aria-describedby="inputGroup-sizing-sm"
                     placeholder="Speaker[s] [e.g. Shrek: Mike Myers]"
                     onChange={(event) => setSpeaker(event.target.value)}
                  />
               </div>
               <div className="input-group input-group-sm mb-3">
                  <div className="input-group-prepend">
                     <span className="input-group-text" id="inputGroup-sizing-sm">
                        <LocalOfferIcon style={{height: '20px'}}/>
                     </span>
                  </div>
                  <input 
                     type="text" 
                     className="form-control" 
                     aria-label="Small" 
                     aria-describedby="inputGroup-sizing-sm"
                     placeholder="Tags [e.g. Love: OMG] [Optional]"
                     onChange={(event) => setTags(event.target.value)}
                  />
               </div>
            </div>
            <span className="text-danger">
               { error }
            </span>
            <div className="row mt-5 mb-5">
               <button
                  className="btn btn-secondary m-2"
                  onClick={()=>{
                     showUploadHowl(false)
                  }}
               >
                  <ArrowBackIosIcon style={{width: '15px'}} />
                  Back
               </button>
               <button 
                  className="d-flex justify-content-center align-items-center btn btn-success m-2"
                  onClick={()=>{
                     handleUpload()
                  }}
                  style={{
                     width: '150px'
                  }}
                  disabled = {isLoading && true}
               >
                  {
                     isLoading ? 
                     <CircularProgress style={{width: '20px', height: '20px', color: 'white'}} />
                     : <>
                        <BackupIcon />
                        {' '}Upload Howl
                     </> 
                  }
               </button>
            </div>
         </div>
   )
}

const SliderAndDragItem = (props) => {

   const { file, setStart, setEnd, setSlideNum, setThumbnail } = props;
   const [thumbnails, setThumbnails] = useState(null);
   const [audioThumbnails, setAudioThumbnails] = useState(null);
   const [slideIndex, setSlideIndex] = useState(0);
   const [defaultPosition, setDefaultPosition] = useState({ x: 0, y: -50 });
   const [defaultPositionOther, setDefaultPositionOther] = useState({ x: 280, y: -50 });
   const [boundsRight, setBoundsRight] = useState(280);
   const [boundsLeft, setBoundsLeft] = useState(20);
   const [isLoading, setIsLoading] = useState(false);

   useEffect(() => {
      setStart(defaultPosition);
      setEnd(defaultPositionOther);
   }, [defaultPosition, defaultPositionOther])


   useEffect(() => {
      let playBtnIcon = document.getElementById('play-icon');
      let pauseBtnIcon = document.getElementById('pause-icon');
      let videoElement = document.getElementById('video-play');
      let audioElement = document.getElementById('audio-field');
      let playTimeout;
      const playTime = (start, end) => {
         let rangeTime;
         if(typeof file == 'string') {
            rangeTime = (end - videoElement.currentTime) * 1000;
         } else {
            if(file?.type.split('/')[0] === 'video') {
               rangeTime = (end - videoElement.currentTime) * 1000;
            } else {
               rangeTime = (end - audioElement.currentTime) * 1000;
            }
         }
         playTimeout = setTimeout(() => {
            fadeBtn();
            if(typeof file == 'string') {
               videoElement.currentTime = start;
            } else {
               if(file?.type.split('/')[0] === 'video') {
                  videoElement.currentTime = start;
               } else {
                  audioElement.currentTime = start;
               }
            }
         }, (rangeTime));
      }

      const fadeBtn = (e) => {
         playBtnIcon.style.display = 'block';
         pauseBtnIcon.style.display = 'none';
         clearTimeout(playTimeout);
         if(typeof file == 'string') {
            videoElement.pause();
         } else {
            if(file?.type.split('/')[0] === 'video') {
               videoElement.pause();
            } else {
               audioElement.pause();
            }
         }
      }
      const showBtn = (e) => {
         let start = slideIndex * 4 + Math.round(defaultPosition.x * 0.04);
         let end = slideIndex * 4 + Math.round(defaultPositionOther.x * 0.04);
         if(typeof file == 'string') {
            if(!(videoElement.currentTime > start && videoElement.currentTime < end)) {
               videoElement.currentTime = start;
            }
         } else {
            if(file?.type.split('/')[0] === 'video') {
               if(!(videoElement.currentTime > start && videoElement.currentTime < end)) {
                  videoElement.currentTime = start;
               }
            } else {
               if(!(audioElement.currentTime > start && audioElement.currentTime < end)) {
                  audioElement.currentTime = start;
               }
            }
         }
         playBtnIcon.style.display = 'none';
         pauseBtnIcon.style.display = 'block';
         if(typeof file == 'string') {
            videoElement.play();
         } else {
            if(file?.type.split('/')[0] === 'video') {
               videoElement.play();
            } else {
               audioElement.play();
            }
         }
         playTime(start, end);
      }

      const getDurationOfAudio = (event) => {
         let duration = audioElement.duration;
         let array = range(0, Math.round(duration / 4 + 1))
         setAudioThumbnails(array);

      }
      playBtnIcon.addEventListener('click', showBtn, false);
      pauseBtnIcon.addEventListener('click', fadeBtn, false)
      if(typeof file != 'string' && file?.type.split('/')[0] === 'audio') {
         audioElement.addEventListener('loadedmetadata', getDurationOfAudio)
      }
      return () => {
         playBtnIcon.removeEventListener('click', showBtn, false);
         pauseBtnIcon.removeEventListener('click', fadeBtn, false);
         if(typeof file != 'string' && file?.type.split('/')[0] === 'audio') {
            audioElement.addEventListener('loadedmetadata', getDurationOfAudio)
         }
      }
   }, [slideIndex, defaultPosition, defaultPositionOther])

   useEffect(async () => {
      setIsLoading(true);
      let blob;
      if(typeof file == 'string') {
         let blobFileFromUrl = await fetch('https://enigmatic-thicket-02049.herokuapp.com/' + file).then(r => r.blob());
         blob = blobFileFromUrl;
         let thumb = await getThumbnails(blob, {interval: 4});
         setThumbnails(thumb);
         setThumbnail(thumb);
      } else {
         blob = new Blob([file]);
         if(file?.type.split('/')[0] != 'audio'){
            let thumb = await getThumbnails(blob, {interval: 4});
            setThumbnails(thumb);
            setThumbnail(thumb);
         }  
      }
      setIsLoading(false);
      document.getElementsByClassName('slider-control-centerright')[0].style.display = 'none';
      document.getElementsByClassName('slider-control-centerleft')[0].style.display = 'none';
      document.getElementsByClassName('slider-control-bottomcenter')[0].style.display = 'none';
   }, []);

   useEffect(() => {
      if((defaultPosition.x + 10) >= defaultPositionOther.x) {
         setBoundsLeft(defaultPosition.x);
         setBoundsRight(defaultPositionOther.x);
      } else {
         setBoundsLeft(10);
         setBoundsRight(290);
      }
   }, [defaultPosition, defaultPositionOther])

   const handleDrag = (event, ui) => {
      let videoElement, audioElement;
      const {x, y} = defaultPosition;
      if(typeof file == 'string') {
         videoElement = document.getElementById('video-play');
         videoElement.currentTime = slideIndex * 4 + Math.round((x + ui.deltaX) * 0.04);
      } else {
         if(file?.type.split('/')[0] === 'video') {
            videoElement = document.getElementById('video-play');
            videoElement.currentTime = slideIndex * 4 + Math.round((x + ui.deltaX) * 0.04);
         } else {
            audioElement = document.getElementById('audio-field');
            audioElement.currentTime = slideIndex * 4 + Math.round((x + ui.deltaX) * 0.04);
         }
      }
      setDefaultPosition({
         x: x + ui.deltaX,
         y: y + ui.deltaY
      })
      setStart({
         x: x + ui.deltaX,
         y: y + ui.deltaY
      })
   }

   const handleDragOther = (event, ui) => {
      let videoElement, audioElement;
      const {x, y} = defaultPositionOther;
      if(typeof file == 'string') {
         videoElement = document.getElementById('video-play');
         videoElement.currentTime = slideIndex * 4 + Math.round((defaultPosition.x * 0.04));
      } else {
         if(file?.type.split('/')[0] === 'video') {
            videoElement = document.getElementById('video-play');
            videoElement.currentTime = slideIndex * 4 + Math.round((defaultPosition.x * 0.04));
         } else {
            audioElement = document.getElementById('audio-field');
            audioElement.currentTime = slideIndex * 4 + Math.round((defaultPosition.x * 0.04));
         }
      }
      
      setDefaultPositionOther({
         x: x + ui.deltaX,
         y: y + ui.deltaY
      })
      setEnd({
         x: x + ui.deltaX,
         y: y + ui.deltaY
      })
   }
   return (
      <>
      {
         isLoading ? 
         <div>
            <CircularProgress />
         </div> :
         <>
            <Carousel 
               slidesToShow={3} 
               slidesToScroll={'auto'}
               cellAlign={'left'}
               swiping={true}
               slideOffset={50}
               transitionMode={'scroll'}
               disableEdgeSwiping={false}
               easing={'easeLinear'}
               slideIndex={slideIndex}
               afterSlide={slideIndex => {
                  setSlideIndex(slideIndex);
                  setSlideNum(slideIndex);
                  let videoElement, audioElement;
                  if(typeof file == 'string') {
                     videoElement = document.getElementById('video-play');
                     videoElement.currentTime = slideIndex * 4;
                  } else {
                     if(file?.type.split('/')[0] === 'video') {
                        videoElement = document.getElementById('video-play');
                        videoElement.currentTime = slideIndex * 4;
                     } else {
                        audioElement = document.getElementById('audio-field');
                        audioElement.currentTime = slideIndex * 4
                     }
                  }
                  
               }}
            >
               {  
                  typeof file == 'string' ?
                     thumbnails?.map((item, index) => {
                        return (
                           <img key={index} src={URL.createObjectURL(item.blob)} />
                        )
                     })
                  : file?.type.split('/')[0] === 'audio' ?
                     audioThumbnails?.map((item, index) => {
                        return (
                           <img key={index} src={cardImage} style={{width: 60}} />
                        )
                     })
                     : thumbnails?.map((item, index) => {
                        return (
                           <img key={index} src={URL.createObjectURL(item.blob)} />
                        )
                     })
               }
            </Carousel>
            <div style={{
               position: 'absolute',
               left: 0,
               bottom: 0,
               width: defaultPosition.x + 5,
               height: '50px',
               background: 'rgba(255,255,255,0.5)'
            }} />

            <div style={{
               position: 'absolute',
               right: 0,
               bottom: 0,
               width: 285 - defaultPositionOther.x,
               height: '50px',
               background: 'rgba(255,255,255,0.5)'
            }} />

            <Draggable
               axis="x"
               defaultPosition={{x: 0, y: -50}}
               bounds={{
                  left: 0,
                  right: boundsRight,
               }}
               onDrag={handleDrag}
            >
               <div id="slide">
                  <MoreVertIcon />
               </div>
            </Draggable>
            <Draggable
               axis="x"
               defaultPosition={{x: 290, y: -50}}
               bounds={{
                  left: boundsLeft + 10,
                  right: 290,
               }}
               onDrag = {handleDragOther}
            >
               <div id="slide">
                  <MoreVertIcon />
               </div>
            </Draggable>
         </>
      }
      </>
     
   )
}

const VideoShow = (props) => {
   const {file} = props;
   return (
      <div className="card-container mb-2">
         <div className="card-thumbnail">
            {
               typeof file == 'string' ? 
                  <div className="video-container">
                     <div className="play-button">
                        <PlayArrowIcon id="play-icon"/>
                        <PauseIcon id="pause-icon" />
                     </div>
                     <video
                        src={file} 
                        id="video-play" 
                        width="100%"
                        height="100%"
                     />
                  </div>
               : file?.type.split('/')[0] === 'audio' ?
                  <div className="audio-container">
                     <img src={cardImage} className="card-image" />
                     <audio 
                        id="audio-field"
                        src={URL.createObjectURL(file)}
                        preload="metadata"
                     ></audio>
                     <div className="play-button">
                        <PlayArrowIcon id="play-icon" style={{color: '#333'}}/>
                        <PauseIcon id="pause-icon" style={{color: '#333'}} />
                     </div>
                  </div> :
                  <div className="video-container">
                     <div className="play-button">
                        <PlayArrowIcon id="play-icon"/>
                        <PauseIcon id="pause-icon" />
                     </div>
                     <video
                        src={URL.createObjectURL(file)} 
                        id="video-play" 
                        width="100%"
                        height="100%"
                     />
                  </div>
            }
         </div>
      </div>
   )
}

const TrimContainer = (props) => {
   const { showUploadHowl, file, setStartTime, setEndTime, setThumbnail } = props;
   const [start, setStart] = useState({x: 0});
   const [end, setEnd] = useState({x: 280});
   const [slideNum, setSlideNum] = useState(0);

   const renderVideo = useMemo(() => (
      <VideoShow file={file}/>
   ), [file]);

   return (
      <div className="d-flex flex-column justify-content-start align-items-center text-center" style={{width: '240px'}} >
         <span className="text-secondary mt-3">
            <small>Your clip may be up to 12 seconds</small>
         </span>
         { renderVideo }
         <div className="video-ctrl">
            <div className="image-carousel">
               <SliderAndDragItem 
                  file={file} 
                  setStart={(t) => {setStart(t)}}
                  setEnd={(t) => {setEnd(t)}}
                  setSlideNum = {(num) => setSlideNum(num)}
                  setThumbnail = {(thumbnails) => setThumbnail(thumbnails)}
               />
            </div>
            
         </div>
         <span className="text-secondary mb-3">
            <small>Scroll left and right for more video. Use
            the brackets to shorten your selection.</small>
         </span>
         
         <button
            className="btn btn-success secondary btn-md btn-block mb-5"
            onClick={()=>{
               showUploadHowl(true)
               setStartTime(slideNum * 4 + Math.round(start.x * 0.04));
               setEndTime(slideNum * 4 + Math.round(end.x * 0.04));
            }}
         > 
            Trim Audio
         </button>
      </div>
   )
}

const CreateHowl = () => {
   const [showTrimContainer, setShowTrimContainer] = useState(false);
   const [showUploadHowl, setShowUploadHowl] = useState(false);
   const [youtuebId, setYoutubeId] = useState(null);
   const [file, setFile] = useState(null);
   const [startTime, setStartTime] = useState(null);
   const [endTime, setEndTime] = useState(null);
   const [thumb, setThumb] = useState(null);
   const [selThumb, setSelThumb] = useState(null);
   const [youtubeLink, setYoutubeLink] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState(null);
   const history = useHistory();
   useEffect(() => {
      if(thumb && startTime !== null && endTime !== null) {
         setSelThumb(thumb[Math.round(startTime/4 + 1)]);
      }
   }, [thumb, startTime, endTime])
   return (
      <ToastProvider>
         <nav className="navbar sticky-top navbar-expand-lg bg-white navbar-light border-bottom justify-content-between align-items-center">
            <img src={howlyrLogo} className="howlyr-logo" onClick={()=>{
               history.push('/')
            }} />
            <HamburgerMenu /> 
         </nav>
         <div className="d-flex flex-column justify-content-start align-items-center" id="wrapper-100vh">
            {
               !showUploadHowl && <h1 className="mt-3 font-weight-bold">Create a Howl</h1>
            }
            {
               !showTrimContainer ?
                  <>
                     <div className="d-flex align-items-center justify-content-center m-3">
                        <input 
                           type="text" 
                           className="form-control" 
                           placeholder="Enter URL" 
                           aria-label="Enter URL"
                           onChange={(event)=> setYoutubeLink(event.target.value)} 
                        />
                        <div className="input-group-append ml-2">
                           <button 
                              className="d-flex justify-content-center align-items-center btn btn-success" 
                              style={{width: "100px", height: "40px"}}
                              type="button"
                              onClick={async () => {
                                 setError(null);
                                 setIsLoading(true);
                                 if(checkYoutubeMusicUrl(youtubeLink)) {
                                    let result = await ytToS3(youtubeLink);
                                    if(result.success) {
                                       let url = result.urls[0];
                                       url = url.replace('http://', 'https://');
                                       setFile(url);
                                       setYoutubeId(result.id);
                                       setShowTrimContainer(true);
                                    } else {
                                       setError("Unable to load. Please try a different YouTube link.")
                                    }
                                 } else {
                                    setError("Invalid Youtube Music URL!");
                                 }
                                 setIsLoading(false);  
                              }}
                              disabled={isLoading && true}
                           >
                              {
                                 isLoading? 
                                    <CircularProgress style={{width: '20px', height: '20px', color: 'white'}} /> : 'Go!'
                              }           
                           </button>
                        </div>
                     </div>
                     <span className="text-danger">
                        <small style={{marginTop: '-20px'}}>{error}</small>
                     </span>
                     <span className="text-secondary">
                        <small>Insert a link from YouTube</small>
                     </span>
                     <hr/>
                     <h4><strong>or</strong></h4>
                     <FileUploader 
                        handleFile={(file) => {
                           setFile(file);
                           setShowTrimContainer(true);
                        }}
                        uploadType={'audio'}
                     />

                     <span className="text-secondary mb-auto">
                        <small>Upload audio from computer file</small>
                     </span>
                  </> :
                  !showUploadHowl ?
                     <TrimContainer 
                        showUploadHowl = {(show) => {
                           setShowUploadHowl(show)
                        }} 
                        file={file}
                        setStartTime = {(time) => {
                           setStartTime(time);
                        }}
                        setEndTime = {(time) => {
                           setEndTime(time);
                        }}
                        setThumbnail = {(thumbnails) => {
                           console.log(thumbnails);
                           setThumb(thumbnails);
                        }}
                     /> :
                     <ShowUploadHowl 
                        showUploadHowl = {(hidden) => {
                           setShowUploadHowl(hidden);
                        }} 
                        showTrimContainer = {(hidden) => {
                           setShowUploadHowl(hidden);
                           setShowTrimContainer(hidden);
                        }}
                        file={file}
                        startTime = {startTime}
                        endTime = {endTime}
                        thumbnail = {selThumb}
                        youtubeId={youtuebId}
                     />
            }
            {
               !showUploadHowl && <div className="bottom-title">
                  <strong>
                     By uploading you understand your Howl will be added 
                     <br />
                     to the public database and agree to our Terms of Use.
                  </strong>
               </div>
            }
         </div>
         <Footer/>
      </ToastProvider>
   )
}

export default CreateHowl;