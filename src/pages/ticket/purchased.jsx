const BuyList = React.lazy(() => import("../../components/ticket/buyList.jsx"));

const PurchasedTicket = () =>{
    return (
        <div>
            <div><BuyList/></div>
        </div>
    )
}
export default PurchasedTicket