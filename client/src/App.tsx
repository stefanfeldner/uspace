import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Space from './pages/Space/Space';
import Home from './pages/Home/Home';
import Profile from './pages/Profile/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/spaces" element={<Home />} />
      <Route path="/spaces/:id" element={<Space />} />
      <Route path="/profile/" element={<Profile />} />
    </Routes>
  );
}

export default App;
