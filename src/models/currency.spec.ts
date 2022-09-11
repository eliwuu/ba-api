import { Convert, CurrencyValue } from './currency';

describe('CurrencyValue convertion tests', () => {
  const correctCurrencyValue: CurrencyValue = '123.23PLN';
  const wrongCurrency = '123.23PLNGBP' as CurrencyValue;
  const digitGroupSeparator = '123,000,123.123PLN' as CurrencyValue;
  const notCurrencyValue = '2341234,123 PLN' as CurrencyValue;

  it('should convert to integer value', () => {
    const integerValue = Convert.toInteger(correctCurrencyValue);
    expect(integerValue).toBe(12323);
  });
  it('should return no value', () => {
    const noValue = Convert.toInteger(wrongCurrency);
    expect(noValue).toBe('noValue');
  });
  it('should return no value', () => {
    const noValue = Convert.toInteger(digitGroupSeparator);
    expect(noValue).toBe('noValue');
  });
  it('should convert digit group separator to integer value', () => {
    const noValue = Convert.toInteger(digitGroupSeparator, '.', {
      useDigitGroupSeparator: true,
    });
    expect(noValue).toBe(12300012312);
  });
  it('should return not money value', () => {
    const noValue = Convert.toInteger(notCurrencyValue);
    expect(noValue).toBe('noValue');
  });
});
