import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Space from './pages/Space';
import Home from './pages/Home';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/spaces" element={<Home />} />
        <Route path="/spaces/:id" element={<Space />} />
      </Routes>
    </>
  );
}

export default App;
