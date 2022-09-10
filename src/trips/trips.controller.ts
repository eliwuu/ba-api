import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { Validate } from 'src/models/currency';
import { Trip, validateAddress } from 'src/models/trip';
import Joi from 'joi';

@Controller('trips')
export class TripsController {
  @Post()
  addTrip(@Body() trip: Trip, @Res() res: Response) {
    const validateTripData = this.validateTrip(trip);

    if (validateTripData.error) {
      return { ...validateTripData };
    } else {
      return res.status(200).send();
    }
  }

  private validateTrip(trip: Trip) {
    const schema = Joi.object<Trip>({
      startAddress: Joi.custom((value, helper) => {
        const isValid = validateAddress(value);

        if (!isValid)
          helper.error(
            'Address format is invalid, expected format is {string},{string},{string}',
          );
      }).required(),
      destinationAddress: Joi.string().required(),
      price: Joi.custom((value, helper) => {
        const isValid = Validate.moneyValue(value);

        if (!isValid)
          helper.error(
            'Price is malformated, make sure is in format of {int}.{int}{Currency}, i.e. 25.73PLN',
          );
      }).required(),
      date: Joi.date().required(),
    });

    return schema.validate(trip);
  }
}
