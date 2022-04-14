import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <>
      
        <Routes>
          <Route path="/signup" element={<SignUp /> } />
          <Route path="/login" element={<Login />} />
        </Routes> 
    </>
  );
}

export default App;
