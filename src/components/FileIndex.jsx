/* eslint-disable react/prop-types */
import { useState } from "react";
import "../styles/file-index.css";

//data base
import months from "../database/months";
import years from "../database/years";
import types from "../database/types";

//images
import editIcon from "../Icons/edit.png";

export default function FileIndex (props) {
    
    const [isEditing, setIsEditing] = useState(false);
    const [newForm, setNewForm] = useState({fileId:props.fileId, name:props.name, 
        month:props.month, year:props.year, fileDate:props.fileDate,
        tag1:props.type[0], tag2:props.type[1]});

    const createTypes = types.map((type) => ( 
        <option key={type.keyId} name={type.name} value={type.name}> 
            {type.name}
        </option>
    ));
    const createMonths = months.map((month) => ( 
        <option key={month.keyId} name={month.name} value={month.name}> 
            {month.name}
        </option>
    ));
    const createYears = years.map((year) => ( 
        <option key={year.keyId} name={year.name} value={year.name}> 
            {year.name}
        </option>
    ));

    function checkForDuplication (value) {
        const check1 = (value === newForm.tag1);
        const check2 = (value === newForm.tag2);
        const result = (check1 || check2);
        return (result);
    }

    function handleChange (event) {
        const {name, value, type} = event.target;

        if(type==="select-one"){
            if(checkForDuplication(value))
                return;
        }

        const temp = {
            ...newForm,

            [name]: value
        }
        setNewForm(temp);  
    }

    function toggleEdit () {
        if(isEditing)
            props.updateFile(newForm);

        setIsEditing(prev => !prev);
    }

    return (
        <div className="index">
            <div className="file-index-right">
                {!isEditing ? 
                    <p>
                        {props.name}
                    </p> : 
                    <input type="text" value={newForm.name} onChange={handleChange} name="name"/>}
                {!isEditing ? 
                    <p>
                        {`${props.month} ${props.year}`}
                    </p> : 
                    <div>
                        <select value={newForm.year} className="selector" name="year"
                            onChange={handleChange}> 
                            {createYears}
                        </select>
                        <select value={newForm.month} className="selector" name="month"
                            onChange={handleChange}> 
                            {createMonths}
                        </select>
                    </div>}
                {!isEditing ? 
                    <p className="type-text">
                        ~ {props.type[0]}، {props.type[1]}
                    </p> : 
                    <div>
                        <select value={newForm.tag1} className="selector" name="tag1"
                            onChange={handleChange}>
                            {createTypes}
                        </select>
                        <select value={newForm.tag2} className="selector" name="tag2"
                            onChange={handleChange}>
                            {createTypes}
                        </select>
                    </div>}
            </div>
            <div className="file-index-left">
                <p>{props.fileDate}</p>
                <button className="edit-button" onClick={toggleEdit}>
                    <img src={editIcon} alt="edit" />
                </button>
            </div>
        </div>
    )
}