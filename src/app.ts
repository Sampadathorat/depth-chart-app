import express from 'express';
import depthChartRoutes from './routes/depthChartRoutes';

const app = express();

app.use(express.json());
app.use('/depthChart', depthChartRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
