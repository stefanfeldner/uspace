import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Space from './pages/Space';
import Home from './pages/Home';
import Profile from './components/Profile/Profile';

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
