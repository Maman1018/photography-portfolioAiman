import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import Photography from './Photography';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/photography" element={<Photography />} />
    </Routes>
  );
}

export default App;