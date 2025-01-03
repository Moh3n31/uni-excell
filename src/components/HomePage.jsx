import { useState } from "react";
// import { useEffect } from 'react';

//components
import IndexContainer from "./IndexContainer";
import FilterSction from "./FilterSection";
import excellFiles from "../database/excellFiles";

//style
import '../styles/home-page.css';
import '../styles/home-page-buttons.css';
import '../styles/filter-section.css';

//images
import addIcon from "../Icons/add.png";
import settingIconOff from "../Icons/settings-off.png";
import settingIconOn from "../Icons/settings-on.png";
import filterIcon from '../Icons/filter.png';

export default function HomePage () {
    const [settingIcon, setSettingIcon] = useState (settingIconOff);
    // eslint-disable-next-line no-unused-vars
    const  [isSettingOn, setIsSettingOn] = useState (false);
    const [isFilterOpen, setISFilterOpen] = useState (false);
    // const [firstRender, setFirstRender] = useState (true);

    //these contain the true values of the filter section
    const [typeFilter, setTypeFilter] = useState ([]);
    const [monthFilter, setMonthFilter] = useState ([]);
    const [yearFilter, setYearFilter] = useState ([]);

    //these are the actual filter optians
    const getUniqueValues = (array, key) => { 
        return [...new Set(array.map(item => item[key]))];
    };
    const realMonths = getUniqueValues(excellFiles, 'month');
    const realYears = getUniqueValues(excellFiles, 'year');
    const realTypes = [...new Set(excellFiles.flatMap(item => item.tags))];

    function handleHover() {
        setIsSettingOn(prev => {
            const newValue = !prev;
            setSettingIcon(newValue ? settingIconOn : settingIconOff);
            return newValue;
        });
    }

    function openFilter () {
        setISFilterOpen (prev=>!prev);
    }

    function checkItem (item, list) {
        return list && list.includes(item);
    }

    function handleYearChange (event) {
        const {name, checked} = event.target;

        if (name) {
            setYearFilter((prev = []) => {
                var tempList = [];

                if (checked) {
                    if (yearFilter.length>=2)
                        tempList = prev;
                    else {
                        tempList =[...prev, name];
                    }
                }
                else if (!checked) { 
                    tempList = prev.filter(item => item !== name);
                }
                return tempList;
            });
        }
    }
    
    function handleMonthChange (event) {
        const {name, checked} = event.target;

        if (name) {
            setMonthFilter((prev = []) => { 
                var tempList = [];

                if (checked) {
                    if (monthFilter.length>=2)
                        tempList = prev;
                    else {
                        tempList =[...prev, name];
                    }
                }
                else if (!checked) { 
                    tempList = prev.filter(item => item !== name);
                }
                return tempList;
            });
        }
    }

    function handleTypeChange (event) {
        const {name, checked} = event.target;

        if (name) {
            setTypeFilter((prev = []) => { 
                var tempList = [];

                if (checked) {
                    if (typeFilter.length>=2)
                        tempList = prev;
                    else {
                        tempList =[...prev, name];
                    }
                }
                else if (!checked) { 
                    tempList = prev.filter(item => item !== name);
                }
                return tempList;
            });
        }
    }

    return (
        <div className="hp-semi-body">
            <div className="hp-container">
                
                <p className="hp-title">پایگاه داده دانشگاه قم</p>
                
                <div className="hp-header">
                    <div className="hp-right-header">
                        <button className="hp-setting-button"
                        onMouseOver={handleHover} onMouseOut={handleHover}>
                        <img src={settingIcon} alt="settings-icon"/>
                        </button>

                        <button className="hp-add-button">
                        <img src={addIcon} alt="add-icon"/>
                        </button>
                    </div>

                    <div className="filter-section">
                        {isFilterOpen && <FilterSction yearFilter={yearFilter}
                            typeFilter={typeFilter} monthFilter={monthFilter}
                            handleYearChange={handleYearChange}
                            handleMonthChange={handleMonthChange}
                            handleTypeChange={handleTypeChange}
                            checkItem={checkItem}
                            realYears={realYears}
                            realMonths={realMonths}
                            realTypes={realTypes}/>}
                        
                        <button className="hp-filter-button" onClick={openFilter}>
                            &#9654;
                            <img src={filterIcon} alt="filter-icon"/>
                        </button>

                    </div>
                </div>

                <IndexContainer yearFilter={yearFilter}
                monthFilter={monthFilter} typeFilter={typeFilter}/>
            </div>
        </div>
    )
}