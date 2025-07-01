import Cart from "../Content/Cart/Cart";
import ListProduct from "../Content/ListProduct/ListProduct";
import ProductItem from "../component/ProductInfor/ProductItem";
import Layout from "../Layout";
import Signin from "../component/Login/Signin";
import CreateAccount from "../component/Login/CreateAccount";

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
    },
    {
              path:"signin",
              element:<Signin/>,
              
            },
            {
                path:"signin/create-account",
                element:<CreateAccount/>
              }
]