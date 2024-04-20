import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// pages & components
import Login from './pages/login';
import SignUp from './pages/signUp';
import Dashboard from './pages/dashboard';
import UserPage from './pages/userPage';
import RequestForm from './pages/requestForm';
import FinalForm from './pages/finalForm';


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
            <Route
              path="/dashboard/requestform"
              element={<RequestForm />}
            />
            <Route
              path="/dashboard/requestform/:event_token"
              element={<FinalForm />}
            />

          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}


export default App;