/* eslint-disable react/prop-types */
//components
import FilterSelector from "./FilterSelector";

export default function FilterSction (props) {

    return (
        <div className="filter-select-section">
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