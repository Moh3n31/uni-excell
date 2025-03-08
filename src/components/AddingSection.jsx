/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useRef, useEffect, useState } from "react";

//images
import closeIcon from "../Icons/close.png";
import submitIcon from "../Icons/check.png"

//styles
import "../styles/add-section.css";

//db
import months from "../database/months";
import years from "../database/years";
import types from "../database/types";

//components
import FileUpload from "./FileUpload";

export default function AddingSection ({OnClose, OnSubmit, defaultValues}) {

    const [formInfo, setFormInfo] = useState ({name:"",month:"", year:"",tags:[], file:null});
    const [isOpen, setIsOpen] = useState (false);
    const divRef = useRef(null);

    function submitForm () {
        OnSubmit(formInfo);
        OnClose();
    }

    const handleClickOutside = (event) => { 
        if (divRef.current && 
            !divRef.current.contains(event.target)) { 
                setIsOpen(false);
            } 
    }; 
        
    useEffect(() => { 
        if (defaultValues) {
            const temp = {
                name: defaultValues.name,
                month: defaultValues.month,
                year: defaultValues.year,
                tags: [...defaultValues.tags],
                file: null
            };
            setFormInfo(temp);
        }

        document.addEventListener('mousedown', handleClickOutside); 
        return () => { 
            document.removeEventListener('mousedown', handleClickOutside); 
        }; 
    }, []);

    const creatTypes = types.map((item) => {
        return (
            <div key={item.keyId} className="type-option">
                <input type="checkbox" id={item.name} name={item.name}
                    checked={formInfo.tags.includes(item.name)}
                onChange={handleChange}/>
                <label htmlFor={item.name}>{item.name}</label>
            </div>
        )
    })

    function handleClick () {
        setIsOpen (prev => !prev);
    }

    const createMonths = months.map((month) => ( 
        <option key={month.keyId} name={month.name}
            value={month.keyId} selected={formInfo.month===month.name?true:false}> 
            {month.name}
        </option>
    ));
    const createYears = years.map((year) => ( 
        <option key={year.keyId} name={year.name}
            value={year.keyId}  selected={formInfo.year===year.name?true:false}> 
            {year.name}
        </option>
    ));

    function handleChange (event) {
        const {type, name, selectedIndex, 
                options, checked, value} = event.target;
        if (type==="checkbox") {
            const limit = (formInfo.tags.length>=2);

            setFormInfo(prevState => { 
                const tags = (checked & !limit) ? 
                [...prevState.tags, name] : 
                prevState.tags.filter(tag => tag !== name); 
                return { ...prevState, tags }; 
            });
        }
        else if (type==="select") {
            const temp = {
                ...formInfo,
    
                [name]: options[selectedIndex].text
            }
            setFormInfo(temp);
        }
        else if (type==="text") {
            const temp = {
                ...formInfo,
    
                [name]: value
            }
            setFormInfo(temp);
        }
            
    }

    function changeFile (data) {
        setFormInfo({
            ...formInfo,
            file:data
        });
    }

    return (
        <div className="add-section">
            <button className="close-button" onClick={OnClose}>
                <img src={closeIcon} alt="close"/>
            </button>

            <div className="add-input-section">
                <input type="text" placeholder="نام رکورد" name="name"
                className="file-name" onChange={handleChange} value={formInfo.name}/>
                <div className="selector-div">
                    <select className="selector" name="year"
                        onChange={handleChange}> 
                        {createYears}
                    </select>
                    <select className="selector" name="month"
                        onChange={handleChange}> 
                        {createMonths}
                    </select>

                    <div>
                        <button id="type" onClick={handleClick} className="selector">
                            <p>--نوع--</p>
                            <p id="dropdown-symbol">&#x25BC;</p>
                        </button>

                        {isOpen && (
                            <div className="type-check" ref={divRef}>
                                {creatTypes}
                            </div>
                        )}
                    </div>

                </div>

                <FileUpload file={formInfo.file} setFile={changeFile}/>

                <button className="submit" type="submit">
                    <img src={submitIcon} onClick={submitForm}/>
                </button>
            </div>
        </div>
    )
}