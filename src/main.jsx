// src/main.jsx (ví dụ với Vite)
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css'; // Tailwind hoặc CSS chung
import Navbar from './components/Navbar'; // Đã thay đổi tên để khớp với tên file (Navbar.jsx)
import store from './app/store.js'
import RouteLoader from "./routes/RouteLoader.jsx";
import {BrowserRouter} from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
        <BrowserRouter>
            <Navbar />
            <RouteLoader />
        </BrowserRouter>
    </Provider>
);