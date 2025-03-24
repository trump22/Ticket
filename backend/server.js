// backend/server.js
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connect } from './proxyHelper.js';
const BASE_URL = process.env.BACKEND_API_BASE_URL;



const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

connect(app, '/getAllEvent', 'get', `${BASE_URL}/api/Event/GetAllEvent`);
connect(app, '/login', 'post', `${BASE_URL}/api/Authen/Login`);
connect(app, '/register', 'post', `${BASE_URL}/api/Authen/Register`);
app.listen(PORT, () => {
    console.log(`Proxy server đang chạy tại http://localhost:${PORT}`);

});
