import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./utils/PrivateRoute"
import Login from "./pages/Authentifcation/Login"
import NotFound from './pages/NotFound/NotFound';
import Register from './pages/Register/Register';
import { ThemeProvider } from './context/ThemeContext';
import RechercheGame from './pages/DashboardUser/RechercheGame';
import DashboardUser from './pages/DashboardUser/DashboardUser';
import EquipeDetailPage from './pages/DashboardUser/EquipeDetailPage';
import CreateGame from './pages/Admin/CreateGame';
import Profile from "./pages/Profile/Profile"
import { AuthProvider } from './context/AuthContext';
import DashboardAdmin from './pages/Admin/Dashboard/DashboardAdmin';
import GamePage from './pages/DashboardUser/GamePage';
import DashboardOrganizer from './pages/DashboardOrganizer/DashboardOrganizer';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<App />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />

            <Route element={<PrivateRoute />}>
              <Route path="/DashboardUser/:id" element={<DashboardUser />} />
              <Route path="/RechercheGame/:id" element={<RechercheGame />} />
              <Route path="/CreateGame/:id" element={<CreateGame />} />
              <Route path="/Profile/:id" element={<Profile />} />
              <Route path="/EquipeDetailPage/:id" element={<EquipeDetailPage />} />
              <Route path="/Game/" element={<GamePage />} />
              <Route path="/DashboardAdmin/:id" element={<DashboardAdmin />} />
              <Route path="/DashboardOrganizer/:id" element={<DashboardOrganizer />} />

            </Route>
          </Routes>

        </Router>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
