/* eslint-disable react/prop-types */
//components
import FileIndex from "./FileIndex";
import excellFiles from "../database/excellFiles";

export default function IndexContainer({yearFilter, monthFilter, typeFilter=[]}) {

    function checkFilters(tags, year, month) {
        const filterByYear = (!yearFilter || yearFilter.length === 0);
        const filterByMonth = (!monthFilter || monthFilter.length === 0);
        const filterByType = (!typeFilter || typeFilter.length ===0);

        const matchYear = filterByYear || yearFilter.includes(year);
        const matchMonth = filterByMonth || monthFilter.includes(month);
        const matchType = filterByType || typeFilter.every(item => tags.includes(item));

        return matchYear && matchMonth && matchType;
    }
    
    const createFiles =excellFiles.map ((file) => {
        if (checkFilters(file.tags, file.year, file.month)){

            return (
                <FileIndex
                key={file.fileId} 
                name={file.name}
                month={file.month}
                year={file.year}
                type={file.type}
                fileDate={file.fileDate}/>
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