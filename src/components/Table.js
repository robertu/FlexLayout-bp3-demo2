import React from "react";
import { Column, Table, Cell } from "@blueprintjs/table";

export default () => {
    const cellRenderer = (rowIndex) => {
        return <Cell>{`$${(rowIndex * 10).toFixed(2)}`}</Cell>
    };
    return (
        <Table numRows={40}>
            <Column name="Dollars" cellRenderer={cellRenderer}/>
            <Column name="Dollars" cellRenderer={cellRenderer}/>
            <Column name="Dollars" cellRenderer={cellRenderer}/>
            <Column name="Dollars" cellRenderer={cellRenderer}/>
            <Column name="Dollars" cellRenderer={cellRenderer}/>
            <Column name="Dollars" cellRenderer={cellRenderer}/>
            <Column name="Dollars" cellRenderer={cellRenderer}/>
        </Table>
    )    
}