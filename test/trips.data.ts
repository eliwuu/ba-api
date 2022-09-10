import { Trip } from 'src/models/trip';

const trips: Set<Trip> = new Set([
  {
    destinationAddress: 'Niepodległości 92/98, Warszawa, Polska',
    startAddress: 'Dzielna 32, Warszawa, Polska',
    price: '200.00PLN',
    date: new Date(), // UTC date
  },
]);
