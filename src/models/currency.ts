export const currency = ['PLN', 'USD', 'GBP'] as const;
export type Currency = typeof currency[number];
export type CurrencyValue = `${string}${Currency}`;

export class Convert {
  static toInteger = (
    moneyValue: CurrencyValue,
  ): number | 'noValue' | 'notMoneyValue' => {
    const isMoneyValue = Validate.moneyValue(moneyValue);

    if (!isMoneyValue) return 'notMoneyValue';

    const trySplit = moneyValue.split('.');

    if (trySplit.length !== 2) {
      return 'noValue';
    }

    try {
      const value = parseInt(textValue);
      return value;
    } catch (err) {
      return 'noValue';
    }
  };

  static toString = (integerValue: number): string => {
    return this.toDecimal(integerValue).toString();
  };

  static toMoneyValue = (
    integerValue: number,
    currency: Currency,
  ): CurrencyValue | 'notMoneyValue' => {
    const decimalValue = this.toDecimal(integerValue);

    if (decimalValue === `unable to parse ${integerValue}`)
      return 'notMoneyValue';

    return `${this.toDecimal(integerValue)}${currency}`;
  };

  static toDecimal = (
    integerValue: number,
  ): number | `unable to parse ${number}` => {
    try {
      const formatedValue = `${integerValue
        .toString()
        .slice(0, -2)}.${integerValue
        .toString()
        .slice(-2, integerValue.toString().length)}`;
      const value = parseFloat(formatedValue);
      return value;
    } catch (err) {
      return `unable to parse ${integerValue}`;
    }
  };
}

export class Validate {
  static moneyValue = (moneyValue: string | CurrencyValue) => {
    const isMoneyValue = currency
      .map((x) => moneyValue.includes(x))
      .includes(true);

    if (!isMoneyValue) return false;

    return true;
  };
}
