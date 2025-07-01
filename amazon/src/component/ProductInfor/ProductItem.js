import { Col, Row, Image } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductItem.scss";
import { StarFilled } from "@ant-design/icons"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../action/cart";
import { useUser } from "../contexts/UserContext";
function ProductItem() {
  const locations = useLocation();
  const { item } = locations.state;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useUser();
  const cart = useSelector(state=>state.cartReducer);
  const handleAddToCart=(item)=>{
    if(!user){
      return navigate("/signin");
    }else{
       if(cart.some(itemCart=>itemCart.id===item.id)){
      dispatch(updateQuantity(item.id));
    }
    else{
      dispatch(addToCart(item.id,item));
    }
    }
   
  }
  return (
    <>
      <Row gutter={[20, 20]} className="mt-20">
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <Image className="productDetail__image" src={item.image} alt={item.name} />
        </Col>
        <Col xxl={11} xl={11} lg={11} md={24} sm={24} xs={24}>
          <div className="productDetail__info">
            <div className="productDetail__info--title">
              {item.name}
            </div>

            <div className="productDetail__sold">
              <div className="productDetail__sold--star">
                <StarFilled style={{ color: "#DE7921" }} />
                <StarFilled style={{ color: "#DE7921" }} />
                <StarFilled style={{ color: "#DE7921" }} />
                <StarFilled style={{ color: "#DE7921" }} />
                <StarFilled style={{ color: "#DE7921" }} />
              </div>
              <div className="productDetail__sold--count">{item.sold} bought in past month</div>
            </div>
            <div className="product__recomment">Amazon's choice</div>
            <hr></hr>
            <div className="productDetail__discount--title">Limited time deal</div>
            <div className="productDetail__discount">
              <div className="productDetail__discount--price">- {item.discount}% to </div>
              <div className="productDetail__price--new">
                ${(item.price * (100 - Number(item.discount)) / 100).toFixed(0)}
              </div>
            </div>
            <div className="productDetail__price">
              Typical <span className="productDetail__price--old">${item.price}</span>
            </div>
            <div className="productDetail__shipping">
              <span className="productDetail__shipping--cost">
                No Import Charges & $27.82 Shipping to Vietnam Details
              </span>
              <span className="productDetail__shipping--rule">30-day refund/replacement</span>
            </div>
            <div className="productDetail__specs">
              <div className="productDetail__specs--item"><strong>Color</strong><span>Multicolor</span></div>
              <div className="productDetail__specs--item"><strong>Brand</strong><span>REEMEER</span></div>
              <div className="productDetail__specs--item"><strong>Indoor/Outdoor Usage</strong><span>Indoor</span></div>
              <div className="productDetail__specs--item"><strong>Special Feature</strong><span>Corded</span></div>
              <div className="productDetail__specs--item"><strong>Light Source Type</strong><span>LED</span></div>
              <div className="productDetail__specs--item"><strong>Power Source</strong><span>AC</span></div>
              <div className="productDetail__specs--item"><strong>Light Color</strong><span>Multicolor</span></div>
              <div className="productDetail__specs--item"><strong>Theme</strong><span>Christmas, weddings, Halloween, parties</span></div>
              <div className="productDetail__specs--item"><strong>Occasion</strong><span>Christmas, weddings, Halloween, parties</span></div>
              <div className="productDetail__specs--item"><strong>Style</strong><span>Hiện đại</span></div>
            </div>

            <div className="productDetail__desc">
              <h2>About this system</h2>
              <div className="productDetail__desc--info">
                <pre>{item.description}</pre>
              </div>
            </div>
          </div>
        </Col>
        <Col xxl={6} xl={6} lg={6} md={24} sm={24} xs={24}>
          <div className="productDetail__buybox">
            <h2 className="text" style={{ fontSize: '24px', fontWeight: 600 }}>${(item.price * (100 - Number(item.discount)) / 100).toFixed(2)}</h2>
            <p className="text" style={{ color: "#007185", fontSize: "14px", color: "#5abbfa" }}>FREE International Returns</p>
            <p className="text" style={{ fontSize: "14px" }}>$38.04 Shipping & Import Charges to Vietnam</p>
            <p className="text" style={{ fontWeight: 500 }}>Delivery <strong style={{ color: "black" }}>Friday, July 25</strong></p>
            <p className="text" style={{ color: "#007185", fontSize: "14px" }}>Deliver to Vietnam</p>

            <p className="text" style={{ color: "#007600", fontWeight: 600 }}>In Stock</p>

            <select className="product__select-qty">

              <option value="1">Quantity: 1</option>
            </select>

            <button className="product__button-cart" onClick={() => handleAddToCart(item)}>Add to Cart</button>
            <button className="product__button-buy">Buy Now</button>

            <p className="product__buy-info"><strong>Ships from</strong> Amazon.com</p>
            <p className="product__buy-info"><strong>Sold by</strong> Amazon.com</p>
            <p className="product__buy-info"><strong>Payment</strong> <span style={{ color: "#007185" }}>Secure transaction</span></p>

            <label className="product__gift-check">
              <input type="checkbox" /> Add a gift receipt for easy returns
            </label>

          </div>

        </Col>
      </Row>

    </>
  )
}
export default ProductItem;