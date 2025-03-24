import React from "react";

const TicketTabs = React.lazy(() => import("../../components/ticket/tab.jsx"));

const TicketTable = () =>{
    return(
        <div>
            <TicketTabs/>
        </div>
    )
}
export default TicketTable;