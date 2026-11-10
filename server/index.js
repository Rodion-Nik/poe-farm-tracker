import express from "express";
import { loadAllItems } from './data/ApiDataBase/data.js';


const app = express();

app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {   // сработает, когда ответ уже отправлен
        console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${Date.now() - start} ms)`);
    });
    next();                    // без этого запрос зависнет
});

const PORT = process.env.PORT || 3000;
app.get('/health', (req, res) => { 
    res.json({ ok: true }) });

app.get('/api/prices', (req, res) => {
    res.json(loadAllItems())
})

app.listen(PORT, () => {
    console.log(`Сервер запущен: http://localhost:${PORT}`);
});

