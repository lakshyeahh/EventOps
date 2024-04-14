import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Login from './pages/login';
import SignUp from './pages/signUp';
import Dashboard from './pages/dashboard';
import UserPage from './pages/userPage';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path="/"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<SignUp />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
            <Route
              path="/dashboard/user"
              element={<UserPage />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;