export const currency = ['PLN', 'USD', 'GBP'] as const;
export type Currency = typeof currency[number];
export type CurrencyValue = `${string}${Currency}`;
export type MoneyValue = { num: number; currency: Currency };

export const decimalSeparator = [',', '.'] as const;
export type DecimalSeparator = typeof decimalSeparator[number];

export type RoundingSettings = 'cut' | 'nearestTenths' | 'nearetHundredths';

export class Convert {
  static toInteger = (
    moneyValue: CurrencyValue,
    decimalSeparator: DecimalSeparator = '.',
    options?: {
      useDigitGroupSeparator?: boolean;
      roundingSettings?: RoundingSettings;
    },
  ): number | 'noValue' | 'notMoneyValue' => {
    const isMoneyValue = Validate.moneyValue(moneyValue);

    if (!isMoneyValue) return 'notMoneyValue';

    const splittedValue = moneyValue.split(decimalSeparator);

    if (splittedValue.length !== 2) {
      return 'noValue';
    }

    const hasDigitGroupSeparator = splittedValue[0].includes(
      this.getGroupSeparator(decimalSeparator),
    );

    if (
      hasDigitGroupSeparator &&
      options?.useDigitGroupSeparator === undefined
    ) {
      return 'noValue';
    }

    if (hasDigitGroupSeparator && options?.useDigitGroupSeparator) {
      splittedValue[0] = splittedValue[0].replaceAll(
        this.getGroupSeparator(decimalSeparator),
        '',
      );
    }

    const currencyString = currency
      .map((x) => {
        if (splittedValue[1].includes(x)) return x;
      })
      .filter((x) => x !== undefined);

    if (currencyString.length !== 1) {
      return 'noValue';
    }

    let valueRemovedCurrency = splittedValue[1].replace(currencyString[0], '');

    if (valueRemovedCurrency.length === 0) {
      valueRemovedCurrency = '00';
    }
    if (valueRemovedCurrency.length === 1) {
      valueRemovedCurrency = valueRemovedCurrency + '0';
    }

    if (valueRemovedCurrency.length > 2) {
      const decimalTextValue =
        valueRemovedCurrency.slice(0, 1) +
        '.' +
        valueRemovedCurrency.slice(2, valueRemovedCurrency.length - 1);

      let decimalValue: number;
      try {
        decimalValue = parseFloat(decimalTextValue);
      } catch (err) {
        return 'notMoneyValue';
      }

      decimalValue.toFixed(2);
    }

    const integerTextValue = `${splittedValue[0]}${valueRemovedCurrency}`;

    try {
      const value = parseInt(integerTextValue);
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

  static getGroupSeparator = (
    decimalSeparator: DecimalSeparator,
  ): DecimalSeparator => {
    switch (decimalSeparator) {
      case ',':
        return '.';
      case '.':
        return ',';
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
