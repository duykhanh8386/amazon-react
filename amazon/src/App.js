import logo from './logo.svg';
import './App.css';
import Layout from './Layout';
import AllRoutes from './component/AllRoutes';
import CartPersistence from './component/CartPersitence/CartPersitence';

function App() {
  return (
    <>
    <CartPersistence />
     <AllRoutes/>
    </>
  );
}

export default App;
