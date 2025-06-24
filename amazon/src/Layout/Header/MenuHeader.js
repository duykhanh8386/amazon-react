import {UnorderedListOutlined} from "@ant-design/icons";
import "./MenuHeader.scss"
function MenuHeader(){
    return(
        <>
        <div className="menu__nav">
            <a href="/"><div className="menu__nav--item"><UnorderedListOutlined />All</div></a>
            <a href="/"><div className="menu__nav--item">Today's Deals</div></a>
            <div className="menu__nav--item">Registry</div>
            <div className="menu__nav--item">Prime Video</div>
            <div className="menu__nav--item">Gift Cards</div>
            <div className="menu__nav--item">Customer Service</div>
            <div className="menu__nav--item">Sell</div>
        </div>
        </>
    )
}
export default MenuHeader;