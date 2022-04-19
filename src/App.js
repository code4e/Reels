import logo from './logo.svg';
import './App.css';
import SignUp from './Components/SignUp';
import Login from './Components/Login';
import Feed from './Components/Feed';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { AuthProvider } from './Context/AuthContext';
import PrivateRoute from './Components/PrivateRoute';
import ForgotPassword from './Components/ForgotPassword';
import React from 'react';


function App() {
  return (
    <>

      <AuthProvider>
        <Routes>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
          {/* <Route path="/feed" element={<PrivateRoute component={Feed} />}/> */}

          {/* <Route
            path="/feed"
            element={
              <PrivateRoute>
                <Feed />
              </PrivateRoute>
            }
          /> */}

          <Route path="/feed" element={<PrivateRoute />}>
            <Route path="/feed" element={<Feed replace to="feed" />} />
            {/* <Route path="feed" element={<Feed />} /> */}
            
          </Route>

          <Route path="forgotpassword" element={< ForgotPassword />}/>

        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
