import './App.css';
import { Route, Routes } from 'react-router-dom';
import UserRegister from './pages/user-register';
import Users from './pages/users';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<UserRegister />} />
        <Route path="users" element={<Users />} />
        <Route path="users/:cpf" element={<UserRegister />} />
      </Routes>
    </div>
  );
}

export default App;
