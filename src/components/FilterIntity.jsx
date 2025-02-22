/* eslint-disable react/prop-types */

//images
import closeIcon from "../Icons/close.png";

export default function FilterIntity (props) {
    return (
        <div className="filter-intity">
            <img src={closeIcon} className="remove-icon"
                onClick={props.OnEdit} id={props.filterId} name="remove"/>

            <p className="filter-title">
                {props.filterName}
            </p>
        </div>
    )
}