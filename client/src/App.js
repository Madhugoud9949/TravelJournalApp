// client/src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; 
import Login from "./pages/Login"; 
import Register from "./pages/Register"; 
import Create from "./pages/Create";
import View from "./pages/View";
import { useContext } from "react"; 
import { AuthContext } from "./authContext"; 

// Define ProtectedRoute outside of the App component
const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Login />;
};

function App() {
  return ( 
    <Router>
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} /> 
        <Route path="/login" element={<Login />} /> 
        <Route path="/register" element={<Register />} /> 
        <Route path="/create" element={<ProtectedRoute><Create /></ProtectedRoute>} /> 
        <Route path="/view/:id" element={<ProtectedRoute><View /></ProtectedRoute>} /> 
      </Routes>
    </Router>
  );
} 
  
export default App;
