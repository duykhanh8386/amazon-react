import Cart from "../Content/Cart/Cart";
import ListProduct from "../Content/ListProduct/ListProduct";
import ProductItem from "../component/ProductInfor/ProductItem";
import Layout from "../Layout";

export const router =[
    {
        path:"/",
        element:<Layout/>,
        children:[
            {
                path:"/",
            element:<ListProduct/>,
            
            },
            {
              path:"product_information",
              element:<ProductItem/>
            },
            {
                path:"cart",
                element:<Cart/>
            }
        ]   
    }
]