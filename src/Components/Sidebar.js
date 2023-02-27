import React, { useState } from "react";
import "../css/sidebar.css";
import "../css/modal.css";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MobileScreenShareIcon from '@mui/icons-material/MobileScreenShare';
import DevicesIcon from '@mui/icons-material/Devices';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Modal } from '@mui/material';
import { storage, db } from "./firebase.js";
import firebase from "firebase";

function Sidebar() {
    const [ open, setOpen ] = useState(false);
    const [ uploading, setUploading ] = useState(false);
    const [ file, setFile ] = useState(null);

    const handleClose = () => {
        setOpen(false);
    }
    const handleOpen = () => {
        setOpen(true);
    }
    const handleChange = (e) => {
        if(e.target.files[0]){
            setFile(e.target.files[0]);
        }
    }
    const handleUpload = (event) => {
        event.preventDefault();
        setUploading(true);

        storage.ref(`files/${file.name}`).put(file).then(snapshot => {
            storage.ref("files").child(file.name).getDownloadURL().then(url => {
                db.collection("myfiles").add({
                    timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                    filename:file.name,
                    fileURL:url,
                    size:snapshot._delegate.bytesTransferred
                })
                setUploading(false);
                setFile(null);
                setOpen(false);
            })
        }) 
    }

    return (
      <>
      <Modal open={ open } onClose={ handleClose }>
        <div className="modal_pop">
            <form>
                <div className="modalHeading">
                    <h3>Select file to upload</h3>
                </div>

                <div className="modalBody">
                {
                    uploading ? 
                            ( <p className="uploading">uploading</p>)
                        :
                            (
                                <>
                                <input type="file" onChange={ handleChange } />
                                <input type="submit" className="post_submit" onClick={ handleUpload } />
                                </>
                            )
                }
                </div>
            </form>
        </div>
      </Modal>

            <div className='sidebar'>
            <div className='sidebar_btn'>
                <button onClick={ handleOpen }>
                    <AddCircleOutlineIcon/>
                    <span>New</span>
                </button>
            </div>

            <div className='sidebar_options'>
                <div className='sidebar_option sidebar_option-Active'>
                    <MobileScreenShareIcon/>
                    <span>My Drive</span>
                </div>

                <div className='sidebar_option'>
                    <DevicesIcon/>
                    <span>Computers</span>
                </div>

                <div className='sidebar_option'>
                    <PeopleAltOutlinedIcon/>
                    <span>Shared with me</span>
                </div>

                <div className='sidebar_option'>
                    <AccessTimeOutlinedIcon/>
                    <span>Recent</span>
                </div>

                <div className='sidebar_option'>
                    <StarBorderOutlinedIcon/>
                    <span>Starred</span>
                </div>

                <div className='sidebar_option'>
                    <DeleteOutlineOutlinedIcon/>
                    <span>Trash</span>
                </div>

            </div>

            <hr/>

        </div>
        
    </>  
    
  )
}

export default Sidebar