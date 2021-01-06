import { taxBand, deduction } from '../../utils';

export const TaxCalculator = (year, isSenior, income, investment) => {
  const yearsTaxBand = taxBand[year];
  const yearsTaxDeduction = deduction[year];
  let taxableIncome = income;
  // for investment
  taxableIncome =
    investment > yearsTaxDeduction.investment
      ? taxableIncome - yearsTaxDeduction.investment
      : taxableIncome - investment;

  // for senior citizen
  taxableIncome = isSenior
    ? taxableIncome - yearsTaxDeduction.SeniorCitizen.concession
    : taxableIncome;
  let totalTax = 0;
  let lastTaxBand = 0;

  // tax calculation in basis on bend
  for (let [key, value] of Object.entries(yearsTaxBand)) {
    if (key === 'max') {
      totalTax += (taxableIncome * value) / 100;
    } else if (taxableIncome > +key) {
      taxableIncome -= +key - lastTaxBand;
      totalTax += ((+key - lastTaxBand) * value) / 100;
      lastTaxBand += +key;
    } else {
      totalTax += (taxableIncome * value) / 100;
      break;
    }
  }

  // cess calculation
  if (totalTax > yearsTaxDeduction.cess.taxAbove) {
    totalTax += (totalTax * yearsTaxDeduction.cess.percentage) / 100;
  }
  return totalTax;
};
