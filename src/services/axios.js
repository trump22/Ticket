import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://13.239.1.215:8080', // Chỉnh lại cho đúng
});

export default instance;