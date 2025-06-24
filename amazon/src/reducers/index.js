import cartReducer from "./cart";
import { combineReducers } from 'redux';
import productListReducer from "./product";
const allReducers = combineReducers({
  cartReducer,
  productListReducer,
})
export default allReducers;