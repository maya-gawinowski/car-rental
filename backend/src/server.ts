import express, { Express, Request, Response } from 'express';

const app: Express = express();
const PORT: number = 3000;
interface Location {
    id: string;
    name: string;
    address: string;
    cars: string[];
}
interface Car {
    id: string;
    brand: string;
    model: string;
    pricePerDay: number;
    numberOfSeats: number;
    isAutomatic: boolean;
    isElectric: boolean;
    picture: string;
}

const cars: Car[] = [
    {
        "id": "1",
        "model": "Volkswagen Golf",
        "brand": "Volkswagen",
        "pricePerDay": 60,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1618767747322-64e376fd4826?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"
      },
      {
        "id": "2",
        "model": "Renault Clio",
        "brand": "Renault",
        "pricePerDay": 55,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1666335009171-3ddc17937d6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
      },
      {
        "id": "3",
        "model": "BMW 3 Series",
        "brand": "BMW",
        "pricePerDay": 80,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1619444033144-0d879522df42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
      },
      {
        "id": "4",
        "model": "Ford Focus",
        "brand": "Ford",
        "pricePerDay": 55,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1582467029213-ce71667c2e28?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
      },
      {
        "id": "5",
        "model": "Audi A3",
        "brand": "Audi",
        "pricePerDay": 70,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://images.unsplash.com/photo-1541800658-6599fffd81c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1832&q=80"
      },
      {
        "id": "6",
        "model": "Ford Transit",
        "brand": "Ford",
        "pricePerDay": 90,
        "numberOfSeats": 3,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/2014_Ford_Transit_%28fr%29.jpg/375px-2014_Ford_Transit_%28fr%29.jpg"
      },
      {
        "id": "7",
        "model": "Mercedes  Sprinter",
        "brand": "Mercedes-Benz",
        "pricePerDay": 110,
        "numberOfSeats": 2,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Mercedes-Benz_Sprinter_%282018%29_IMG_3503.jpg/375px-Mercedes-Benz_Sprinter_%282018%29_IMG_3503.jpg"
      },
      {
        "id": "8",
        "model": "Mercedes  E-Class",
        "brand": "Mercedes-Benz",
        "pricePerDay": 95,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Mercedes-Benz_W213_E_350_4_matic_AMG_Line_white_%28cropped2%29.jpg/420px-Mercedes-Benz_W213_E_350_4_matic_AMG_Line_white_%28cropped2%29.jpg"
      },
      {
        "id": "9",
        "model": "Toyota Camry",
        "brand": "Toyota",
        "pricePerDay": 65,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg/420px-2018_Toyota_Camry_%28ASV70R%29_Ascent_sedan_%282018-08-27%29_01.jpg"
      },
      {
        "id": "10",
        "model": "Honda Accord",
        "brand": "Honda",
        "pricePerDay": 63,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Honda_Accord_%28CV3%29_EX_eHEV%2C_2021%2C_front.jpg/420px-Honda_Accord_%28CV3%29_EX_eHEV%2C_2021%2C_front.jpg"
      },
      {
        "id": "11",
        "model": "Tesla Model 3",
        "brand": "Tesla",
        "pricePerDay": 95,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": true,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/2019_Tesla_Model_3_Performance_AWD_Front.jpg/420px-2019_Tesla_Model_3_Performance_AWD_Front.jpg"
      },
      {
        "id": "12",
        "model": "Tesla Model S",
        "brand": "Tesla",
        "pricePerDay": 120,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": true,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/2018_Tesla_Model_S_75D.jpg/420px-2018_Tesla_Model_S_75D.jpg"
      },
      {
        "id": "13",
        "model": "Porsche Taycan",
        "brand": "Porsche",
        "pricePerDay": 150,
        "numberOfSeats": 4,
        "isAutomatic": true,
        "isElectric": true,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/2020_Porsche_Taycan_4S_79kWh_Front.jpg/420px-2020_Porsche_Taycan_4S_79kWh_Front.jpg"
      },
      {
        "id": "14",
        "model": "Chevrolet Bolt",
        "brand": "Chevrolet",
        "pricePerDay": 70,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": true,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/2022_Chevrolet_Bolt_EV_%28United_States%29_front_view.jpg/420px-2022_Chevrolet_Bolt_EV_%28United_States%29_front_view.jpg"
      },
      {
        "id": "16",
        "model": "Nissan Leaf",
        "brand": "Nissan",
        "pricePerDay": 60,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": true,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Nissan_Leaf_2018_%2831874639158%29_%28cropped%29.jpg/420px-Nissan_Leaf_2018_%2831874639158%29_%28cropped%29.jpg"
      },
      {
        "id": "17",
        "model": "Ford Mustang",
        "brand": "Ford",
        "pricePerDay": 100,
        "numberOfSeats": 4,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/2018_Ford_Mustang_GT_5.0.jpg/420px-2018_Ford_Mustang_GT_5.0.jpg"
      },
      {
        "id": "18",
        "model": "Chevrolet Camaro",
        "brand": "Chevrolet",
        "pricePerDay": 110,
        "numberOfSeats": 4,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/Chevrolet_Camaro_2.0_Turbo.jpg/420px-Chevrolet_Camaro_2.0_Turbo.jpg"
      },
      {
        "id": "19",
        "model": "Aston Martin Vantage",
        "brand": "Aston Martin",
        "pricePerDay": 200,
        "numberOfSeats": 2,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Aston-Martin_Vantage_%281973%29_%2834328531642%29.jpg/420px-Aston-Martin_Vantage_%281973%29_%2834328531642%29.jpg"
      },
      {
        "id": "21",
        "model": "Volkswagen Golf",
        "brand": "Volkswagen",
        "pricePerDay": 60,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/2020_Volkswagen_Golf_Style_1.5_Front.jpg/420px-2020_Volkswagen_Golf_Style_1.5_Front.jpg"
      },
      {
        "id": "22",
        "model": "Renault Clio",
        "brand": "Renault",
        "pricePerDay": 55,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Renault_Clio_V_%282023%29_Esprit_Alpine_Automesse_Ludwigsburg_2023_1X7A0012.jpg/420px-Renault_Clio_V_%282023%29_Esprit_Alpine_Automesse_Ludwigsburg_2023_1X7A0012.jpg"
      },
      {
        "id": "23",
        "model": "BMW 3 Series",
        "brand": "BMW",
        "pricePerDay": 80,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/BMW_G20_IMG_0167.jpg/420px-BMW_G20_IMG_0167.jpg"
      },
      {
        "id": "24",
        "model": "Ford Focus",
        "brand": "Ford",
        "pricePerDay": 55,
        "numberOfSeats": 5,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/2018_Ford_Focus_ST-Line_X_1.0.jpg/420px-2018_Ford_Focus_ST-Line_X_1.0.jpg"
      },
      {
        "id": "25",
        "model": "Mercedes-Benz Sprinter",
        "brand": "Mercedes-Benz",
        "pricePerDay": 110,
        "numberOfSeats": 2,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/2019_Mercedes-Benz_Sprinter_314_CDi_2.1.jpg/420px-2019_Mercedes-Benz_Sprinter_314_CDi_2.1.jpg"
      },
      {
        "id": "26",
        "model": "Ford Transit",
        "brand": "Ford",
        "pricePerDay": 90,
        "numberOfSeats": 2,
        "isAutomatic": true,
        "isElectric": false,
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/2016_Ford_Transit_350_2.2.jpg/420px-2016_Ford_Transit_350_2.2.jpg"
      }
];
const Odense : Location = {
    id: '1',
    name: 'Odense',
    address: 'Hjallesevej 135',
    cars: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
}
const Aarhus : Location = {
    id: '2',
    name: 'Aarhus',
    address: 'Randersvej 400',
    cars: ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20']
}
const Copenhagen : Location = {
    id: '3',
    name: 'Copenhagen',
    address: 'Amagerbrogade 100',
    cars: ['21', '22', '23', '7', '6', '1', '2', '3', '5', '6']
}
const Roskilde : Location = {
    id: '4',
    name: 'Roskilde',
    address: 'Ringstedvej 100',
    cars: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']
}
const locations: Location[] = [Odense, Aarhus, Copenhagen, Roskilde];
app.get('/cars', (req: Request, res: Response) => {
  const locationQuery = req.query.location;
  if (locationQuery == null) {
    res.json(cars);
  } else {
    const location = locations.find(l => l.name.toLowerCase() === locationQuery.toString().toLowerCase());
    if (location) {
      const locationCars = cars.filter(car => location.cars.includes(car.id));
      res.json(locationCars);
    } else {
      res.status(404).send('Location not found');
    }
  }

});
app.get('/locations', (req: Request, res: Response) => {
    res.json(locations);
});
app.get('/cars/:carId', (req: Request, res: Response) => {
  const carId = req.params.carId;
  const car = cars.find(c => c.id === carId);
  if (car) {
    res.json(car);
  } else {
    res.status(404).send('Car not found')
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
