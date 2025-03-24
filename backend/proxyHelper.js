import axios from 'axios';

export const connect = (app, route, method, apiURL) => {
    app[method.toLowerCase()](route, async (req, res) => {
        try {
            const response = await axios({
                method: method.toLowerCase(),
                url: apiURL,
                data: req.body,     // POST, PUT, DELETE
                params: req.query,  // GET
            });

            res.json(response.data);
        } catch (err) {
            console.error(`❌ Lỗi proxy [${method.toUpperCase()}] ${route}:`, err.message);
            res.status(err.response?.status || 500).json({ error: 'Lỗi proxy khi gọi API backend' });
        }
    });
};
