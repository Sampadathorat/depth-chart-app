import express from 'express';
import depthChartRoutes from './routes/depthChartRoutes';
import path from 'path';

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));

app.use(express.json()); // Ensure that the server can parse JSON bodies
app.use('/', depthChartRoutes);

const PORT = 3000; // process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    // const open = await import('open');
    // open.default(`http://localhost:${PORT}`);
});
