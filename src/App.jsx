import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Photography from './Photography';
import About from './About'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photography" element={<Photography />} />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;