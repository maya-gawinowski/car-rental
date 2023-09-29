import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT: number = 3000;

interface Car {
    id: number;
    brand: string;
    model: string;
}

const cars: Car[] = [
    {
        id: 1,
        brand: 'Toyota',
        model: 'Camry'
    },
    {
        id: 2,
        brand: 'Honda',
        model: 'Accord'
    }
];

app.get('/cars', (req: Request, res: Response) => {
    res.json(cars);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
