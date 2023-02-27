import React, { useState, useEffect } from 'react'
import "../css/data.css";
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import { db } from "./firebase.js"

function Data() {
    const [ files, setFiles ] = useState([]);

    useEffect(() => {
        db.collection("myfiles").onSnapshot(snapshot => {
            setFiles(snapshot.docs.map(doc => ({
                id:doc.id,
                data:doc.data()
            })))
        })
    }, [])

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];

        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

  return (
    <div className='data'>
        <div className='data_header'>
            <div className='data_headerLeft'>
                <p>My Drive</p>
                <KeyboardArrowDownOutlinedIcon/>
            </div>

            <div className='data_headerRight'>
                <ListOutlinedIcon/>
                <InfoOutlinedIcon/>
            </div>
        </div>

        <div className='data_content'>
            <div className='data_grid'>
            {
                files.map((file) => {
                    return <div className='data_file'>
                                <InsertDriveFileOutlinedIcon/>
                                <p>{ file.data.filename }</p>
                            </div>
                })
            }
                
            </div>

            <div className='data_list'>
                <div className='detailsRow'>
                    <p><b>Name <KeyboardArrowDownOutlinedIcon/></b></p>
                    <p><b>Last Modified</b></p>
                    <p><b>File Size</b></p>
                </div>

                {
                    files.map((file) => {
                        return <div className='detailsRow'>
                                    <p><a href = { file.data.fileURL }><InsertDriveFileOutlinedIcon/>{ file.data.filename }</a></p>
                                    <p>{ new Date(file.data.timestamp?.seconds*1000).toUTCString()}</p>
                                    <p>{ formatBytes(file.data.size) }</p>
                                 </div>
                    })
                }
            </div>

        </div>
    </div>
  )
}

export default Data