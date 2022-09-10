import { CurrencyValue } from './currency';

export type Address = `${string},${string},${string}`;

export interface Trip {
  /**
   * @property {Address} startAddress - i.e. Plac Trzech Krzyży 3, Warszawa, Polska
   */
  startAddress: Address;
  /**
   * @property {Address} startAddress - i.e. Plac Trzech Krzyży 3, Warszawa, Polska
   */
  destinationAddress: Address;
  /**
   * @property {MoneyValue} price - i.e. 27.32PLN
   */
  price: CurrencyValue;
  date: Date;
}

export const validateAddress = (address: Address) => {
  if (address.split(',').length === 3) return true;
  return false;
};
