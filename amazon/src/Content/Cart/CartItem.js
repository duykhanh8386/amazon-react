import { useDispatch } from "react-redux";
import { useRef } from "react";
import { deleteItem, updateQuantity } from "../../component/action/cart";

function CartItem(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const handleUp = () => {
    dispatch(updateQuantity(item.id));
    inputRef.current.value = parseInt(inputRef.current.value) + 1;
  }
  const handleDown = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, -1));
      inputRef.current.value = parseInt(inputRef.current.value) - 1;
    }

  }
  const handleDelete = () => {
    dispatch(deleteItem(item.id, -1));
  }
  return (
    <>
      <div className="cart__item" >
        <div className="cart__image">
          <img src={item.info.image} alt={item.info.name} />
        </div>
        <div className="cart__content--middle">
          <h4 className="cart__title">{item.info.name}</h4>
          <div className="cart__title--stock">In Stock</div>
          <div className="cart__title--return"> FREE International Returns</div>
          <div className="summary__gift">
        <input type="checkbox" id="gift" />
        <label htmlFor="gift">This order contains a gift</label>
      </div>
          <div className="cart__quantity">
            <button onClick={handleDown}>-</button>
            <input ref={inputRef} defaultValue={item.quantity} />
            <button onClick={handleUp}>+</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
        <div className="cart__content--right">
          <div className="product__discount">
            <div className="product__discount--price">{item.info.discount}% off</div>
            <div className="product__discount--title">Limited time deal</div>
          </div>
          <div className="product__price--new">${(item.info.price * (100 - Number(item.info.discount)) / 100).toFixed(0)}</div>
          <div className="product__price">Typical <span className="product__price--old">${item.info.price}</span></div>
        </div>
      </div>
    </>
  )
}
export default CartItem;