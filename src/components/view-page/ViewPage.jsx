/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

//style
import '../../styles/view.css';

//components
import DataGrid from "./DataGrid";

//things
import searchIcon from '../../Icons/search.png';
import downloadIcon from '../../Icons/download.png';
import deleteIcon from '../../Icons/delete.png';
import editIcon from '../../Icons/edit.png';
import homeIcon from '../../Icons/home-off.png';
import dataList from '../../database/Khadamat';

// eslint-disable-next-line no-unused-vars
export default function HomePage ({handleHome,handleLogin,viewId,types,handleDelete}) {
    const [search,setSearch] = useState("");
    const [keys, setKeys] = useState([]);
    const [arrayOfItems, setArrayOfItems] = useState ([]);
    const [dAlert, setDAlert] = useState(false);
    const [editView, setEditView] = useState(false);
    const [pageInfo, setPageInfo] = useState ({
        fileId: 1,
        name: "حقوق پرسنل خدمات عمومی و پشتیبانی",
        month: "شهریور",
        year: "۱۴۰۳",
        tags: ["حقوق", "خدمات"],
        fileDate: "1403/10/4",
        archived: 0
    })

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
            console.log ("personel");
        }
        else if(pageInfo.tags.includes("حقوق")){
            console.log ("payment");
        }

        setEditView(true);
    }

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

        let temp = [...arrayOfItems];
        temp[row][column] = value;
        setArrayOfItems(temp);
    }

    const createGrid = arrayOfItems.map ((item,index) => {
            return(
                <DataGrid key={index} item={item} column={index}
                editView={editView} handleChange={handleChange}/>
            );
    });


    const createTitleRow = keys.map((itemValue, index) => {
            return (
                <div key={index} className="title-element">
                    {itemValue}
                </div>
            )
    });

    function deleteAlert() {
        return setDAlert(true);
    }

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
        
                <div className="view-header">
                    <p className="view-title">
                        {`${pageInfo.name} ${pageInfo.month} ${pageInfo.year}`}
                    </p>

                    <div className="search-container">
                        <input type="text" placeholder="جست و جو ..."
                            value={search} className="search-input"
                            onChange={handleSearchChange}/>
                        <button className="search-button">
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
                    
                    <button className="viewPage-button" onClick={handleHome}>
                        <img src={homeIcon} alt="home"/>
                    </button>

                    <div className="left-footer">
                        <button className="viewPage-button"
                        onClick={enableEdit}>
                            <img src={editIcon} alt="edit"/>
                        </button>

                        <button className="viewPage-button" onClick={deleteAlert}>
                            <img src={deleteIcon} alt="delete"/>
                        </button>

                        <button className="viewPage-button">
                            <img src={downloadIcon} alt="download"/>
                        </button>

                    </div>

                </div>
            </div>
        </div>
    )
}