/* eslint-disable react/prop-types */

//components
import FilterIntity from "./filterIntity";

//styles
import "../styles/settings-section.css"

//images
import closeIcon from "../Icons/close.png";
import submitIcon from "../Icons/check.png";
import addIcon from "../Icons/add.png";
import { useState } from "react";

export default function SettingsSection (props) {

    const [localFilters, selLocalFilters] = useState ([... props.filterArray]);
    const [addNew, setAddNew] = useState (false);
    const [newText, setNewText] = useState("");

    const createEachFilter = localFilters.map((item)=>{
            return(<FilterIntity 
                key={item.keyId}
                filterId={item.keyId}
                filterName={item.name}
                OnEdit={EditFilters}
            />)
        });

    function submitFilters () {
        props.OnSubmit(localFilters);
        props.OnClose();
    }

    function handleChange(event) {
        const {value} = event.target;
        setNewText(value);
    }

    function EditFilters (event) {
        const {id, name} = event.target;
        
        if (name === "remove") {
            const temp = localFilters.filter(item => (item.keyId != id));
            selLocalFilters (temp);
        }
        if (name === "add") {
            if(addNew) {
                const temp = [...localFilters, 
                    {
                        keyId:(localFilters.length+1),
                        name: newText
                    }];

                selLocalFilters(temp);
            }

            setAddNew (prev => !prev);
        }
    }

    return (
        <div className="settings-section">
            <button className="close-button" onClick={props.OnClose}>
                <img src={closeIcon} alt="close"/>
            </button>

            <div className="type-section">
                {createEachFilter}

                {addNew && 
                    <div className="filter-intity">
                        <img src={closeIcon} className="remove-icon"
                            onClick={props.OnEdit} id={props.filterId} name="remove"/>
            
                        <input type="text" className="filter-input"
                            value={newText} onChange={handleChange}
                        />
                    </div>}

                <img src={addIcon} name="add" className="add-filter-button"
                    onClick={EditFilters}/>
            </div>

            <button className="submit" type="submit">
                <img src={submitIcon} onClick={()=>submitFilters(localFilters)}/>
            </button>
        </div>
    )
}