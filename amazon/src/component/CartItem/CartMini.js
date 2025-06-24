import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {ShoppingCartOutlined} from "@ant-design/icons"
function CartMini(){
  const cart = useSelector(state => state.cartReducer);

  const totalItem = cart.reduce((sum,item)=>{
    return sum+ item.quantity;
  },0);

  return(
    <>
    <Link className="cart__mini" to="/cart" state={{totalItem}}>
    <div className="cart__icon-wrapper">
      <ShoppingCartOutlined style={{ fontSize: "50px" }} className="icon__cart"/>
    <span className="total__cart">{totalItem}</span> 
      </div>Cart
    </Link>
    </>
  )
}
export default CartMini;