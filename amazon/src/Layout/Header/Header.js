import { EnvironmentOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import logo from "../../logo/logo.png";
import { Button, Col, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { getCategory } from "../../services/categoryService";
import "./Header.scss"
import MenuHeader from "./MenuHeader";
import CartMini from "../../component/CartItem/CartMini";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../component/contexts/UserContext";
import { useDispatch } from "react-redux";
import { clearCart } from "../../component/action/cart";
const { Option } = Select
function Header({ onSearch }) {
  const [cat, setCat] = useState([]);
  const { user, setUser } = useUser();
  //Search Input
  const [searchValue, setSearchValue] = useState("");
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch(); // ✅ Khai báo
  const navigate = useNavigate();
  const handleSearch = (value) => {
    onSearch(value.trim().toLowerCase());
  };
  const handleClick = () => {
    setShowModal(!showModal);// nếu đã đăng nhập thì không show modal nữa
  }
  useEffect(() => {
    const fetchCat = async () => {
      const response = await getCategory();
      setCat(response)
    }
    fetchCat();
  }, [])
  const handleLogout = () => {
  dispatch(clearCart());
  setUser(null);
  navigate("/signin");
};
  return (
    <>

      <div className="nav">
        <div className="logo">
          <div className="logo__div">
            <img className="logo__div--image" src={logo} alt="" />
          </div>
        </div>
        <div className="local">
          <div className="local__div">
            <p>Deliver to</p>
            <h5><EnvironmentOutlined />Vietnam</h5>
          </div>
        </div>
        <div className="search">
          <div className="search__categories">
            <Select defaultValue="All" style={{ height: "40px" }} dropdownStyle={{ width: '150px' }}>
              <Option value="All">All</Option>
              {cat.map(catItem => (
                <>
                  <Option key={catItem.id} value={catItem.name}>
                    {catItem.name}
                  </Option>
                </>
              ))}
            </Select>
          </div>
          <div className="search__div--input">
            <Input.Search
              placeholder="Search Amazon"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onSearch={handleSearch} // Gọi khi nhấn Enter
            />
          </div>

        </div>
        <div className="header__lang">
          <img src="https://flagcdn.com/us.svg" alt="US Flag" className="header__flag" />
          <span>EN</span>
        </div>
        <div className="header__account" onClick={handleClick}>
          <span className="header__line1">
            Hello, {user ? user.name : "sign in"}
          </span>
          <span className="header__line2">
            {user ? "Welcome back!" : "Account & Lists ▾"}
          </span>

          {showModal && (
            !user ? (
              <div className="header__signin">
                <Button color="yellow" href="/signin">Sign in</Button>
                <div>New customer? <Link to="/signin/create-account">Start here.</Link></div>
              </div>
            ) : (
              <div className="header__signin">
                <Button color="yellow" onClick={handleLogout}>Log out</Button>
              </div>
            )
          )}
        </div>
        <div className="header__orders">
          <span className="header__line1">Returns</span>
          <span className="header__line2">& Orders</span>
        </div>


        <CartMini />

      </div>
      <MenuHeader />
    </>

  )
}
export default Header;