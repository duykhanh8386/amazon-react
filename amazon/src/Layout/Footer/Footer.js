import { use, useEffect, useState } from "react";
import "./Footer.scss"
import { getFooter } from "../../services/footerService";
function Footer(){
  const [footer,setFooter] = useState([]);
  useEffect(()=>{
    const fetchApi = async ()=>{
      const result = await getFooter();
      setFooter(result);
    
    }
    fetchApi();
  },[])
  return(
    <>
    {/* Footer 1 */}
    <footer className="footer">
      <div className="footer__back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>Back to top</div>

      <div className="footer__links">
        <div className="footer__column">
          <h4>Get to Know Us</h4>
          <ul>
            <li>Careers</li>
            <li>Blog</li>
            <li>About Amazon</li>
            <li>Investor Relations</li>
            <li>Amazon Devices</li>
            <li>Amazon Science</li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Make Money with Us</h4>
          <ul>
            <li>Sell products on Amazon</li>
            <li>Sell on Amazon Business</li>
            <li>Sell apps on Amazon</li>
            <li>Become an Affiliate</li>
            <li>Advertise Your Products</li>
            <li>Self-Publish with Us</li>
            <li>Host an Amazon Hub</li>
            <li>› See More Make Money with Us</li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Amazon Payment Products</h4>
          <ul>
            <li>Amazon Business Card</li>
            <li>Shop with Points</li>
            <li>Reload Your Balance</li>
            <li>Amazon Currency Converter</li>
          </ul>
        </div>

        <div className="footer__column">
          <h4>Let Us Help You</h4>
          <ul>
            <li>Amazon and COVID-19</li>
            <li>Your Account</li>
            <li>Your Orders</li>
            <li>Shipping Rates & Policies</li>
            <li>Returns & Replacements</li>
            <li>Manage Your Content and Devices</li>
            <li>Help</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="footer__logo">amazon</div>
        <div className="footer__settings">
          <button>🌐 English</button>
          <button>$ USD - U.S. Dollar</button>
          <button>🇺🇸 United States</button>
        </div>
      </div>
    </footer>
    {/* Footer 2 */}
    <footer className="custom-footer">
      <div className="custom-footer__links">
        {footer.map((item, index) => (
          <div key={index} className="custom-footer__item">
            <h4>{item.title}</h4>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
      <div className="custom-footer__bottom">
        <div className="custom-footer__policy">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Consumer Health Data Privacy Disclosure</a>
          <a href="#">Your Ads Privacy Choices</a>
        </div>
        <p>© 1996-2025, Amazon.com, Inc. or its affiliates</p>
      </div>
    </footer>
    </>
  )
}
export default Footer;