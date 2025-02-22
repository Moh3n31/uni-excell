/* eslint-disable react/prop-types */
import { useState } from 'react';
//components
import FileIndex from "./FileIndex";
import excellFiles from "../database/excellFiles";

export default function IndexContainer({yearFilter, monthFilter, typeFilter=[],handleView}) {

    const [fileArray, setFileArray] = useState ([...excellFiles]);

    function checkFilters(tags, year, month) {
        const filterByYear = (!yearFilter || yearFilter.length === 0);
        const filterByMonth = (!monthFilter || monthFilter.length === 0);
        const filterByType = (!typeFilter || typeFilter.length ===0);

        const matchYear = filterByYear || yearFilter.includes(year);
        const matchMonth = filterByMonth || monthFilter.includes(month);
        const matchType = filterByType || typeFilter.every(item => tags.includes(item));

        return matchYear && matchMonth && matchType;
    }

    function updateFile(newForm) {
        const temp = [...fileArray];

        const correctedForm = {
            fileId:newForm.fileId, 
            name:newForm.name, 
            month:newForm.month, 
            year:newForm.year, 
            tags:[newForm.tag1, newForm.tag2],
            fileDate:newForm.fileDate
        };

        temp.splice(correctedForm.fileId-1,1,correctedForm);
    
        setFileArray(temp);
    }
    
    
    const createFiles = fileArray.map ((file, index) => {
        if (checkFilters(file.tags, file.year, file.month)&& !file.archived){

            return (
                <FileIndex
                key={index}
                fileId={file.fileId}
                name={file.name}
                month={file.month}
                year={file.year}
                type={file.tags}
                handleView={handleView}
                fileDate={file.fileDate}
                updateFile={updateFile}/>
            );
        }
        else return null;
    })

    return (
        <div className="index-container">
            {createFiles}
        </div>
    )
}