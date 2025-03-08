/* eslint-disable react/prop-types */
import { useState } from "react";

export default function FilterSelector (props) {
    
    const [isOpen, setIsOpen] = useState (false);

    const creatItems = props.Source.map((item, index) => {
        return (
            <div key={index} className="filter-item">
                <input type="checkbox" id={index} name={item}
                    checked={props.checkItem(item, props.selectFilter)}
                    onChange={props.handleSelectChange}/>
                <label htmlFor={index}>{item}</label>
            </div>
        )
    })

    function handleClick () {
        setIsOpen (prev => !prev);
    }

    return (
        <div className="filter-selector">
            <button id={props.SelectId} onClick={handleClick}>
                <p>{props.SelectName}</p>
                <p id="dropdown-symbol">&#x25BC;</p>
            </button>

            <div className={`dropdown-checkbox ${isOpen?'open':""}`} id={props.SelectId}>
                {creatItems}
            </div>
        </div>
    )
}