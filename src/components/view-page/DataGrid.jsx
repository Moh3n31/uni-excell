// import { useState, useEffect } from "react";

/* eslint-disable react/prop-types */
export default function DataRow(props) {

    function createDataRow() {
        return props.item.map((itemValue, index) => (
            <div key={index} className="row-element">
                {itemValue}
            </div>
        ));
    }

    function createEditRow() {
        return props.item.map((itemValue, index) => (
            <input key={index} className="row-edit" id={`${props.column}-${index}`}
            value={itemValue} type="text" onChange={props.handleChange}/>
        ));
    }

    return (
        <div>
            <div className="data-grid-row" 
                style={{
                    display: "grid", 
                    gridTemplateColumns: `repeat(${props.item.length}, 1fr)`
                }}>
                {!props.editView && createDataRow()}
                {props.editView && createEditRow()}
            </div>
        </div>
    );
}