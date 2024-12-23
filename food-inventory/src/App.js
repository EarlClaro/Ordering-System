import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Home';
import Login from './Components/Login'; // Assuming you have a Login component
import Register from './Components/Register'; // Assuming you have a Register component
import FoodItems from './Components/FoodItem';
import Dashboard from './Pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} /> {/* Login route */}
        <Route path="/register" element={<Register />} /> {/* Register route */}
        <Route path="/food-items" element={<FoodItems />} /> {/* Example route for FoodItems */}
        <Route path="/dashboard" element={<Dashboard />}/>


      </Routes>
    </Router>
  );
}

export default App;
