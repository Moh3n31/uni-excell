/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

//style
import '../../styles/view.css';

//components
import DataGrid from "./DataGrid";
import AddingSection from "../AddingSection";

//things
import searchIcon from '../../Icons/search.png';
import downloadIcon from '../../Icons/download.png';
import deleteIcon from '../../Icons/delete.png';
import editIcon from '../../Icons/edit.png';
import homeIcon from '../../Icons/home-off.png';
import checkIcon from '../../Icons/check.png';
import closeIcon from '../../Icons/close.png';
import logoutIcon from '../../Icons/logout.png';
import dataList from '../../database/Khadamat';

// eslint-disable-next-line no-unused-vars
export default function HomePage ({handleHome,handleLogOut,viewId,types,handleDelete,updateTheFile}) {
    //search text
    const [search,setSearch] = useState("");

    //these are for rendering
    const [keys, setKeys] = useState([]);
    const [arrayOfItems, setArrayOfItems] = useState ([]);
    const [tempArrayOfItems, setTempArrayOfItems] = useState ([]);
    const [pageInfo, setPageInfo] = useState ({
        fileId: 1,
        name: "حقوق پرسنل خدمات عمومی و پشتیبانی",
        month: "شهریور",
        year: "۱۴۰۳",
        tags: ["پرسنل", "خدمات"],
        fileDate: "1403/10/4",
        archived: 0
    })

    //these are about modifications
    const [dAlert, setDAlert] = useState(false);
    const [isAddOpen, setISAddOpen] = useState (false);
    const [editView, setEditView] = useState(false);

//............functions that run on lunch............

    function loadData () {
        const tempKey = [];
        let values = [];
        const tempArray = [];

        dataList.map ((item)=> {
            for (let [,value] of Object.entries(item)) {
                values.push(value);
            }
            tempArray.push(values);
            values=[];
        })
        
        for (let [key,] of Object.entries(dataList[0])) {
            tempKey.push(key);
        }
        
        setKeys([...tempKey]);
        setArrayOfItems([...tempArray]);
    };

    function fetchData () {
        // Fetches data from server using viewId 
        // and then saves it into a local state called pageInfo
        setPageInfo(prev=>prev)
    }

    useEffect(() => {
        fetchData();
        loadData();
    }, []);

    function enableEdit () {
        if(pageInfo.tags.includes("پرسنل")) {
            setEditView(true);
            setTempArrayOfItems([...arrayOfItems]);
        }
        else {
            setISAddOpen(true);
        }

    }

//............functions to handle changes............

    function handleSearchChange (event) {
        const {value} = event.target;
        setSearch(value);
        console.log(dataList);
    }

    function handleChange (event) {
        const {id,value} = event.target;
        const numbers = id.split("-");
        const row = numbers[0];
        const column = numbers[1];

        const updatedArray = arrayOfItems.map(item => [...item]);
        updatedArray[row][column] = value;
        setArrayOfItems(updatedArray);
    }

    function deleteAlert() {
        return setDAlert(true);
    }
    
    function openAdd () {
        setISAddOpen (prev=>!prev);
    }
    
    function handleEdit (update) {
        updateTheFile(viewId, update);
    }

//............functions that modify the data............

    function applyEdits(submit) {
        if (submit) {
            setTempArrayOfItems([]);
            setEditView(false);
        } else {
            const revertedArray = tempArrayOfItems.map(item => [...item]);
            setArrayOfItems(revertedArray);
            setTempArrayOfItems([]);
            setEditView(false);
        }
    }
    
//............functions that load the data............

    function searchFor(item){
        const result = (search!="" ? item.includes(search): true);
        return result;
    }

    const createGrid = arrayOfItems.map ((item,index) => {
        if(searchFor(item)){
            return(
                <DataGrid key={index} item={item} column={index}
                editView={editView} handleChange={handleChange}/>
            );
        }
    });


    const createTitleRow = keys.map((itemValue, index) => {
        return (
            <div key={index} className="title-element">
                {itemValue}
            </div>
        )
    });

//............the component itself............

    return (
        <div className="hp-semi-body">
            <div className="hp-container">

                {dAlert?
                <div className="delete-alert">
                    <p className="alert-text">
                    سوابق حذف شده قابل بازیابی نمی‌باشند.
                    آیا از انجام این کار اطمینان دارید؟
                    </p>

                    <div className="del-alert-buttons">
                        <button className="cancel-del-button"
                        onClick={()=> setDAlert(prev=>!prev)}>
                            لغو
                        </button>
                        <button className="submit-del-button"
                        onClick={handleDelete}>
                            تایید
                        </button>
                    </div>
                </div>
                :null}

                {isAddOpen && 
                <AddingSection OnClose={openAdd} 
                    OnSubmit={handleEdit} defaultValues={pageInfo}/>
                }
        
                <div className="view-header">
                    <p className="view-title">
                        {`${pageInfo.name} ${pageInfo.month} ${pageInfo.year}`}
                    </p>

                    <div className="search-container"
                    id={editView?"disabled-button":""}>

                        <input type="text" placeholder="جست و جو ..."
                            value={search} className="search-input"
                            onChange={handleSearchChange}
                            disabled={editView} />
                        
                        <button className="search-button"
                        disabled={editView} >
                            <img src={searchIcon}/>
                        </button>
                    </div>
                </div>

                <div className="grid-component">
                    <div className="title-grid-row" 
                        style={{
                            display: "grid", 
                            gridTemplateColumns: `repeat(${keys.length}, 1fr)`
                    }}>
                        {createTitleRow}
                    </div>
                    
                    <div className="data-grid">
                        {createGrid}
                    </div>
                </div>

                <div className="footer-section">
                    

                    <div className="left-footer">
                        <button className="viewPage-button" onClick={handleLogOut}
                        disabled={editView} id={editView?"disabled-button":""}>
                            <img src={logoutIcon} alt="logout"/>
                        </button>

                        <button className="viewPage-button" onClick={handleHome}
                        disabled={editView} id={editView?"disabled-button":""}>
                            <img src={homeIcon} alt="home"/>
                        </button>
                    </div>

                    <div className="left-footer">
                        <div className="edit-sec">
                            <div className="edit-container">
                                {editView &&
                                <button className="edit-close" onClick={()=>applyEdits(false)}>
                                    <img src={closeIcon} alt="close"/>
                                </button>}
                                
                                {editView && 
                                <button className="edit-check" onClick={()=>applyEdits(true)}>
                                    <img src={checkIcon} alt="check"/>
                                </button>}
                            </div>

                            <button className="viewPage-button"
                            onClick={enableEdit}>
                                <img src={editIcon} alt="edit"/>
                            </button>

                        </div>

                        <button className="viewPage-button" onClick={deleteAlert}
                        disabled={editView} id={editView?"disabled-button":""}>
                            <img src={deleteIcon} alt="delete"/>
                        </button>

                        <button className="viewPage-button"
                        disabled={editView} id={editView?"disabled-button":""}>
                            <img src={downloadIcon} alt="download"/>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}