/* eslint-disable react/prop-types */
//components
import FilterSelector from "./FilterSelector";

//images
import deleteIcon from "../Icons/delete.png";

export default function FilterSction (props) {

    return (
        <div className="filter-select-section">
            <div className="archive-check">
                <input type="checkbox" id="archive-check" name="archive-check"
                    onChange={props.handleArchiveChange}
                    checked={props.archiveState}/>
                <img src={deleteIcon}/>
            </div>
            <FilterSelector SelectName="سال" selectFilter={props.yearFilter}
                SelectId="yearSelector" Source={props.realYears} checkItem={props.checkItem}
                handleSelectChange={props.handleYearChange}/>

            <FilterSelector SelectName="ماه" selectFilter={props.monthFilter}
                SelectId="monthSelector" Source={props.realMonths} checkItem={props.checkItem}
                handleSelectChange={props.handleMonthChange}/>
                
            <FilterSelector SelectName="نوع" selectFilter={props.typeFilter}
                SelectId="typeSelector" Source={props.realTypes} checkItem={props.checkItem}
                handleSelectChange={props.handleTypeChange}/>
        </div>
    )
}