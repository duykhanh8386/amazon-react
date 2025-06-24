
import { Outlet } from "react-router-dom"
import Header from "./Header/Header";
import "./index.css"
import { useState } from "react";
import Footer from "./Footer/Footer";
function Layout(){
    const [keyword, setKeyword] = useState("");
    return(
        <>
        <header>
            <Header onSearch={setKeyword} />
        </header>
        <main>
            <Outlet context={{ keyword }}/>
        </main>
        <footer>
          <Footer/>
        </footer>
        </>
    )
}
export default Layout; 