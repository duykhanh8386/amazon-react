import { useEffect, useState } from "react";
import "./ListProduct.scss"
import { getCategory } from "../../services/categoryService";
import { Button, Pagination } from "antd";
import { getListProduct } from "../../services/productService";
import { useOutletContext } from "react-router-dom";
import ListProductItem from "./ListProductItem";
function ListProduct() {
  const { keyword } = useOutletContext();
  const [catMenu, setCatMenu] = useState([]);
  const [products, setProducts] = useState([]);
  //phan trang
  const [currentPage, setCurrentPage] = useState(1);
  //loc theo trang hoac theo cat
  const [filtered, setFiltered] = useState([]);
  const pageSize = 7;
  //to mau button sau khi click
  const [activeCategory, setActiveCategory] = useState("all");
  //Loc va hien thi list product
  useEffect(() => {
    const fetchApi = async () => {
      const getCat = await getCategory();
      const getProducts = await getListProduct();
      setProducts(getProducts.reverse());
      setFiltered(getProducts);
      setCatMenu(getCat);
    }
    fetchApi()
  }, []);
  //Thanh tim kiem
  useEffect(() => {
    if (!keyword) {
      setFiltered(products);
    } else {
      setFiltered(
        products.filter((item) =>
          item.name.toLowerCase().includes(keyword)
        )
      );
    }
  }, [keyword, products]);
  //submit
  const handleSubmit = (value) => {
    if (value === "all") {
      setFiltered(products)
    } else {
      setFiltered(products.filter((item) => item.category === value))
    }
    setCurrentPage(1);
    setActiveCategory(value);
  }
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pagedData = filtered.slice(start, end);

  return (
    <>
    <div className="content__product">
      <div className="banner">
        <img src="https://m.media-amazon.com/images/I/51Yy0-BGlWL.jpg" alt="" />
      </div>
      <div className="cat__menu">
        <button className={`cat__menu--item ${activeCategory === "all" ? "active" : ""}`}
          value="all" onClick={(e) => handleSubmit(e.target.value)}
        >
          All
        </button>
        {catMenu.map((itemCat) => (
          <>
            <button className={`cat__menu--item ${activeCategory === itemCat.name ? "active" : ""}`}
              key={itemCat.id} value={itemCat.name} onClick={(e) => handleSubmit(e.target.value)}
            >
              {itemCat.name}
            </button>
          </>
        ))}
      </div>
      <h2>All products you find here!</h2>
      <hr></hr>

      {/* //Danh sach san pham */}
      <ListProductItem pagedData={pagedData} key={pagedData.id}/>

      {/* phan trang */}
      <Pagination className="current__page"
        current={currentPage}
        pageSize={pageSize}
        total={filtered.length}
        onChange={(page) => setCurrentPage(page)}
        style={{ marginTop: -10, textAlign: "center" }}
      /></div>
    </>
  )
}
export default ListProduct;