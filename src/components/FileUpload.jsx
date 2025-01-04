/* eslint-disable react/prop-types */
import { useRef } from 'react';

//images
import upload from "../Icons/upload.png";

export default function FileUpload (props) {
    
    const dropRef = useRef(null);
    const fileInputRef = useRef(null);

    const handleClick = () => { 
        fileInputRef.current.click(); 
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropRef.current.classList.add('dragging');
    };

    const handleDragLeave = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropRef.current.classList.remove('dragging');
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        dropRef.current.classList.remove('dragging');
        
        if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
            props.setFile(event.dataTransfer.files[0]);
            event.dataTransfer.clearData();
        }
    };


    const handleFileChange = (event) => {
        props.setFile(event.target.files[0]);
    };

    return (
        <div>
            <div
                ref={dropRef}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className="upload-area"
            >
                <img src={upload} className='upload-icon'/>
                {props.file ? (
                    <p>File: {props.file.name}</p>
                ) : (
                    <div>
                        <p>فایل خود را انتخاب کنید</p>
                    </div>
                )}
                <button onClick={handleClick}>
                    انتخاب فایل
                </button>
            </div>
            <input
                type="file" ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
            />
        </div>
    );
};
