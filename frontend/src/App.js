import './App.css';
import Header from './components/layout/Header/Header';
import Hero from './components/layout/Hero/Hero';
import TopModels from './components/layout/TopModels/TopModels';
import Footer from './components/layout/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      <Hero />
      <TopModels />
      <Footer />
    </div>
  );
}

export default App;
