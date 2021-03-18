import React, {useState, useEffect} from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { useHistory } from "react-router-dom";
import Footer from '../components/Footer';
import HamburgerMenu from '../components/HamburgerMenu';
import Card from '../components/Card';
import { getCategories, getClips } from '../apis/Api';
import CircularProgress from '@material-ui/core/CircularProgress';
import { ToastProvider } from 'react-toast-notifications';

import howlyrLogo from '../images/howlry_logo.png';
import '../styles/category.scss';
import '../styles/styles.scss';

const Category = (props) => {
   const categoryId = props.match.params.id;
   const history = useHistory();
   const [categories, setCategories] = useState([]);
   const [clips, setClips] = useState([]);
   const [pageExist, setPageExist] = useState(true);
   const [pageNum, setPageNum] = useState(1);
   const [categoryIndex, setCategoryIndex] = useState('');
   const [apiLoading, setApiLoading] = React.useState(false);
   const [selectedItem, setSelectedItem] = React.useState(null);

   const isBottom = () => {
      return (window.innerHeight + window.scrollY) >= document.body.offsetHeight;
   }

   useEffect(() => {
      setClips([]);
      setPageNum(1);
      setPageExist(true);
      setSelectedItem(null);
   }, [categoryId])

   useEffect(() => {
      async function fetchClips() {
         setApiLoading(true);
         const originalClips = await getClips(categoryId, 1);
         if(originalClips.success) {
            setClips(originalClips.data);
            setPageExist(true);
            setPageNum(pageNum + 1);
         } else {
            setPageExist(false);
         }
         setApiLoading(false);
      }
      fetchClips();
   }, [categoryId])

   const scrollEvent = async () => {
      if(isBottom() && pageExist && !apiLoading) {
         try {
            setApiLoading(true);
            const clipList = await getClips(categoryId, pageNum);
            if(clipList.success) {
               setClips([...clips, ...clipList.data]);
               setPageExist(true);
               setPageNum(pageNum + 1);
            } else {
               setPageExist(false);
            }
            setApiLoading(false);
         } catch(error) {
            console.log("error during scroll the screen: ", error);
         }
      }
   }

   useEffect(() => {
      window.addEventListener('scroll', scrollEvent);
      return () => window.removeEventListener('scroll', scrollEvent);
   }, [categoryId, scrollEvent])

   useEffect(async () => {
      const categories = await getCategories();
      setCategories(categories);
   }, [categoryId])


   return (
      <ToastProvider>
         <nav className="navbar sticky-top navbar-expand-lg bg-white navbar-light border-bottom justify-content-between align-items-center">
            <img src={howlyrLogo} className="howlyr-logo" onClick={()=>{
               history.push('/')
            }} />
            <HamburgerMenu />
         </nav>
         <div className="d-flex" id="wrapper">
            <div className="border-right" id="sidebar-wrapper">
               <ListGroup variant="flush">
                  {
                     categories.map((item, index) => {
                        if(item.id != 1) {
                           return (
                              <ListGroup.Item 
                                 key = {item.id}
                                 onClick={() => {
                                    setCategoryIndex(item.id);
                                    history.push(`/category/${item.id}`)
                                 }}
                                 active = {categoryId == item.id ? true : false}
                              >
                                 {item.name}
                              </ListGroup.Item>
                           )
                        }
                     })
                  }
               </ListGroup>
            </div>
            <div id="page-content-wrapper">
               <audio
                  id="audio-play"
                  style={{display: 'hidden'}}
               >     
               </audio> 
               <div className="container-fluid" id="photoWrapper">
                  <div className="row justify-content-start align-items-start m-2" id="card-container">
                     {
                        clips.map((item, index) => {
                           return (
                              <Card 
                                 key={index}
                                 item={item}
                                 selectedItem={selectedItem}
                                 onPlayClick={(e) => setSelectedItem(e)}
                                 onClick={() => {
                                    history.push(`/profile/${item.id}`)
                                 }}
                              />
                           )
                        })
                     }
                  </div>
               </div>
               { apiLoading &&
                  <div className="row justify-content-center align-items-center m-5">
                     <CircularProgress />
                  </div>
               }
            </div>
         </div>
         <Footer/>
      </ToastProvider>
   )
}

export default Category;