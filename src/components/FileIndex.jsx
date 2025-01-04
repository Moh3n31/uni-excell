/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/file-index.css";

import editIcon from "../Icons/edit.png";

export default function FileIndex (props) {
    
    // eslint-disable-next-line no-unused-vars
    const [fileType, setFileType] = useState(props.type);

    return (
        <div className="index">
            <div className="file-index-right">
                <p>{props.name}</p>
                <p>{`${props.month} ${props.year}`}</p>
                <p className="type-text">~ {fileType[0]}، {fileType[1]}</p>
            </div>
            <div className="file-index-left">
                <p>{props.fileDate}</p>
                <button className="edit-button">
                    <img src={editIcon} alt="edit" />
                </button>
            </div>
        </div>
    )
}