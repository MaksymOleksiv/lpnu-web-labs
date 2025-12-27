import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home/Home';
import Catalog from './components/pages/Catalog/Catalog';
import ItemPage from './components/pages/ItemPage/ItemPage';
import Cart from './components/pages/Cart/Cart';

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="/item/:id" element={<ItemPage />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
