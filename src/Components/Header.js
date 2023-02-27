import React from 'react'
import logo from "../images/logo.png"
import "../css/Header.css"
import SearchIcon from '@mui/icons-material/Search';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from '@mui/material';

function Header({ photoURL }) {
    function refreshPage() {
        window.location.reload(false);
      }

  return (
    <div className="header">
        <div className="header_logo">
            <img src={ logo } alt='logo'/>
            <span>Drive</span>
        </div>

        <div className="header_search">
            <SearchIcon/>
            <input type="text" placeholder='Search in Drive'/>
            <FormatAlignCenterIcon/>
        </div>

        <div className="header_icons">
            <span>
                <LogoutIcon onClick={refreshPage}/>
                <SettingsIcon/>
            </span>
            <span>
                <Avatar src= { photoURL }/>
            </span>
        </div>
    </div>
  )
}

export default Header