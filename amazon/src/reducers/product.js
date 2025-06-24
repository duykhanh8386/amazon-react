const initialState = [];

export default function productListReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_PRODUCT_LIST":
      return action.payload;
    default:
      return state;
  }
}
