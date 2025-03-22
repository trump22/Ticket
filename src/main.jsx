// src/main.jsx (ví dụ với Vite)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactDOM from 'react-dom/client';
import React from "react";
import { store } from './redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.css'; // Tailwind hoặc CSS chung
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/Navbar'; // Đã thay đổi tên để khớp với tên file (Navbar.jsx)
import ProfilePage from './pages/ProfilePage';
import SettingPage from './pages/SettingPage';
import TicketInfor from './pages/TicketInfor';
import TicketList from './pages/TicketList'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/settings" element={<SettingPage />} />
          <Route path="/infor" element={<TicketInfor />} />
          <Route path="/ticketList" element={<TicketList />} />
          <Route path="*" element={<h1>404 - Không tìm thấy trang</h1>} />
        </Routes>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
