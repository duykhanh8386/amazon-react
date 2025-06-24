import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { deleteAll } from "../../component/action/cart";
import CartList from "./CartList";
import { Col, Row } from "antd";
import ListProductItem from "../ListProduct/ListProductItem";
import { useEffect, useState } from "react";
import { getListProduct } from "../../services/productService";

function Cart() {
  const cart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();
  const locations = useLocation();
  const [pagedData, setProducts] = useState([]);
  const { totalItem} = locations.state;
  const total = cart.reduce((sum, item) => {
    const priceNew = item.info.price * (100 - item.info.discount) / 100;
    return sum + priceNew * item.quantity;
  }, 0);
  const handleDeleteAll = () => {
    dispatch(deleteAll());
  }
  useEffect(()=>{
    const fetchApi = async ()=>{
      const product_list = await getListProduct();
      setProducts(product_list);
    }
    fetchApi()
  },[])
  return (
    <>
    <div className="cart__content">
      <Row gutter={[20,20]}>
        <Col xxl={18} xl={18} lg={18} md={24} sm={24} xs={24}>

          <div className="page__cart">
            <div className="cart__title">
              Shopping Cart
            </div>
            <div className="cart__title2">
               <div><button onClick={handleDeleteAll}>Delete All</button></div>
               <div>Price</div>
            </div>
           

            <div className="cart__item--choose">
              {cart.length > 0 ? (
                <>
                  <CartList />
                  <div className="sub__total">
                    Subtoal <span>({totalItem} item)</span>: <div>${total.toFixed(0)}</div>

                  </div>
                </>
              ) : (
                <>No item added</>
              )

              }
            </div>
          </div>
        </Col>
          <Col xxl={5} xl={5} lg={5} md={24} sm={24} xs={24}>
    <div className="summary__box">
      <div className="summary__subtotal">
        <span>Subtotal ({totalItem} items):</span>
        <strong>${total.toFixed(2)}</strong>
      </div>
      <div className="summary__gift">
        <input type="checkbox" id="gift" />
        <label htmlFor="gift">This order contains a gift</label>
      </div>
      <button className="pay">Proceed to checkout</button>
    </div>

    <div className="suggestion__box">
      <h4>New international customers purchased</h4>
      <div className="list__product--suggest">
      <ListProductItem pagedData={pagedData}/></div>
    </div>
  </Col>
      </Row>
    </div>
    </>
  )
}
export default Cart;