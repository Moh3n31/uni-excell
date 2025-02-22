/* eslint-disable react/prop-types */
import { useState } from "react";
import moment from 'moment-jalaali';


//components
import IndexContainer from "./IndexContainer";
import FilterSction from "./FilterSection";
import AddingSection from "./AddingSection";
import SettingsSection from "./SettingsSection";

//style
import '../styles/home-page.css';
import '../styles/home-page-buttons.css';
import '../styles/filter-section.css';

//images
import addIcon from "../Icons/add.png";
import settingIconOff from "../Icons/settings-off.png";
import settingIconOn from "../Icons/settings-on.png";
import filterIcon from '../Icons/filter.png';

export default function HomePage ({handleView,handleLogin,excellFiles,types}) {

    const [filterArray, setFilterArray] = useState([...types]);

    //states of pop up features
    const [settingIcon, setSettingIcon] = useState (settingIconOff);
    const  [isSettingOn, setIsSettingOn] = useState (false);
    const  [, setSettingHover] = useState (false);
    const [isFilterOpen, setISFilterOpen] = useState (false);
    const [isAddOpen, setISAddOpen] = useState (false);

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

    const getTodayInPersian = () => {
        return moment().format('jYYYY/jMM/jDD')
    };
    
    console.log(getTodayInPersian());

    function handleHover() {
        setSettingHover(prev => {
            const newValue = !prev;
            setSettingIcon(newValue ? settingIconOn : settingIconOff);
            return newValue;
        });
    }

    //...............opening diffrent sections...............

    function openFilter () {
        setISFilterOpen (prev=>!prev);
    }

    function openAdd () {
        setISAddOpen (prev=>!prev);
    }

    function openSettings () {
        setIsSettingOn (prev=>!prev);
    }

    //...............rendering files in the page...............

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

    //...............adding new things like files and types...............
    function addNewFile (record) {
        const today = getTodayInPersian();
        const newRecord = {
            fileId: (excellFiles.length+1),
            name: `${record.name} ${record.month} ${record.year}`,
            month: record.month,
            year: record.year,
            tags: record.tags,
            fileDate: today
        }
        excellFiles.push (newRecord);
    }

    function updateFilters (newFilterArray) {
        setFilterArray ([...newFilterArray]);
    }

    //...............the component itself...............

    return (
        <div className="hp-semi-body">
            <div className="hp-container">
                
                <p className="hp-title">پایگاه داده دانشگاه قم</p>
                
                <div className="hp-header">
                    <div className="hp-right-header">
                        <button className="hp-setting-button" onClick={openSettings}
                        onMouseOver={handleHover} onMouseOut={handleHover}>
                        <img src={settingIcon} alt="settings-icon"/>
                        </button>

                        <button className="hp-add-button" onClick={openAdd}>
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

                <IndexContainer yearFilter={yearFilter} handleView={handleView}
                monthFilter={monthFilter} typeFilter={typeFilter}/>

                {isAddOpen && <AddingSection OnClose={openAdd} OnSubmit={addNewFile}/>}
                {isSettingOn && <SettingsSection OnClose={openSettings} 
                                    filterArray={filterArray}
                                    OnSubmit={updateFilters}
                                />}
            </div>
        </div>
    )
}