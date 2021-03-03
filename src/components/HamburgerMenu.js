import React, {useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { slide as Menu } from 'react-burger-menu'
import { NavLink } from "react-router-dom";
import { getCategories } from '../apis/Api';

import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import BackupRoundedIcon from '@material-ui/icons/BackupRounded';
import ShoppingCartRoundedIcon from '@material-ui/icons/ShoppingCartRounded';
import CategoryRoundedIcon from '@material-ui/icons/CategoryRounded';
import ExpandLessRoundedIcon from '@material-ui/icons/ExpandLessRounded';
import LabelRoundedIcon from '@material-ui/icons/LabelRounded';

import '../styles/burger.scss';

const Item = (props) => {
   const { url, title, icon, onClose, subMenu } = props;
   const history = useHistory();
   return (
      <div className={subMenu ? "menu-item sub-menu" : "menu-item"} onClick={() => {
         history.push(url);
         onClose()
      }}>
         <div className="item-icon">{icon}</div>
         <span className="text-white">{title}</span>   
      </div>
   )
}

const DropDownItem = (props) => {
   const [isOpen, setIsOpen] = useState(false);
   const { children, icon, title } = props;
   return (
      <>
         <div className="menu-item" onClick={() => {
            setIsOpen(!isOpen);
         }} >
            <div className="item-icon">{icon}</div>
            <span className="item-link">{title}</span>
            <div className="up-down-toggle">
               <ExpandLessRoundedIcon className={isOpen ? "toggle-icon down" : "toggle-icon"}/>
            </div>
         </div>
         <div className={isOpen ? "drop-down-menu fade" : "drop-down-menu"}>
            {children}
         </div>
      </>
   )
}

const HamburgerMenu = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [categories, setCategories] = useState([]);
   const handleClose = () => setIsOpen(false);
   const handleOpen = () => setIsOpen(true);

   useEffect(async () => {
      const categories = await getCategories();
      setCategories(categories);

      const overlay = document.getElementsByClassName('bm-overlay')[0];
      overlay.addEventListener("click", handleClose);
      return () => {
         overlay.removeEventListener("click", handleClose);
      };
   }, []);

   return (
      <Menu 
         right 
         pageWrapId={"page-wrap"}
         onClose={handleClose}
         onOpen={handleOpen}
         isOpen={isOpen}
         disableOverlayClick={true}
      >
         <Item 
            icon={<HomeRoundedIcon className="menu-icon" />}
            url={"/"}
            title="Home Page"
            onClose = {handleClose} 
         />
         <DropDownItem 
            icon={<CategoryRoundedIcon className="menu-icon" />}
            title="Categories"
            children={
               <>
                  {
                     categories.map((item, index) => {
                        if(item.id != 1) {
                           return (
                              <Item
                                 key={item.id}
                                 icon={<LabelRoundedIcon className="menu-icon" />} 
                                 title={item.name}
                                 url={`/category/${item.id}`}
                                 onClose = {handleClose}
                                 subMenu 
                              />
                           )
                        }
                     })
                  }
               </>
            }
         />
         <Item 
            icon={<BackupRoundedIcon className="menu-icon" />}
            url={"/create"} 
            title="Upload Soundbite" 
            onClose = {handleClose} 
         />
         <Item 
            icon={<ShoppingCartRoundedIcon className="menu-icon" />}
            url={"/shop"}
            title="Howlyr Shop" 
            onClose = {handleClose} 
         />
      </Menu>
   )
}

export default HamburgerMenu;