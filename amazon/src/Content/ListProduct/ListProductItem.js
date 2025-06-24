import { StarFilled } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, updateQuantity } from "../../component/action/cart";
function ListProductItem(props){
  const {pagedData} = props;
  const dispatch = useDispatch();
  const cart = useSelector(state=>state.cartReducer);
  const handleAddToCart=(item)=>{
    if(cart.some(itemCart=>itemCart.id===item.id)){
      dispatch(updateQuantity(item.id));
    }
    else{
      dispatch(addToCart(item.id,item));
    }
  }
  return(
    <>
     <div className="list__product">

                { Array.isArray(pagedData) && (pagedData.map(item => (
                    <> <div className="product__item0">
                    <Link to="product_information" className="product__item" key={item.id} state={{item}}>
                       
                            <div className="product__image">
                                <div className="product__image--size">
                                    <img className="product__image--img" src={item.image} />
                                </div>
                            </div>
                            <div className="product__content">
                                <div className="product__name">{item.name}</div>
                                <div className="product__sold">
                                    <div className="product__sold--star">
                                        <StarFilled style={{ color: "yellow" }} /><StarFilled style={{ color: "yellow" }} />
                                        <StarFilled style={{ color: "yellow" }} /><StarFilled style={{ color: "yellow" }} />
                                        <StarFilled style={{ color: "yellow" }} />
                                    </div>
                                    <div className="product__sold--count">{item.sold}</div>
                                </div>
                                <div className="product__discount">
                                    <div className="product__discount--price">{item.discount}% off</div>
                                    <div className="product__discount--title">Limited time deal</div>
                                </div>
                                <div className="product__price--new">${(item.price * (100 - Number(item.discount)) / 100).toFixed(0)}</div>
                                <div className="product__price">Typical <span className="product__price--old">${item.price}</span></div>
                            </div>
                       
                        
                        </Link>
                         <button className="product__button-add" onClick={() => handleAddToCart(item)}>Add to cart</button>
                         </div>
                       
                    </>
                )))}
            </div>
    </>
  )
}
export default ListProductItem;