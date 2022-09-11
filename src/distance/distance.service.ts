import { Injectable } from '@nestjs/common';
import { Address } from 'src/models/trip';

@Injectable()
export class DistanceService {
  public async calculateByStreetName(
    startAddress: Address,
    destinationAddress?: Address,
  ): Promise<number | Error> {
    switch (startAddress) {
      case 'a':
        return new Promise((resolve, _reject) => {
          resolve(250);
        });
      case 'b':
        return new Promise((resolve, _reject) => {
          resolve(
            new Error(
              'Current location street name ' + startAddress + ' is incorrect',
            ),
          );
        });
    }
  }
}
