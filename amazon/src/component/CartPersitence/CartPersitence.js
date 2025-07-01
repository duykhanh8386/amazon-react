// src/CartPersistence.jsx
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUser } from "../contexts/UserContext";
import { clearCart, loadCart } from "../action/cart";

export default function CartPersistence() {
  const { user } = useUser();
  const cart = useSelector(state => state.cartReducer);
  const dispatch = useDispatch();

  // 1. Khi user thay đổi: load hoặc clear cart
  useEffect(() => {
    if (user && user.username) {
      const saved = JSON.parse(
        localStorage.getItem(`cart_${user.username}`)
      ) || [];
      dispatch(loadCart(saved));
    } else {
      dispatch(clearCart());
    }
  }, [user, dispatch]);

  // 2. Khi cart thay đổi: lưu vào localStorage riêng của user
  useEffect(() => {
    if (user && user.username) {
      localStorage.setItem(
        `cart_${user.username}`,
        JSON.stringify(cart)
      );
    }
  }, [cart, user]);

  return null; // không render gì
}
